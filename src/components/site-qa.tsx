"use client";

import { useState } from "react";
import { askSite, type AskResult } from "@/lib/ask.actions";

type Turn = {
    role: "user" | "assistant";
    content: string;
    error?: boolean;
};

const SUGGESTIONS = [
    "What has Charles built with Zoho?",
    "What's his experience with CRM integrations?",
    "Which industries has he worked in?",
];

export function SiteQa() {
    const [turns, setTurns] = useState<Turn[]>([]);
    const [question, setQuestion] = useState("");
    const [busy, setBusy] = useState(false);

    async function send(q: string) {
        const text = q.trim();

        if (!text || busy) return;

        setBusy(true);
        setQuestion("");

        const history = turns.slice(-6).map((turn) => ({
            role: turn.role,
            content: turn.content,
        }));

        setTurns((previous) => [
            ...previous,
            { role: "user", content: text },
        ]);

        let result: AskResult;

        try {
            result = await askSite({
                question: text,
                history,
            });
        } catch {
            result = {
                error: "The assistant could not answer right now. Please try again, or use the contact form.",
            };
        }

        setTurns((previous) => [
            ...previous,
            "error" in result
                ? {
                    role: "assistant",
                    content: result.error,
                    error: true,
                }
                : {
                    role: "assistant",
                    content: result.answer,
                },
        ]);

        setBusy(false);
    }

    return (
        <div className="edge bg-background">
            <div className="flex items-center justify-between border-b border-rule px-4 py-3">
                <p className="label">Ask the assistant</p>

                <p className="label hidden sm:inline">
                    Answers from published content only
                </p>
            </div>

            <div
                aria-live="polite"
                className="max-h-96 min-h-24 space-y-4 overflow-y-auto px-4 py-4"
            >
                {turns.length === 0 && (
                    <div className="space-y-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Questions about Charles's experience, systems he
                            has delivered, or how he works — answered from what
                            is published on this site.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {SUGGESTIONS.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => send(suggestion)}
                                    disabled={busy}
                                    className="edge bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {turns.map((turn, index) => (
                    <div
                        key={index}
                        className={
                            turn.role === "user" ? "flex justify-end" : ""
                        }
                    >
                        <div
                            className={
                                turn.role === "user"
                                    ? "max-w-[85%] bg-accent px-3 py-2 text-sm text-accent-foreground"
                                    : `max-w-[95%] border-l-2 ${
                                        turn.error
                                            ? "border-destructive"
                                            : "border-accent"
                                    } py-1 text-sm leading-relaxed text-foreground`
                            }
                        >
                            <span className="sr-only">
                                {turn.role === "user"
                                    ? "You asked: "
                                    : "Answer: "}
                            </span>

                            {turn.content}
                        </div>
                    </div>
                ))}

                {busy && (
                    <p
                        className="font-mono text-xs text-muted-foreground"
                        aria-live="polite"
                    >
                        Reading the site…
                    </p>
                )}
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    void send(question);
                }}
                className="flex gap-2 border-t border-rule p-3"
            >
                <label htmlFor="qa-question" className="sr-only">
                    Your question
                </label>

                <input
                    id="qa-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    maxLength={600}
                    disabled={busy}
                    placeholder="Ask about experience, projects, delivery…"
                    className="edge min-w-0 flex-1 bg-background px-3 py-2 font-sans text-sm outline-none focus:border-accent placeholder:text-muted-foreground disabled:opacity-60"
                />

                <button
                    type="submit"
                    disabled={busy || question.trim().length < 3}
                    className="press edge bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Ask
                </button>
            </form>
        </div>
    );
}