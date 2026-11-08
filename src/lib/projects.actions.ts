
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/integrations/supabase/server";
import type { Database, Json } from "@/integrations/supabase/types";

type ProjectInsert =
    Database["public"]["Tables"]["projects"]["Insert"];

type ProjectUpdate =
    Database["public"]["Tables"]["projects"]["Update"];

export type ProjectInput = {
    slug: string;
    title: string;
    kind: string;
    state: string;
    verification: string;
    featured: boolean;
    featured_order: number;
    current_build: boolean;
    sort_order: number;
    data: Json;
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

function validateProject(input: ProjectInput): ProjectInput {
    if (!input || typeof input !== "object") {
        throw new Error("Invalid project data.");
    }

    const title = input.title?.trim();
    const slug = input.slug?.trim();

    if (!title) {
        throw new Error("Project title is required.");
    }

    if (!slug) {
        throw new Error("Project slug is required.");
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(
            "Project slug must use lowercase letters, numbers and hyphens.",
        );
    }

    if (!["engineering", "case-study"].includes(input.kind)) {
        throw new Error("Invalid project type.");
    }

    if (!["published", "draft", "archived"].includes(input.state)) {
        throw new Error("Invalid project visibility.");
    }

    if (!["verified", "needs-review"].includes(input.verification)) {
        throw new Error("Invalid verification status.");
    }

    if (!Number.isFinite(input.sort_order) ||
        !Number.isFinite(input.featured_order)) {
        throw new Error("Project ordering values must be valid numbers.");
    }

    if (!input.data || typeof input.data !== "object" || Array.isArray(input.data)) {
        throw new Error("Project data must be a JSON object.");
    }

    return {
        ...input,
        title,
        slug,
    };
}

export async function getProject(id: string) {
    if (!id || id === "new") {
        throw new Error("A valid project ID is required.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(`Could not load project: ${error.message}`);
    }

    return data;
}

export async function saveProject(input: {
    id?: string;
    project: ProjectInput;
}) {
    const project = validateProject(input.project);
    const supabase = await getAdminClient();

    if (input.id) {
        const updatePayload = project as ProjectUpdate;

        const { data, error } = await supabase
            .from("projects")
            .update(updatePayload)
            .eq("id", input.id)
            .select("id")
            .single();

        if (error) {
            throw new Error(`Could not update project: ${error.message}`);
        }

        revalidatePath("/admin");
        revalidatePath("/admin/projects");
        revalidatePath(`/admin/projects/${data.id}`);
        revalidatePath("/work");
        revalidatePath(`/work/${project.slug}`);

        return { id: data.id };


    }

    const insertPayload = project as ProjectInsert;

    const { data, error } = await supabase
        .from("projects")
        .insert(insertPayload)
        .select("id")
        .single();

    if (error) {
        throw new Error(`Could not create project: ${error.message}`);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/work");

    return { id: data.id };
}

export async function deleteProject(id: string) {
    if (!id || id === "new") {
        throw new Error("A valid project ID is required.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .select("id")
        .single();

    if (error) {
        throw new Error(`Could not delete project: ${error.message}`);
    }

    if (!data) {
        throw new Error("Project was not found or could not be deleted.");
    }

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/work");

    return { ok: true as const };
}
