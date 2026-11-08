
import { notFound } from "next/navigation";
import { createClient } from "@/integrations/supabase/server";
import PostEditor from "./post-editor";
import type { PostStatus } from "../actions";

const validStatuses: PostStatus[] = [
    "draft",
    "published",
    "scheduled",
    "needs-review",
    "archived",
];

function normalizeStatus(value: string | null): PostStatus {
    return validStatuses.includes(value as PostStatus)
        ? (value as PostStatus)
        : "draft";
}
export default async function AdminPostEditorPage({
                                                      params,
                                                  }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (id === "new") {
        return <PostEditor />;
    }

    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(`Could not load post: ${error.message}`);
    }

    if (!post) {
        notFound();
    }

    return (
        <PostEditor
            initialPost={{
                id: post.id,
                title: post.title ?? "",
                slug: post.slug ?? "",
                excerpt: post.excerpt ?? "",
                body: post.body ?? "",
                category: post.category ?? "",
                tags: post.tags ?? [],
                published_at: post.published_at ?? "",
                read_time: post.read_time ?? "",
                status: normalizeStatus(post.status),
                featured: post.featured ?? false,
                seo_title: post.seo_title ?? "",
                seo_description: post.seo_description ?? "",
            }}
        />
    );
}
