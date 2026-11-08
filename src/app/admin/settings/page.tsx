
import { createClient } from "@/integrations/supabase/server";
import SettingsClient from "./settings-client";
import type { Json } from "@/integrations/supabase/types";

export type SiteSettings = {
    homeTitle: string;
    homeDescription: string;
    ogTitle: string;
    ogDescription: string;
};

function getString(
    data: Record<string, Json> | null,
    key: keyof SiteSettings,
): string {
    const value = data?.[key];
    return typeof value === "string" ? value : "";
}

export default async function AdminSettingsPage() {
    const supabase = await createClient();

    const { data: row, error } = await supabase
        .from("site_settings")
        .select("data")
        .eq("key", "site")
        .maybeSingle();

    if (error) {
        throw new Error(`Could not load site settings: ${error.message}`);
    }

    const data = (row?.data ?? null) as Record<string, Json> | null;

    const initialSettings: SiteSettings = {
        homeTitle: getString(data, "homeTitle"),
        homeDescription: getString(data, "homeDescription"),
        ogTitle: getString(data, "ogTitle"),
        ogDescription: getString(data, "ogDescription"),
    };

    return <SettingsClient initialSettings={initialSettings} />;
}
