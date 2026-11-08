
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Page } from "@/components/page-layout";

// Temporary article type. The GitHub Markdown service will provide
// these records when the blog content integration is implemented.
type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    body: string;
    seoTitle?: string;
    seoDescription?: string;
};

async function getPost(_slug: string): Promise<BlogPost | null> {
    // GitHub Markdown fetching will be implemented in src/lib/blog.ts.
    return null;
}

async function getPosts(): Promise<BlogPost[]> {
    // Returns the published articles from GitHub in the final integration.
    return [];
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
    const description =
        post.seoDescription ?? post.excerpt ?? "";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
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
        .filter((item) => item.slug !== slug && item.body)
        .slice(0, 2);

    const url = `https://mcwachira.com/blog/${post.slug}`;

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
                        href="/blog"
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.body}
                    </ReactMarkdown>
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
                                            href={`/blog/${item.slug}`}
                                            className="font-display text-lg font-bold hover:underline"
                                        >
                                            {item.title}
                                        </Link>

                                        <span className="label">
                                            {formatDate(item.publishedAt)}
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
