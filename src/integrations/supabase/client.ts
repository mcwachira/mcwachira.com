
"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

function getSupabaseConfig() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
        const missing = [
            ...(!url ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
            ...(!publishableKey ? ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] : []),
        ];

        throw new Error(
            `Missing Supabase environment variable(s): ${missing.join(", ")}`,
        );
    }

    return { url, publishableKey };
}

function isNewSupabaseApiKey(value: string): boolean {
    return (
        value.startsWith("sb_publishable_") ||
        value.startsWith("sb_secret_")
    );
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
    return (input, init) => {
        const headers = new Headers(
            typeof Request !== "undefined" && input instanceof Request
                ? input.headers
                : undefined,
        );

        if (init?.headers) {
            new Headers(init.headers).forEach((value, key) => {
                headers.set(key, value);
            });
        }

        // New Supabase API keys are opaque strings, not bearer JWTs.
        if (
            isNewSupabaseApiKey(supabaseKey) &&
            headers.get("Authorization") === `Bearer ${supabaseKey}`
        ) {
            headers.delete("Authorization");
        }

        headers.set("apikey", supabaseKey);

        return fetch(input, {
            ...init,
            headers,
        });
    };
}

const { url, publishableKey } = getSupabaseConfig();

/**
 * Browser Supabase client.
 *
 * Use this in Client Components for browser-side Supabase functionality.
 * createBrowserClient manages browser authentication storage.
 */
export const supabase = createBrowserClient<Database>(
    url,
    publishableKey,
    {
        global: {
            fetch: createSupabaseFetch(publishableKey),
        },
    },
);
