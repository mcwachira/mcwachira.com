
"use server";

import { Resend } from "resend";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

type ContactInput = {
    name: string;
    email: string;
    message: string;
    website?: string;
    csrfToken?: string;
};

type ContactResult =
    | {
    ok: true;
    emailSent: boolean;
}
    | {
    ok: false;
    message: string;
    fieldErrors?: {
        name?: string;
        email?: string;
        message?: string;
    };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CSRF_COOKIE_NAME = "csrf_token";
const CSRF_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

// Rate limit: 5 submissions per hour per email
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

async function getCsrfToken(): Promise<string> {
    const cookieStore = await cookies();
    let token = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (!token) {
        token = crypto.randomUUID();
        cookieStore.set(CSRF_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: CSRF_COOKIE_MAX_AGE,
            path: "/",
        });
    }

    return token;
}

async function validateCsrfToken(submittedToken: string | undefined): Promise<boolean> {
    if (!submittedToken) {
        return false;
    }

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (!cookieToken) {
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    if (submittedToken.length !== cookieToken.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < submittedToken.length; i++) {
        result |= submittedToken.charCodeAt(i) ^ cookieToken.charCodeAt(i);
    }

    return result === 0;
}

async function checkRateLimit(supabase: Awaited<ReturnType<typeof createClient>>, email: string): Promise<{ allowed: boolean; retryAfter?: number }> {
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    const { data, error } = await supabase
        .from("contact_messages")
        .select("created_at")
        .eq("email", email)
        .gte("created_at", windowStart)
        .order("created_at", { ascending: false })
        .limit(RATE_LIMIT_MAX);

    if (error) {
        console.error("Rate limit check error:", error);
        // Fail open - allow request if rate limit check fails
        return { allowed: true };
    }

    const count = data?.length ?? 0;

    if (count >= RATE_LIMIT_MAX) {
        const oldestInWindow = data?.[data.length - 1]?.created_at;
        const retryAfter = oldestInWindow
            ? Math.max(0, Math.ceil((new Date(oldestInWindow).getTime() + RATE_LIMIT_WINDOW_MS - Date.now()) / 1000))
            : RATE_LIMIT_WINDOW_MS / 1000;
        return { allowed: false, retryAfter };
    }

    return { allowed: true };
}

export async function submitContactMessage(
    input: ContactInput,
): Promise<ContactResult> {
    try {
        // Validate CSRF token
        const csrfValid = await validateCsrfToken(input.csrfToken);
        if (!csrfValid) {
            return {
                ok: false,
                message: "Invalid request. Please refresh the page and try again.",
            };
        }

        // Validate input on the server.
        const name = String(input?.name ?? "").trim();
        const email = String(input?.email ?? "").trim().toLowerCase();
        const message = String(input?.message ?? "").trim();
        const website = String(input?.website ?? "").trim();

        const fieldErrors: {
            name?: string;
            email?: string;
            message?: string;
        } = {};

        if (!name || name.length > 120) {
            fieldErrors.name = "Please provide a valid name.";
        }

        if (!emailPattern.test(email) || email.length > 254) {
            fieldErrors.email = "Please provide a valid email address.";
        }

        if (message.length < 20 || message.length > 10000) {
            fieldErrors.message =
                "Your message must be between 20 and 10,000 characters.";
        }

        if (Object.keys(fieldErrors).length > 0) {
            return {
                ok: false,
                message: "Please correct the highlighted fields.",
                fieldErrors,
            };
        }

        // Honeypot: silently accept automated bot submissions.
        if (website) {
            return {
                ok: true,
                emailSent: false,
            };
        }

        const supabase = await createClient();

        // Rate limiting by email
        const { allowed, retryAfter } = await checkRateLimit(supabase, email);

        if (!allowed) {
            return {
                ok: false,
                message: `Too many submissions. Please try again in ${Math.ceil((retryAfter ?? 3600) / 60)} minutes.`,
                fieldErrors: {
                    message: `Rate limit exceeded. Please wait before submitting again.`,
                },
            };
        }

        // Save the enquiry before attempting email delivery.
        const { data, error } = await supabase
            .from("contact_messages")
            .insert({
                name,
                email,
                message,
                status: "new",
                read: false,
            })
            .select("id")
            .single();

        if (error || !data) {
            console.error("Contact message database error:", error);

            return {
                ok: false,
                message: "Your message could not be saved. Please try again.",
            };
        }

        // Email notification is independent of database persistence.
        const resendApiKey = process.env.RESEND_API_KEY;
        const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
        const fromEmail = process.env.RESEND_FROM_EMAIL;

        if (!resendApiKey || !notificationEmail || !fromEmail) {
            console.error("Contact email configuration is incomplete.");

            return {
                ok: true,
                emailSent: false,
            };
        }

        try {
            const resend = new Resend(resendApiKey);

            const { error: emailError } = await resend.emails.send({
                from: fromEmail,
                to: notificationEmail,
                replyTo: email,
                subject: `New website enquiry from ${name}`,
                text: [
                    "New contact form submission",
                    "",
                    `Name: ${name}`,
                    `Email: ${email}`,
                    "",
                    "Message:",
                    message,
                    "",
                    `Message ID: ${data.id}`,
                ].join("\n"),
            });

            if (emailError) {
                console.error("Resend notification error:", emailError);

                return {
                    ok: true,
                    emailSent: false,
                };
            }

            return {
                ok: true,
                emailSent: true,
            };
        } catch (emailError) {
            console.error("Contact email delivery failed:", emailError);

            return {
                ok: true,
                emailSent: false,
            };
        }
    } catch (error) {
        console.error("Contact submission failed:", error);

        return {
            ok: false,
            message: "Your message could not be sent. Please try again.",
        };
    }
}

// Server action to get/set CSRF token for the contact form
export async function getContactCsrfToken(): Promise<string> {
    return getCsrfToken();
}
