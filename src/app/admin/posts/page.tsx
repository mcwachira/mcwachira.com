
import Link from "next/link";
import { createClient } from "@/integrations/supabase/server";
import PostsClient from "./posts-client";

export default async function AdminPostsPage() {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from("posts")
        .select(
            "id, title, slug, category, status, published_at, body, featured",
        )
        .order("published_at", {
            ascending: false,
            nullsFirst: true,
        });

    if (error) {
        throw new Error(`Could not load posts: ${error.message}`);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Posts
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Write and manage articles published on your website.
                    </p>
                </div>

                <Link
                    href="/admin/posts/new"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                    New post
                </Link>
            </div>

            <PostsClient posts={posts ?? []} />
        </div>
    );
}
