
"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "@/lib/settings.actions";
import type { SiteSettings } from "./page";

type Props = {
    initialSettings: SiteSettings;
};

const fields: Array<{
    name: keyof SiteSettings;
    label: string;
    description: string;
    maxLength: number;
    multiline?: boolean;
}> = [
    {
        name: "homeTitle",
        label: "Homepage title",
        description: "The main title displayed on your homepage.",
        maxLength: 120,
    },
    {
        name: "homeDescription",
        label: "Homepage description",
        description: "The introductory description displayed on your homepage.",
        maxLength: 300,
        multiline: true,
    },
    {
        name: "ogTitle",
        label: "Open Graph title",
        description: "The title used when your website is shared on social platforms.",
        maxLength: 120,
    },
    {
        name: "ogDescription",
        label: "Open Graph description",
        description: "The description used in social sharing previews.",
        maxLength: 300,
        multiline: true,
    },
];

export default function SettingsClient({ initialSettings }: Props) {
    const [form, setForm] = useState(initialSettings);
    const [pending, startTransition] = useTransition();
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    function updateField(name: keyof SiteSettings, value: string) {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);

        startTransition(async () => {
            try {
                await updateSettings(form);

                setMessage({
                    type: "success",
                    text: "Settings saved successfully.",
                });
            } catch (error) {
                setMessage({
                    type: "error",
                    text:
                        error instanceof Error
                            ? error.message
                            : "Could not save settings.",
                });
            }
        });
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Site settings
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your homepage content and search/social sharing metadata.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-lg border p-5 sm:p-6"
            >
                {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <label
                                htmlFor={field.name}
                                className="text-sm font-medium"
                            >
                                {field.label}
                            </label>
                            <span className="text-xs tabular-nums text-muted-foreground">
                                {form[field.name].length}/{field.maxLength}
                            </span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {field.description}
                        </p>

                        {field.multiline ? (
                            <textarea
                                id={field.name}
                                value={form[field.name]}
                                onChange={(event) =>
                                    updateField(field.name, event.target.value)
                                }
                                maxLength={field.maxLength}
                                rows={4}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                            />
                        ) : (
                            <input
                                id={field.name}
                                type="text"
                                value={form[field.name]}
                                onChange={(event) =>
                                    updateField(field.name, event.target.value)
                                }
                                maxLength={field.maxLength}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                            />
                        )}
                    </div>
                ))}

                {message && (
                    <div
                        role={message.type === "error" ? "alert" : "status"}
                        className={`rounded-md border p-3 text-sm ${
                            message.type === "error"
                                ? "border-destructive/30 text-destructive"
                                : "text-foreground"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                    <p className="text-xs text-muted-foreground">
                        Empty fields clear their corresponding setting.
                    </p>

                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {pending ? "Saving..." : "Save settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
