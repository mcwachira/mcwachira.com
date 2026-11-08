import { MetadataRoute } from "next";
import { listProjects } from "@/lib/content.functions";
import { getAllArticles, GitHubContentError } from "@/lib/writing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://mcwachira.com";

    let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
    try {
        articles = await getAllArticles();
    } catch (error) {
        if (error instanceof GitHubContentError && error.code !== "NOT_FOUND") {
            // Upstream error - log but don't fail the build; return empty array
            // Stale cache will be served on subsequent requests if available
            console.warn("Failed to fetch articles for sitemap:", error.message);
            articles = [];
        } else {
            throw error;
        }
    }

    const projects = await listProjects();

    const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/work/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: project.featured ? 0.8 : 0.6,
    }));

    const postUrls: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/writing/${article.slug}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/writing`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    return [...staticUrls, ...projectUrls, ...postUrls];
}