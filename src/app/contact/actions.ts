
"use server";

import { Resend } from "resend";
import { createClient } from "@/integrations/supabase/server";

type ContactInput = {
    name: string;
    email: string;
    message: string;
    website?: string;
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

export async function submitContactMessage(
    input: ContactInput,
): Promise<ContactResult> {
    try {
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

        // Save the enquiry before attempting email delivery.
        const supabase = await createClient();

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
