
import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "./types";

function getSupabaseConfig() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
        const missing = [
            ...(!url ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
            ...(!publishableKey
                ? ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]
                : []),
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

/**
 * Server Supabase client.
 *
 * Creates a cookie-aware client for the current Next.js request.
 * Do not create this client at module scope.
 */
export async function createClient() {
    const cookieStore = await cookies();
    const { url, publishableKey } = getSupabaseConfig();

    return createServerClient<Database>(url, publishableKey, {
        global: {
            fetch: createSupabaseFetch(publishableKey),
        },

        cookies: {
            getAll() {
                return cookieStore.getAll();
            },

            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch {
                    // Server Components cannot write cookies during rendering.
                    // The Next.js Proxy is responsible for refreshing sessions.
                }
            },
        },
    });
}
