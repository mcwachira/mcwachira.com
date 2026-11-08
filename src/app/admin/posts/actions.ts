"use server";

import { revalidatePath, updateTag } from "next/cache";
import { createClient } from "@/integrations/supabase/server";

export type PostStatus =
    | "draft"
    | "published"
    | "scheduled"
    | "needs-review"
    | "archived";

export type PostInput = {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    category: string;
    tags: string[];
    published_at: string;
    read_time: string;
    status: PostStatus;
    featured: boolean;
    seo_title: string;
    seo_description: string;
};

const allowedStatuses: PostStatus[] = [
    "draft",
    "published",
    "scheduled",
    "needs-review",
    "archived",
];

async function getAdminClient() {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Authentication required.");
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc(
        "has_role",
        {
            _user_id: user.id,
            _role: "admin",
        },
    );

    if (roleError || !isAdmin) {
        throw new Error("Administrator access required.");
    }

    return supabase;
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function validatePost(input: PostInput) {
    if (!input || typeof input !== "object") {
        throw new Error("Invalid post data.");
    }

    if (typeof input.title !== "string" || !input.title.trim()) {
        throw new Error("A post title is required.");
    }

    if (typeof input.body !== "string") {
        throw new Error("Post body must be text.");
    }

    if (!allowedStatuses.includes(input.status)) {
        throw new Error("Invalid post status.");
    }

    if (
        !Array.isArray(input.tags) ||
        !input.tags.every((tag) => typeof tag === "string")
    ) {
        throw new Error("Post tags must be a list of strings.");
    }

    const slug = slugify(input.slug || input.title);

    if (!slug) {
        throw new Error("A valid post slug is required.");
    }

    return {
        title: input.title.trim(),
        slug,
        excerpt: input.excerpt.trim() || null,
        body: input.body.trim() || null,
        category: input.category.trim() || null,
        tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
        published_at: input.published_at || null,
        read_time: input.read_time.trim() || null,
        status: input.status,
        featured: Boolean(input.featured),
        seo_title: input.seo_title.trim() || null,
        seo_description: input.seo_description.trim() || null,
    };
}

function revalidatePublicPosts() {
    updateTag("public-posts");

    revalidatePath("/");
    revalidatePath("/writing");
    revalidatePath("/admin/posts");
}

export async function savePost(input: PostInput) {
    const supabase = await getAdminClient();
    const payload = validatePost(input);

    if (input.id) {
        const { data: existingPost, error: lookupError } = await supabase
            .from("posts")
            .select("slug")
            .eq("id", input.id)
            .maybeSingle();

        if (lookupError) {
            throw new Error(
                `Could not find existing post: ${lookupError.message}`,
            );
        }

        if (!existingPost) {
            throw new Error("Post not found.");
        }

        const { data, error } = await supabase
            .from("posts")
            .update(payload)
            .eq("id", input.id)
            .select("id, slug")
            .maybeSingle();

        if (error) {
            throw new Error(`Could not update post: ${error.message}`);
        }

        if (!data) {
            throw new Error("Post not found or could not be updated.");
        }

        revalidatePublicPosts();

        updateTag(`public-post-${existingPost.slug}`);
        updateTag(`public-post-${data.slug}`);

        revalidatePath(`/admin/posts/${data.id}`);
        revalidatePath(`/writing/${existingPost.slug}`);
        revalidatePath(`/writing/${data.slug}`);

        return { id: data.id };
    }

    const { data, error } = await supabase
        .from("posts")
        .insert(payload)
        .select("id, slug")
        .single();

    if (error) {
        throw new Error(`Could not create post: ${error.message}`);
    }

    revalidatePublicPosts();
    updateTag(`public-post-${data.slug}`);

    revalidatePath(`/writing/${data.slug}`);

    return { id: data.id };
}

export async function deletePost(input: { id: string }) {
    if (
        !input ||
        typeof input.id !== "string" ||
        !input.id.trim()
    ) {
        throw new Error("A valid post ID is required.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", input.id)
        .select("id, slug")
        .maybeSingle();

    if (error) {
        throw new Error(`Could not delete post: ${error.message}`);
    }

    if (!data) {
        throw new Error("Post not found or could not be deleted.");
    }

    revalidatePublicPosts();
    updateTag(`public-post-${data.slug}`);

    revalidatePath(`/writing/${data.slug}`);

    return { ok: true as const };
}