"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
    id: string;
    title: string;
    category: string | null;
    status: string;
    published_at: string | null;
    body: string | null;
};

export default function PostsClient({ posts }: { posts: Post[] }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                (post.category ?? "").toLowerCase().includes(query);

            const matchesStatus =
                status === "all" || post.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [posts, search, status]);

    function formatDate(value: string | null) {
        if (!value) return "Not scheduled";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Invalid date";

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
        }).format(date);
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search posts..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="all">All statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="needs-review">Needs review</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
                {filteredPosts.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="font-medium">No posts found</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or status filter.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/admin/posts/${post.id}`}
                                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <h2 className="truncate font-medium">
                                        {post.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {post.category || "Uncategorized"}
                                        {" · "}
                                        {formatDate(post.published_at)}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <span className="rounded-full border border-border px-2.5 py-1 text-xs capitalize text-muted-foreground">
                                        {post.status.replace("-", " ")}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {post.body?.trim()
                                            ? "Has content"
                                            : "Empty"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {posts.length} posts
            </p>
        </div>
    );
}