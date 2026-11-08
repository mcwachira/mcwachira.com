"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/integrations/supabase/server";
import type { Database } from "@/integrations/supabase/types";

type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export type PostInput = {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    category: string;
    tags: string[];
    published_at: string;
    read_time: number;
    status: string;
    featured: boolean;
    seo_title: string;
    seo_description: string;
};

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

function calculateReadTime(body: string, suppliedReadTime: number) {
    if (Number.isFinite(suppliedReadTime) && suppliedReadTime > 0) {
        return Math.ceil(suppliedReadTime);
    }

    const words = body.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 220));
}

function buildPostPayload(input: PostInput) {
    const readTime = calculateReadTime(input.body, input.read_time);

    return {
        title: input.title.trim(),
        slug: input.slug.trim(),
        excerpt: input.excerpt.trim() || null,
        body: input.body,
        category: input.category.trim() || null,
        tags: input.tags,
        published_at: input.published_at || null,
        read_time: String(readTime),
        status: input.status,
        featured: input.featured,
        seo_title: input.seo_title.trim() || null,
        seo_description: input.seo_description.trim() || null,
    };
}

export async function getPost(id: string) {
    if (!id || id === "new") {
        throw new Error("A valid post ID is required.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(`Could not load post: ${error.message}`);
    }

    return data;
}

export async function savePost(input: {
    id?: string;
    post: PostInput;
}) {
    const supabase = await getAdminClient();
    const payload = buildPostPayload(input.post);

    if (!payload.title || !payload.slug) {
        throw new Error("Post title and slug are required.");
    }

    if (input.id && input.id !== "new") {
        const updatePayload = payload as PostUpdate;

        const { data, error } = await supabase
            .from("posts")
            .update(updatePayload)
            .eq("id", input.id)
            .select("id")
            .single();

        if (error) {
            throw new Error(`Could not update post: ${error.message}`);
        }

        revalidatePath("/admin");
        revalidatePath("/admin/posts");
        revalidatePath(`/admin/posts/${input.id}`);
        revalidatePath("/writing");

        if (payload.slug) {
            revalidatePath(`/writing/${payload.slug}`);
        }

        return { id: data.id };
    }

    const insertPayload = payload as PostInsert;

    const { data, error } = await supabase
        .from("posts")
        .insert(insertPayload)
        .select("id")
        .single();

    if (error) {
        throw new Error(`Could not create post: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/posts");
    revalidatePath("/writing");

    return { id: data.id };
}

export async function deletePost(id: string) {
    if (!id || id === "new") {
        throw new Error("A valid post ID is required.");
    }

    const supabase = await getAdminClient();

    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(`Could not delete post: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/posts");
    revalidatePath("/writing");

    return { ok: true as const };
}