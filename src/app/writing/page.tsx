
import type { Metadata } from "next";
import Link from "next/link";

import { Page } from "@/components/page-layout";
import { getAllArticles } from "@/lib/writing";

export const metadata: Metadata = {
    title: "Writing — Charles Wachira",
    description:
        "Engineering notes on Node.js, Next.js and Zoho automation from Charles Wachira, senior software engineer based in Diani, Kenya.",
    alternates: {
        canonical: "https://mcwachira.com/writing",
    },
    openGraph: {
        title: "Writing — Charles Wachira",
        description:
            "Engineering notes on Node.js, Next.js and Zoho automation.",
        type: "website",
        url: "https://mcwachira.com/writing",
    },
    twitter: {
        card: "summary_large_image",
    },
};

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

export default async function WritingPage() {
    const posts = await getAllArticles();

    return (
        <Page>
            <section className="border-b border-border">
                <div className="shell grid12 py-12 md:py-16">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <p className="label">01 / Writing</p>
                        <h1 className="fluid-display mt-4 font-bold">
                            Notes
                        </h1>
                    </div>

                    <p className="col-span-2 mt-4 text-sm leading-relaxed text-muted-foreground md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        Technical notes and tutorials from real project
                        work: Node.js internals, secure forms, Next.js
                        development and Zoho automation.
                    </p>
                </div>
            </section>

            <section className="shell py-12 md:py-16">
                {posts.length === 0 ? (
                    <div className="border-y border-rule py-12">
                        <p className="label">No. 001 / Coming soon</p>

                        <h2 className="mt-4 font-display text-2xl font-bold">
                            Notes are being prepared.
                        </h2>

                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                            I&apos;m putting together technical articles
                            covering lessons from real engineering work,
                            software architecture and business automation.
                            They&apos;ll be published here soon.
                        </p>

                        <Link
                            href="/work"
                            className="mt-6 inline-block border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.14em]"
                        >
                            Explore selected work →
                        </Link>
                    </div>
                ) : (
                    <ol className="divide-y divide-rule border-y border-rule">
                        {posts.map((post, index) => (
                            <li key={post.slug} className="grid12 py-6">
                                <span className="label col-span-1 lg:col-span-1">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="label col-span-1 md:col-span-2 lg:col-span-2">
                                    {post.category}
                                </span>

                                <div className="col-span-2 md:col-span-4 lg:col-span-6">
                                    <h2 className="font-display text-xl font-bold leading-snug">
                                        <Link
                                            href={`/writing/${post.slug}`}
                                            className="border-b border-accent"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {post.description}
                                    </p>
                                </div>

                                <span className="label col-span-1 md:col-span-3 lg:col-span-2">
                                    {formatDate(post.date)}
                                </span>

                                <span className="label col-span-1 md:col-span-3 lg:col-span-1 lg:text-right">
                                    {post.readTime}
                                </span>
                            </li>
                        ))}
                    </ol>
                )}

                <p className="label mt-6">
                    Index — {posts.length} entries
                </p>
            </section>
        </Page>
    );
}
