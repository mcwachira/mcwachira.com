
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/integrations/supabase/client";

export default function AuthForm() {
    const router = useRouter();

    const [mode, setMode] = useState<"in" | "up">("in");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function checkSession() {
            const { data, error } = await supabase.auth.getSession();

            if (active && !error && data.session) {
                router.replace("/admin");
            }
        }

        void checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace("/admin");
            }
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, [router]);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setBusy(true);
        setMsg(null);

        try {
            const result =
                mode === "in"
                    ? await supabase.auth.signInWithPassword({
                        email,
                        password,
                    })
                    : await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            emailRedirectTo: `${window.location.origin}/admin`,
                        },
                    });

            if (result.error) {
                setMsg(result.error.message);
                return;
            }

            if (mode === "up" && !result.data.session) {
                setMsg(
                    "Check your inbox to confirm your email, then sign in.",
                );
            }
        } catch (error) {
            setMsg(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setBusy(false);
        }
    }

    async function google() {
        setBusy(true);
        setMsg(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth`,
                },
            });

            if (error) {
                setMsg(error.message);
                setBusy(false);
            }
        } catch (error) {
            setMsg(
                error instanceof Error
                    ? error.message
                    : "Google sign-in could not be started.",
            );
            setBusy(false);
        }
    }

    return (
        <main className="rule-field flex min-h-screen items-center justify-center px-4">
            <div className="edge shadow-hard w-full max-w-sm bg-background p-6">
                <p className="label">CW / Admin</p>

                <h1 className="mt-2 font-display text-3xl font-bold">
                    {mode === "in" ? "Sign in" : "Create account"}
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Content management for this site. Owner access only.
                </p>

                <button
                    type="button"
                    onClick={google}
                    disabled={busy}
                    className="press edge mt-6 w-full px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] disabled:opacity-60"
                >
                    Continue with Google
                </button>

                <p className="label my-4 text-center">or</p>

                <form onSubmit={submit} className="space-y-3">
                    <label className="block">
                        <span className="label">Email</span>
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            className="edge mt-1 w-full bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </label>

                    <label className="block">
                        <span className="label">Password</span>
                        <input
                            type="password"
                            required
                            minLength={8}
                            autoComplete={
                                mode === "in"
                                    ? "current-password"
                                    : "new-password"
                            }
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className="edge mt-1 w-full bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={busy}
                        className="press edge w-full bg-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-background disabled:opacity-60"
                    >
                        {busy
                            ? "Working..."
                            : mode === "in"
                                ? "Sign in"
                                : "Create account"}
                    </button>
                </form>

                {msg && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="mt-3 text-sm text-destructive"
                    >
                        {msg}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => {
                        setMode(mode === "in" ? "up" : "in");
                        setMsg(null);
                    }}
                    className="label mt-5 border-b border-accent pb-0.5 text-foreground"
                >
                    {mode === "in"
                        ? "First time? Create account"
                        : "Have an account? Sign in"}
                </button>
            </div>
        </main>
    );
}
