"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/integrations/supabase/server";
import type { Json } from "@/integrations/supabase/types";

type SiteSettingsInput = {
    homeTitle: string;
    homeDescription: string;
    ogTitle: string;
    ogDescription: string;
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

function validateSettings(input: SiteSettingsInput): SiteSettingsInput {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        throw new Error("Invalid settings payload.");
    }

    const fields = [
        ["homeTitle", 120],
        ["homeDescription", 300],
        ["ogTitle", 120],
        ["ogDescription", 300],
    ] as const;

    const result = {} as SiteSettingsInput;

    for (const [field, maxLength] of fields) {
        const value = input[field];

        if (typeof value !== "string") {
            throw new Error(`Invalid ${field}.`);
        }

        const trimmed = value.trim();

        if (trimmed.length > maxLength) {
            throw new Error(
                `${field} must not exceed ${maxLength} characters.`,
            );
        }

        result[field] = trimmed;
    }

    return result;
}

export async function updateSettings(input: SiteSettingsInput) {
    const settings = validateSettings(input);
    const supabase = await getAdminClient();

    const { data: row, error: readError } = await supabase
        .from("site_settings")
        .select("data")
        .eq("key", "site")
        .maybeSingle();

    if (readError) {
        throw new Error(
            `Could not load existing settings: ${readError.message}`,
        );
    }

    const existingData = row?.data;

    const next: { [key: string]: Json | undefined } = {
        ...(existingData &&
        typeof existingData === "object" &&
        !Array.isArray(existingData)
            ? existingData
            : {}),
    };

    for (const [key, value] of Object.entries(settings)) {
        if (value) {
            next[key] = value;
        } else {
            delete next[key];
        }
    }

    const { data, error: writeError } = await supabase
        .from("site_settings")
        .upsert(
            {
                key: "site",
                data: next,
            },
            {
                onConflict: "key",
            },
        )
        .select("key")
        .single();

    if (writeError || !data) {
        throw new Error(
            `Could not save settings: ${writeError?.message ?? "No saved record returned."}`,
        );
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");

    return { ok: true as const };
}