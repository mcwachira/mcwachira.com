import "server-only";

import matter from "gray-matter";
import { validateFrontmatter, type ArticleFrontmatter, type ArticleFormat } from "./types";

export interface ParsedMarkdown {
    frontmatter: ArticleFrontmatter;
    content: string;
    format: ArticleFormat;
}

export function parseMarkdown(markdown: string, format: ArticleFormat, filename?: string): ParsedMarkdown {
    const { data, content } = matter(markdown);

    // Transform frontmatter to match expected schema
    const transformed = transformFrontmatter(data, filename);

    const validated = validateFrontmatter(transformed);

    return {
        frontmatter: validated,
        content: content.trim(),
        format,
    };
}

function transformFrontmatter(data: Record<string, unknown>, filename?: string): Record<string, unknown> {
    const result = { ...data };

    // Derive slug from filename if not present
    if (!result.slug && filename) {
        const baseName = filename.replace(/\.(md|mdx)$/i, "");
        result.slug = baseName;
    }

    // Map timeToRead -> readTime
    if (result.timeToRead && !result.readTime) {
        result.readTime = result.timeToRead;
    }

    // Map image -> coverImage
    if (result.image && !result.coverImage) {
        result.coverImage = result.image;
    }

    // Default tags to empty array
    if (!result.tags) {
        result.tags = [];
    }

    // Default published to false for safety (articles must explicitly opt-in)
    if (result.published === undefined) {
        result.published = false;
    }

    return result;
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