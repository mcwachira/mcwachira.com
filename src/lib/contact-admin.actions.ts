
"use server";

import { createClient } from "@/integrations/supabase/server";

type MessageStatus = "new" | "read" | "replied" | "archived";

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

export async function listMessages() {
    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Could not load messages: ${error.message}`);
    }

    return data;
}

export async function setMessageStatus(input: {
    id: string;
    status: MessageStatus;
}) {
    if (
        !input ||
        typeof input.id !== "string" ||
        !input.id.trim()
    ) {
        throw new Error("A valid message ID is required.");
    }

    const allowedStatuses: MessageStatus[] = [
        "new",
        "read",
        "replied",
        "archived",
    ];

    if (!allowedStatuses.includes(input.status)) {
        throw new Error("Invalid message status.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("contact_messages")
        .update({
            status: input.status,
            read: input.status !== "new",
        })
        .eq("id", input.id)
        .select("id")
        .maybeSingle();

    if (error) {
        throw new Error(`Could not update message: ${error.message}`);
    }

    if (!data) {
        throw new Error("Message not found or could not be updated.");
    }

    return { ok: true as const };
}

export async function deleteMessage(input: { id: string }) {
    if (
        !input ||
        typeof input.id !== "string" ||
        !input.id.trim()
    ) {
        throw new Error("A valid message ID is required.");
    }

    const supabase = await getAdminClient();

    const { data, error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", input.id)
        .select("id")
        .maybeSingle();

    if (error) {
        throw new Error(`Could not delete message: ${error.message}`);
    }

    if (!data) {
        throw new Error("Message not found or could not be deleted.");
    }

    return { ok: true as const };
}
