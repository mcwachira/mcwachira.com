import "server-only";

import matter from "gray-matter";
import { validateFrontmatter, type ArticleFrontmatter, type ArticleFormat } from "./types";

export interface ParsedMarkdown {
    frontmatter: ArticleFrontmatter;
    content: string;
    format: ArticleFormat;
}

export function parseMarkdown(markdown: string, format: ArticleFormat): ParsedMarkdown {
    const { data, content } = matter(markdown);

    const validated = validateFrontmatter(data);

    return {
        frontmatter: validated,
        content: content.trim(),
        format,
    };
}

export function extractExcerpt(content: string, maxLength: number = 200): string {
    const plainText = content
        .replace(/^#{1,6}\s+.*$/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/^>\s*/gm, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .trim();

    if (plainText.length <= maxLength) {
        return plainText;
    }

    const truncated = plainText.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
        ? truncated.slice(0, lastSpace) + "..."
        : truncated + "...";
}

export function calculateReadingTime(content: string): string {
    const wordsPerMinute = 220;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));
    return `${minutes} min read`;
}

export function detectFormat(filename: string): ArticleFormat {
    const lower = filename.toLowerCase();
    if (lower.endsWith(".mdx")) return "mdx";
    if (lower.endsWith(".md")) return "markdown";
    return "markdown";
}