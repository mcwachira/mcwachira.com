
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
    id: string;
    title: string;
    slug: string;
    category: string | null;
    status: string;
    published_at: string | null;
    body: string | null;
    featured: boolean;
};

function formatDate(value: string | null) {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
    }).format(new Date(value));
}

export default function PostsClient({ posts }: { posts: Post[] }) {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !query ||
                [
                    post.title,
                    post.slug,
                    post.category ?? "",
                    post.status,
                ].some((value) => value.toLowerCase().includes(query));

            const matchesStatus =
                selectedStatus === "all" ||
                post.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [posts, search, selectedStatus]);

    const statuses = [
        "all",
        "draft",
        "published",
        "scheduled",
        "needs-review",
        "archived",
    ];

    return (
        <section className="overflow-hidden rounded-lg border">
            <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
                <div className="flex-1">
                    <label htmlFor="post-search" className="sr-only">
                        Search posts
                    </label>
                    <input
                        id="post-search"
                        type="search"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>

                <label className="sr-only" htmlFor="post-status">
                    Filter by status
                </label>
                <select
                    id="post-status"
                    value={selectedStatus}
                    onChange={(event) =>
                        setSelectedStatus(event.target.value)
                    }
                    className="rounded-md border bg-background px-3 py-2 text-sm"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status === "all" ? "All statuses" : status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="border-b px-4 py-3">
                <p className="text-xs text-muted-foreground">
                    Showing {filteredPosts.length} of {posts.length} posts
                </p>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="p-10 text-center">
                    <p className="font-medium">No posts found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Try another search or create a new post.
                    </p>
                </div>
            ) : (
                <div className="divide-y">
                    {filteredPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/admin/posts/${post.id}`}
                            className="flex flex-wrap items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50 sm:p-5"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="font-medium">
                                        {post.title}
                                    </h2>

                                    {post.featured && (
                                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                            Featured
                                        </span>
                                    )}

                                    <span className="rounded-full border px-2 py-1 text-xs capitalize">
                                        {post.status}
                                    </span>
                                </div>

                                <p className="mt-1 truncate text-sm text-muted-foreground">
                                    /writing/{post.slug}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    <span>{post.category || "Uncategorised"}</span>
                                    <span>·</span>
                                    <span>{formatDate(post.published_at)}</span>
                                    {!post.body && (
                                        <>
                                            <span>·</span>
                                            <span>No text yet</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <span className="text-sm text-muted-foreground">
                                Edit →
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
