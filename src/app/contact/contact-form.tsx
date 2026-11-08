
"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";

import { SiteQa } from "@/components/site-qa";
import { profile } from "@/data/site";
import { submitContactMessage, getContactCsrfToken } from "./actions";

type FieldErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState("");
    const [csrfToken, setCsrfToken] = useState("");

    const [errors, setErrors] = useState<FieldErrors>({});
    const [sent, setSent] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [busy, setBusy] = useState(false);
    const [failed, setFailed] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCsrfToken() {
            try {
                const token = await getContactCsrfToken();
                setCsrfToken(token);
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
            }
        }
        fetchCsrfToken();
    }, []);

    function validate() {
        const nextErrors: FieldErrors = {};

        if (!name.trim()) {
            nextErrors.name = "Please add your name.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            nextErrors.email = "Please add a valid email address.";
        }

        if (message.trim().length < 20) {
            nextErrors.message =
                "A little more detail helps. Please use at least 20 characters.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (sent || busy) return;

        setFailed(null);

        if (!validate()) return;

        setBusy(true);

        try {
            const result = await submitContactMessage({
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                website,
                csrfToken,
            });

            if (!result.ok) {
                if (result.fieldErrors) {
                    setErrors(result.fieldErrors);
                }

                setFailed(result.message);
                return;
            }

            setEmailSent(result.emailSent);
            setSent(true);
        } catch (error) {
            setFailed(
                error instanceof Error
                    ? error.message
                    : "Your message could not be sent. Please try again.",
            );
        } finally {
            setBusy(false);
        }
    }

    const field =
        "w-full edge bg-background px-3 py-2.5 font-sans text-sm outline-none focus:border-accent placeholder:text-muted-foreground";

    return (
        <>
            <section className="border-b border-border">
                <div className="shell grid12 py-12 md:py-16">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <p className="label">01 / Contact</p>

                        <h1 className="fluid-display mt-4 font-bold">
                            Have a system
                            <br />
                            that needs building?
                        </h1>
                    </div>

                    <p className="col-span-2 mt-5 leading-relaxed text-muted-foreground md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        I take on software systems, business applications,
                        integrations, automation and full technical delivery
                        from architecture through handover.
                    </p>
                </div>
            </section>

            <section className="shell grid12 py-12 md:py-16">
                <div className="col-span-2 md:col-span-6 lg:col-span-7">
                    <p className="label">Send a message</p>

                    {sent ? (
                        <div className="edge mt-5 bg-background p-6" role="status">
                            <p className="label text-accent">Received</p>

                            <h2 className="mt-2 font-display text-2xl font-bold">
                                Your message is in.
                            </h2>

                            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                                Thank you, {name.trim().split(/\s+/)[0]}.
                                Your enquiry has been saved and I&apos;ll reply
                                to{" "}
                                <span className="font-mono text-foreground">
                                    {email.trim()}
                                </span>
                                , usually within two working days.
                            </p>

                            {!emailSent && (
                                <p className="mt-3 text-sm text-muted-foreground">
                                    The enquiry was saved, but the email
                                    notification could not be delivered.
                                    You can also reach me directly at{" "}
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="underline underline-offset-4"
                                    >
                                        {profile.email}
                                    </a>
                                    .
                                </p>
                            )}

                            <p
                                aria-live="polite"
                                className="mt-4 font-mono text-xs text-muted-foreground"
                            >
                                Nothing further is needed from you on this page.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={onSubmit}
                            noValidate
                            className="mt-5 space-y-5"
                        >
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input
                                    id="website"
                                    name="website"
                                    value={website}
                                    onChange={(event) =>
                                        setWebsite(event.target.value)
                                    }
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="label block">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    aria-invalid={!!errors.name}
                                    aria-describedby={
                                        errors.name ? "name-error" : undefined
                                    }
                                    className={`${field} mt-2`}
                                    placeholder="Your name"
                                />

                                {errors.name && (
                                    <p
                                        id="name-error"
                                        className="mt-1.5 font-mono text-xs text-destructive"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="label block">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    aria-invalid={!!errors.email}
                                    aria-describedby={
                                        errors.email ? "email-error" : undefined
                                    }
                                    className={`${field} mt-2`}
                                    placeholder="you@company.com"
                                />

                                {errors.email && (
                                    <p
                                        id="email-error"
                                        className="mt-1.5 font-mono text-xs text-destructive"
                                    >
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="label block"
                                >
                                    What needs building
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    required
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    aria-invalid={!!errors.message}
                                    aria-describedby={
                                        errors.message
                                            ? "message-error"
                                            : undefined
                                    }
                                    className={`${field} mt-2 resize-y`}
                                    placeholder="The operation, the problem, and what you need the system to do."
                                />

                                {errors.message && (
                                    <p
                                        id="message-error"
                                        className="mt-1.5 font-mono text-xs text-destructive"
                                    >
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={busy}
                                className="press edge bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {busy ? "Sending..." : "Send message"}
                            </button>

                            <p
                                aria-live="polite"
                                className="min-h-5 font-mono text-xs text-muted-foreground"
                            >
                                {failed ??
                                    "Your enquiry will be saved securely and a notification sent."}
                            </p>
                        </form>
                    )}
                </div>

                <aside className="col-span-2 mt-10 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
                    <p className="label">Direct</p>

                    <ul className="mt-3 divide-y divide-rule border-y border-rule">
                        <li className="py-3">
                            <p className="label">Email</p>
                            <a
                                href={`mailto:${profile.email}`}
                                className="break-all font-mono text-sm hover:text-accent"
                            >
                                {profile.email}
                            </a>
                        </li>

                        <li className="py-3">
                            <p className="label">LinkedIn</p>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all font-mono text-sm hover:text-accent"
                            >
                                maina-wachira
                            </a>
                        </li>

                        <li className="py-3">
                            <p className="label">GitHub</p>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all font-mono text-sm hover:text-accent"
                            >
                                mcwachira
                            </a>
                        </li>

                        <li className="py-3">
                            <p className="label">Location</p>
                            <p className="font-mono text-sm">
                                {profile.location}
                            </p>
                        </li>
                    </ul>

                    <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent("Booking a call")}`}
                        className="press edge mt-6 inline-block bg-background px-5 py-3 font-mono text-xs uppercase tracking-[0.14em]"
                    >
                        Book a call
                    </a>
                </aside>
            </section>

            <section className="border-t border-border">
                <div className="shell grid12 py-12 md:py-16">
                    <div className="col-span-2 md:col-span-6 lg:col-span-5">
                        <p className="label">02 / Quick answers</p>

                        <h2 className="fluid-section mt-3 font-bold">
                            Ask before you write
                        </h2>

                        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
                            Not sure whether the fit is right? Ask this
                            assistant about my experience, the systems I&apos;ve
                            delivered, or how I approach a build. It answers
                            only from what is published on this site. For
                            anything commercial or confidential, use the form
                            above.
                        </p>
                    </div>

                    <div className="col-span-2 mt-8 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:mt-0">
                        <SiteQa />
                    </div>
                </div>
            </section>
        </>
    );
}
