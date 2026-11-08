
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Page } from "@/components/page-layout";
import { ArticleRenderer } from "@/components/writing";
import { getArticleBySlug, getAllArticles, getPublishedArticleSlugs } from "@/lib/writing";

const VALIDATION_SLUG = "__next_cache_validation__";

export async function generateStaticParams() {
    const slugs = await getPublishedArticleSlugs();

    return slugs.length > 0
        ? slugs.map((slug) => ({ slug }))
        : [{ slug: VALIDATION_SLUG }];
}

async function getPost(slug: string) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        return null;
    }

    return {
        slug: article.frontmatter.slug,
        title: article.frontmatter.title,
        excerpt: article.frontmatter.description,
        category: article.frontmatter.category ?? "General",
        publishedAt: article.frontmatter.date,
        updatedAt: article.frontmatter.updatedAt,
        readTime: article.readingTime,
        body: article.content,
        format: article.format,
        seoTitle: article.frontmatter.seoTitle,
        seoDescription: article.frontmatter.seoDescription,
        tags: article.frontmatter.tags,
    };
}

async function getPosts() {
    return getAllArticles();
}

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
                                            params,
                                        }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Not found — Charles Wachira",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = `${post.seoTitle ?? post.title} — Charles Wachira`;
    const description = post.seoDescription ?? post.excerpt;
    const url = `https://mcwachira.com/writing/${post.slug}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.seoTitle ?? post.title,
        description: post.seoDescription ?? post.excerpt,
        url,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
            "@type": "Person",
            name: "Charles Wachira",
            url: "https://mcwachira.com",
        },
        publisher: {
            "@type": "Person",
            name: "Charles Wachira",
            url: "https://mcwachira.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
    };

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            type: "article",
            url,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: ["Charles Wachira"],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        other: {
            "script:ld+json": JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        },
    };
}

function formatDate(date: string) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(parsed);
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const [post, allPosts] = await Promise.all([
        getPost(slug),
        getPosts(),
    ]);

    if (!post || !post.body) {
        notFound();
    }

    const others = allPosts
        .filter((item) => item.slug !== slug && item.published)
        .slice(0, 2);

    const url = `https://mcwachira.com/writing/${post.slug}`;

    const shares = [
        {
            label: "Share on X",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
        },
        {
            label: "Share on LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        },
        {
            label: "Share by email",
            href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`,
        },
    ];

    return (
        <Page>
            <article className="shell grid12 py-12 md:py-16">
                <header className="col-span-2 md:col-span-6 lg:col-span-8 lg:col-start-3">
                    <Link
                        href="/writing"
                        className="label border-b border-accent pb-0.5 text-foreground"
                    >
                        ← All notes
                    </Link>

                    <p className="label mt-6">
                        {post.category} · {formatDate(post.publishedAt)} ·{" "}
                        {post.readTime}
                    </p>

                    <h1 className="fluid-section mt-3 font-bold">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="mt-4 text-lg text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                <div className="prose-cw col-span-2 mt-10 border-t border-border pt-8 md:col-span-6 lg:col-span-8 lg:col-start-3">
                    <ArticleRenderer content={post.body} format={post.format} />
                </div>

                <footer className="col-span-2 mt-12 border-t border-border pt-8 md:col-span-6 lg:col-span-8 lg:col-start-3">
                    <p className="label">Share this note</p>

                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {shares.map((share) => (
                            <li key={share.label}>
                                <a
                                    href={share.href}
                                    target={
                                        share.href.startsWith("mailto:")
                                            ? undefined
                                            : "_blank"
                                    }
                                    rel="noreferrer"
                                    className="font-mono text-xs uppercase tracking-[0.14em] underline underline-offset-4 hover:text-accent"
                                >
                                    {share.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {others.length > 0 && (
                        <>
                            <p className="label mt-10">More notes</p>

                            <ul className="mt-3 divide-y divide-rule border-y border-rule">
                                {others.map((item) => (
                                    <li
                                        key={item.slug}
                                        className="flex flex-wrap items-baseline justify-between gap-3 py-4"
                                    >
                                        <Link
                                            href={`/writing/${item.slug}`}
                                            className="font-display text-lg font-bold hover:underline"
                                        >
                                            {item.title}
                                        </Link>

                                        <span className="label">
                                            {formatDate(item.date)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </footer>
            </article>
        </Page>
    );
}
