export interface ArticleFrontmatter {
    title: string;
    slug: string;
    description: string;
    date: string;
    updatedAt?: string;
    tags: string[];
    published: boolean;
    coverImage?: string;
    category?: string;
    readTime?: string;
    seoTitle?: string;
    seoDescription?: string;
}

export type ArticleFormat = "markdown" | "mdx";

export interface Article {
    frontmatter: ArticleFrontmatter;
    content: string;
    html: string;
    readingTime: string;
    format: ArticleFormat;
}

export interface ArticleSummary {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string;
    updatedAt?: string;
    tags: string[];
    published: boolean;
    coverImage?: string;
    readTime: string;
    seoTitle?: string;
    seoDescription?: string;
    format: ArticleFormat;
}

export type ArticleStatus = "published" | "draft";

export function isPublished(article: ArticleSummary): boolean {
    return article.published === true;
}

export function validateFrontmatter(data: unknown): ArticleFrontmatter {
    if (!data || typeof data !== "object") {
        throw new Error("Invalid frontmatter: must be an object");
    }

    const fm = data as Record<string, unknown>;

    if (typeof fm.title !== "string" || !fm.title.trim()) {
        throw new Error("Frontmatter validation failed: title is required");
    }

    if (typeof fm.slug !== "string" || !fm.slug.trim()) {
        throw new Error("Frontmatter validation failed: slug is required");
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug)) {
        throw new Error(
            "Frontmatter validation failed: slug must use lowercase letters, numbers, and hyphens"
        );
    }

    if (typeof fm.description !== "string") {
        throw new Error("Frontmatter validation failed: description is required");
    }

    if (typeof fm.date !== "string" || !fm.date.trim()) {
        throw new Error("Frontmatter validation failed: date is required");
    }

    const parsedDate = new Date(fm.date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Frontmatter validation failed: date must be a valid ISO date string");
    }

    if (typeof fm.published !== "boolean") {
        throw new Error("Frontmatter validation failed: published must be a boolean");
    }

    if (!Array.isArray(fm.tags) || !fm.tags.every((t) => typeof t === "string")) {
        throw new Error("Frontmatter validation failed: tags must be an array of strings");
    }

    if (fm.updatedAt !== undefined) {
        if (typeof fm.updatedAt !== "string") {
            throw new Error("Frontmatter validation failed: updatedAt must be a string if provided");
        }
        const parsedUpdated = new Date(fm.updatedAt);
        if (isNaN(parsedUpdated.getTime())) {
            throw new Error("Frontmatter validation failed: updatedAt must be a valid ISO date string");
        }
    }

    if (fm.category !== undefined && typeof fm.category !== "string") {
        throw new Error("Frontmatter validation failed: category must be a string if provided");
    }

    if (fm.coverImage !== undefined && typeof fm.coverImage !== "string") {
        throw new Error("Frontmatter validation failed: coverImage must be a string if provided");
    }

    if (fm.readTime !== undefined && typeof fm.readTime !== "string") {
        throw new Error("Frontmatter validation failed: readTime must be a string if provided");
    }

    if (fm.seoTitle !== undefined && typeof fm.seoTitle !== "string") {
        throw new Error("Frontmatter validation failed: seoTitle must be a string if provided");
    }

    if (fm.seoDescription !== undefined && typeof fm.seoDescription !== "string") {
        throw new Error("Frontmatter validation failed: seoDescription must be a string if provided");
    }

    return {
        title: fm.title.trim(),
        slug: fm.slug.trim(),
        description: fm.description.trim(),
        date: fm.date.trim(),
        updatedAt: fm.updatedAt?.trim(),
        tags: fm.tags.map((t: string) => t.trim()).filter(Boolean),
        published: Boolean(fm.published),
        coverImage: fm.coverImage?.trim(),
        category: fm.category?.trim(),
        readTime: fm.readTime?.trim(),
        seoTitle: fm.seoTitle?.trim(),
        seoDescription: fm.seoDescription?.trim(),
    };
}