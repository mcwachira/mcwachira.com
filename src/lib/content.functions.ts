
import "server-only";

import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
        throw new Error(
            "Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY environment variable.",
        );
    }

    return createClient<Database>(url, key, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: {
            fetch: (input, init) => {
                const headers = new Headers(init?.headers);

                if (
                    key.startsWith("sb_") &&
                    headers.get("Authorization") === `Bearer ${key}`
                ) {
                    headers.delete("Authorization");
                }

                headers.set("apikey", key);

                return fetch(input, {
                    ...init,
                    headers,
                });
            },
        },
    });
}

const projectColumns =
    "slug, kind, title, data, featured, featured_order, current_build, sort_order";

export async function listProjects() {
    "use cache";

    cacheLife("hours");
    cacheTag("public-projects");

    const { data, error } = await publicClient()
        .from("projects")
        .select(projectColumns)
        .eq("state", "published")
        .order("sort_order");

    if (error) {
        throw new Error(`Projects query failed: ${error.message}`);
    }

    return data;
}

export async function listPosts() {
    "use cache";

    cacheLife("hours");
    cacheTag("public-posts");

    const { data, error } = await publicClient()
        .from("posts")
        .select("slug, title, excerpt, category, published_at, read_time, body")
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) {
        throw new Error(`Posts query failed: ${error.message}`);
    }

    return data.map(({ body, ...post }) => ({
        ...post,
        hasBody: Boolean(body?.trim()),
    }));
}

export async function getPost(slug: string) {
    "use cache";

    cacheLife("hours");
    cacheTag("public-posts", `public-post-${slug}`);

    const { data, error } = await publicClient()
        .from("posts")
        .select(
            "slug, title, excerpt, category, published_at, updated_at, read_time, body, seo_title, seo_description",
        )
        .eq("status", "published")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(`Post query failed: ${error.message}`);
    }

    return data;
}

export async function listExperiences() {
    "use cache";

    cacheLife("hours");
    cacheTag("public-experiences");

    const { data, error } = await publicClient()
        .from("experiences")
        .select(
            "id, role, company, location, start_label, end_label, kind, description, achievements, sort_order",
        )
        .order("sort_order");

    if (error) {
        console.error("Experiences query failed:", error.message);
        return [];
    }

    return data;
}

export async function listSkills() {
    "use cache";

    cacheLife("hours");
    cacheTag("public-skills");

    const { data, error } = await publicClient()
        .from("skills")
        .select("id, name, category, level, evidence, sort_order")
        .order("sort_order");

    if (error) {
        console.error("Skills query failed:", error.message);
        return [];
    }

    return data;
}

export async function getSettings() {
    "use cache";

    cacheLife("hours");
    cacheTag("public-site-settings");

    const { data, error } = await publicClient()
        .from("site_settings")
        .select("data")
        .eq("key", "site")
        .maybeSingle();

    if (error) {
        console.error("Site settings query failed:", error.message);
        return null;
    }

    return data?.data ?? null;
}
