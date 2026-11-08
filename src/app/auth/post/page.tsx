
import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/integrations/supabase/server";
import PostsClient from "./posts-client";

async function PostsContent() {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select("id,title,category,status,published_at,body")
        .order("published_at", {
            ascending: true,
            nullsFirst: true,
        });

    if (error) {
        throw new Error(`Could not load posts: ${error.message}`);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Content</p>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Posts
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Create and manage your writing.
                    </p>
                </div>

                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                    New post
                </Link>
            </div>

            <PostsClient posts={posts ?? []} />
        </div>
    );
}

function PostsFallback() {
    return (
        <div className="space-y-4" aria-busy="true">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </div>
    );
}

export default function AdminPostsPage() {
    return (
        <Suspense fallback={<PostsFallback />}>
            <PostsContent />
        </Suspense>
    );
}
