"use server";

import { cacheLife, cacheTag } from "next/cache";
import { getRepoConfig, getRawBaseUrl, getApiBaseUrl, getHeaders } from "./config";
import { parseMarkdown, calculateReadingTime, detectFormat } from "./parse";
import { type Article, type ArticleSummary, type ArticleFormat } from "./types";
import { GitHubContentError } from "./errors";

const POSTS_DIR = "posts";

async function fetchFromGitHub(path: string): Promise<string> {
    const config = getRepoConfig();

    if (!config) {
        // During build without config, return empty to allow build to succeed
        // This will be caught and handled as NOT_FOUND
        throw new GitHubContentError("GitHub repository not configured", "NOT_FOUND");
    }

    const url = `${getRawBaseUrl(config)}/${path}`;

    try {
        const response = await fetch(url, {
            headers: getHeaders(config),
            next: { revalidate: 3600 },
        });

        if (response.status === 404) {
            throw new GitHubContentError(`Article not found: ${path}`, "NOT_FOUND", 404);
        }

        if (response.status === 401 || response.status === 403) {
            throw new GitHubContentError(`GitHub authentication failed: ${response.status}`, "AUTH_ERROR", response.status);
        }

        if (response.status === 429) {
            throw new GitHubContentError("GitHub rate limit exceeded", "RATE_LIMITED", 429);
        }

        if (!response.ok) {
            throw new GitHubContentError(`GitHub fetch failed: ${response.status} ${response.statusText}`, "UPSTREAM_ERROR", response.status);
        }

        return await response.text();
    } catch (error) {
        if (error instanceof GitHubContentError) {
            throw error;
        }
        // Network errors, DNS failures, etc.
        console.error(`Network error fetching ${path} from GitHub:`, error);
        throw new GitHubContentError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`, "NETWORK_ERROR");
    }
}

async function listPostFiles(): Promise<string[]> {
    const config = getRepoConfig();

    if (!config) {
        // During build without config, return empty to allow build to succeed
        return [];
    }

    const url = `${getApiBaseUrl(config)}/contents/${POSTS_DIR}`;

    try {
        const response = await fetch(url, {
            headers: getHeaders(config),
            next: { revalidate: 3600 },
        });

        if (response.status === 401 || response.status === 403) {
            throw new GitHubContentError(`GitHub authentication failed: ${response.status}`, "AUTH_ERROR", response.status);
        }

        if (response.status === 429) {
            throw new GitHubContentError("GitHub rate limit exceeded", "RATE_LIMITED", 429);
        }

        if (!response.ok) {
            throw new GitHubContentError(`GitHub API failed: ${response.status} ${response.statusText}`, "UPSTREAM_ERROR", response.status);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new GitHubContentError("GitHub API returned unexpected format", "UPSTREAM_ERROR");
        }

        return data
            .filter((item: { type: string; name: string }) => 
                item.type === "file" && (item.name.endsWith(".md") || item.name.endsWith(".mdx"))
            )
            .map((item: { name: string }) => item.name);
    } catch (error) {
        if (error instanceof GitHubContentError) {
            throw error;
        }
        console.error("Network error listing post files from GitHub:", error);
        throw new GitHubContentError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`, "NETWORK_ERROR");
    }
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
    "use cache";

    cacheLife("hours");
    cacheTag("writing-articles");

    let files: string[];
    try {
        files = await listPostFiles();
    } catch (error) {
        if (error instanceof GitHubContentError && error.code === "NOT_FOUND") {
            return [];
        }
        // For upstream/network errors, re-throw to let Next.js serve stale cache
        throw error;
    }

    const articles: ArticleSummary[] = [];

    for (const file of files) {
        let markdown: string;
        try {
            markdown = await fetchFromGitHub(`${POSTS_DIR}/${file}`);
        } catch (error) {
            if (error instanceof GitHubContentError && error.code === "NOT_FOUND") {
                continue; // File disappeared between listing and fetch
            }
            // For upstream/network errors, re-throw to preserve stale cache
            throw error;
        }

        try {
            const format = detectFormat(file);
            const { frontmatter, content } = parseMarkdown(markdown, format, file);

            if (!frontmatter.published) {
                continue;
            }

            const readTime = frontmatter.readTime ?? calculateReadingTime(content);

            articles.push({
                slug: frontmatter.slug,
                title: frontmatter.title,
                description: frontmatter.description,
                category: frontmatter.category ?? "General",
                date: frontmatter.date,
                updatedAt: frontmatter.updatedAt,
                tags: frontmatter.tags,
                published: frontmatter.published,
                coverImage: frontmatter.coverImage,
                readTime,
                seoTitle: frontmatter.seoTitle,
                seoDescription: frontmatter.seoDescription,
                format,
            });
        } catch (error) {
            if (error instanceof GitHubContentError) {
                throw error;
            }
            console.error(`Failed to parse article ${file}:`, error);
        }
    }

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    "use cache";

    cacheLife("hours");
    cacheTag("writing-articles", `writing-article-${slug}`);

    // Try .md first, then .mdx
    let markdown: string;
    let format: ArticleFormat = "markdown";
    let filename = `${slug}.md`;

    try {
        markdown = await fetchFromGitHub(`${POSTS_DIR}/${slug}.md`);
    } catch (error) {
        if (error instanceof GitHubContentError && error.code === "NOT_FOUND") {
            // Try .mdx
            try {
                markdown = await fetchFromGitHub(`${POSTS_DIR}/${slug}.mdx`);
                format = "mdx";
                filename = `${slug}.mdx`;
            } catch (mdxError) {
                if (mdxError instanceof GitHubContentError && mdxError.code === "NOT_FOUND") {
                    return null; // Genuinely not found
                }
                throw mdxError; // Upstream error for .mdx
            }
        } else {
            throw error; // Upstream error for .md
        }
    }

    try {
        const { frontmatter, content } = parseMarkdown(markdown, format, filename);

        if (!frontmatter.published) {
            return null;
        }

        const readTime = frontmatter.readTime ?? calculateReadingTime(content);

        return {
            frontmatter,
            content,
            html: "",
            readingTime: readTime,
            format,
        };
    } catch (error) {
        if (error instanceof GitHubContentError) {
            throw error;
        }
        console.error(`Failed to parse article ${slug}:`, error);
        return null;
    }
}

export async function getPublishedArticleSlugs(): Promise<string[]> {
    const articles = await getAllArticles();
    return articles.map((a) => a.slug);
}