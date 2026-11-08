
import "server-only";

import { createClient } from "@/integrations/supabase/server";

/**
 * Verify the current Supabase session.
 *
 * Use this in protected Server Components, Server Actions,
 * and Route Handlers.
 */
export async function requireSupabaseAuth() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();

    const claims = data?.claims;

    if (error || !claims?.sub) {
        throw new Error("Unauthorized");
    }

    return {
        supabase,
        userId: claims.sub,
        claims,
    };
}
