
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/integrations/supabase/server";

export async function signOutAdmin() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(`Could not sign out: ${error.message}`);
    }

    redirect("/");
}
