
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Json } from "@/integrations/supabase/types";
import {
    deleteProject,
    saveProject,
    type ProjectInput,
} from "@/lib/projects.actions";

type ProjectRow = ProjectInput & {
    id: string;
    created_at?: string;
    updated_at?: string;
};

type Props = {
    id: string;
    initialProject: ProjectRow | null;
};

type DataObject = Record<string, unknown>;

const blank: ProjectInput = {
    slug: "",
    title: "",
    kind: "engineering",
    state: "draft",
    verification: "needs-review",
    featured: false,
    featured_order: 0,
    current_build: false,
    sort_order: 200,
    data: {},
};

function stringValue(data: DataObject, key: string): string {
    return typeof data[key] === "string" ? data[key] as string : "";
}

function arrayValue(data: DataObject, key: string): string[] {
    return Array.isArray(data[key])
        ? data[key].filter((value): value is string => typeof value === "string")
        : [];
}

function lines(value: string): string[] {
    return value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}

function csv(value: string): string[] {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function Field({
                   label,
                   hint,
                   children,
               }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium">{label}</span>
            {children}
            {hint && (
                <span className="mt-1 block text-xs text-muted-foreground">
                    {hint}
                </span>
            )}
        </label>
    );
}

const inputClass =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function TextInput({
                       value,
                       onChange,
                       required,
                       type = "text",
                   }: {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    type?: string;
}) {
    return (
        <input
            type={type}
            required={required}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
        />
    );
}

function TextArea({
                      value,
                      onChange,
                      rows = 3,
                  }: {
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}) {
    return (
        <textarea
            rows={rows}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
        />
    );
}

function Select({
                    value,
                    onChange,
                    options,
                }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

function Check({
                   label,
                   checked,
                   onChange,
               }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="h-4 w-4 accent-current"
            />
            <span className="text-sm">{label}</span>
        </label>
    );
}

export default function ProjectEditor({
                                          id,
                                          initialProject,
                                      }: Props) {
    const router = useRouter();
    const isNew = id === "new";

    const [form, setForm] = useState<ProjectInput>(() => {
        if (!initialProject) return blank;

        return {
            slug: initialProject.slug,
            title: initialProject.title,
            kind: initialProject.kind,
            state: initialProject.state,
            verification: initialProject.verification,
            featured: initialProject.featured,
            featured_order: initialProject.featured_order ?? 0,
            current_build: initialProject.current_build,
            sort_order: initialProject.sort_order,
            data: initialProject.data ?? {},
        };
    });

    const [message, setMessage] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    const data = (form.data ?? {}) as DataObject;

    function setField<K extends keyof ProjectInput>(
        key: K,
        value: ProjectInput[K],
    ) {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    }

    function setData(key: string, value: unknown) {
        setForm((current) => ({
            ...current,
            data: {
                ...(current.data as DataObject),
                [key]: value,
            } as Json,
        }));
    }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);

        startTransition(async () => {
            try {
                const result = await saveProject({
                    id: isNew ? undefined : id,
                    project: form,
                });

                setMessage("Saved successfully.");

                if (isNew) {
                    router.replace(`/admin/projects/${result.id}`);
                } else {
                    router.refresh();
                }
            } catch (error) {
                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Could not save project.",
                );
            }
        });
    }

    function handleDelete() {
        if (isNew) return;

        if (!window.confirm(`Delete "${form.title}"? This can't be undone.`)) {
            return;
        }

        setMessage(null);

        startTransition(async () => {
            try {
                await deleteProject(id);
                router.push("/admin/projects");
                router.refresh();
            } catch (error) {
                setMessage(
                    error instanceof Error
                        ? error.message
                        : "Could not delete project.",
                );
            }
        });
    }

    return (
        <form onSubmit={handleSave} className="max-w-4xl space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Link
                        href="/admin/projects"
                        className="text-sm text-muted-foreground underline underline-offset-4"
                    >
                        ← Projects
                    </Link>

                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {isNew ? "New project" : form.title}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    {form.state === "published" && !isNew && (
                        <a
                            href={`/work/${form.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline underline-offset-4"
                        >
                            View on site ↗
                        </a>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
                    >
                        {pending ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {message && (
                <p role="status" className="text-sm">
                    {message}
                </p>
            )}

            <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                <Field label="Title">
                    <TextInput
                        required
                        value={form.title}
                        onChange={(value) => setField("title", value)}
                    />
                </Field>

                <Field
                    label="Slug"
                    hint="Lowercase with dashes. Used in the project URL."
                >
                    <TextInput
                        required
                        value={form.slug}
                        onChange={(value) => setField("slug", value)}
                    />
                </Field>

                <Field label="Type">
                    <Select
                        value={form.kind}
                        onChange={(value) => setField("kind", value)}
                        options={["engineering", "case-study"]}
                    />
                </Field>

                <Field label="Visibility">
                    <Select
                        value={form.state}
                        onChange={(value) => setField("state", value)}
                        options={["published", "draft", "archived"]}
                    />
                </Field>

                <Field
                    label="Verification"
                    hint="Keep unverified projects as drafts."
                >
                    <Select
                        value={form.verification}
                        onChange={(value) => setField("verification", value)}
                        options={["verified", "needs-review"]}
                    />
                </Field>

                <Field label="List order">
                    <TextInput
                        type="number"
                        value={String(form.sort_order)}
                        onChange={(value) => setField("sort_order", Number(value))}
                    />
                </Field>

                <div className="flex flex-wrap items-center gap-6 md:col-span-2">
                    <Check
                        label="Featured"
                        checked={form.featured}
                        onChange={(value) => setField("featured", value)}
                    />

                    <Check
                        label="Current build"
                        checked={form.current_build}
                        onChange={(value) => setField("current_build", value)}
                    />

                    <div className="w-36">
                        <Field label="Featured order">
                            <TextInput
                                type="number"
                                value={String(form.featured_order)}
                                onChange={(value) =>
                                    setField("featured_order", Number(value))
                                }
                            />
                        </Field>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                <Field label="Number">
                    <TextInput
                        value={stringValue(data, "no")}
                        onChange={(value) => setData("no", value)}
                    />
                </Field>

                <Field label="Category">
                    <TextInput
                        value={stringValue(data, "category")}
                        onChange={(value) => setData("category", value)}
                    />
                </Field>

                <div className="md:col-span-2">
                    <Field label="Summary">
                        <TextArea
                            value={stringValue(data, "summary")}
                            onChange={(value) => setData("summary", value)}
                        />
                    </Field>
                </div>

                <Field label="Technologies" hint="Comma separated.">
                    <TextArea
                        value={arrayValue(data, "technologies").join(", ")}
                        onChange={(value) => setData("technologies", csv(value))}
                    />
                </Field>

                <Field
                    label="System flow"
                    hint="Comma separated steps for the diagram."
                >
                    <TextArea
                        value={arrayValue(data, "flow").join(", ")}
                        onChange={(value) => setData("flow", csv(value))}
                    />
                </Field>
            </section>

            {form.kind === "engineering" ? (
                <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                    <Field
                        label="Status label"
                        hint="e.g. Current build, Repository, Experiment"
                    >
                        <TextInput
                            value={stringValue(data, "statusLabel")}
                            onChange={(value) => setData("statusLabel", value)}
                        />
                    </Field>

                    <Field
                        label="Work type"
                        hint="e.g. Personal project, Client project"
                    >
                        <TextInput
                            value={stringValue(data, "provenance")}
                            onChange={(value) => setData("provenance", value)}
                        />
                    </Field>

                    <Field
                        label="Filters"
                        hint="Comma separated: Full-Stack, Business Systems, E-Commerce, CMS / Content, CRM / Automation, Client Work, Personal Builds"
                    >
                        <TextInput
                            value={arrayValue(data, "categories").join(", ")}
                            onChange={(value) => setData("categories", csv(value))}
                        />
                    </Field>

                    <Field label="Repository link">
                        <TextInput
                            value={stringValue(data, "github")}
                            onChange={(value) => setData("github", value)}
                        />
                    </Field>

                    <Field label="Live demo link">
                        <TextInput
                            value={stringValue(data, "live")}
                            onChange={(value) =>
                                setData("live", value || undefined)
                            }
                        />
                    </Field>

                    <div className="md:col-span-2">
                        <Field label="Overview">
                            <TextArea
                                rows={4}
                                value={stringValue(data, "detail")}
                                onChange={(value) =>
                                    setData("detail", value || undefined)
                                }
                            />
                        </Field>
                    </div>

                    <div className="md:col-span-2">
                        <Field
                            label="Documented features"
                            hint="One per line."
                        >
                            <TextArea
                                rows={6}
                                value={arrayValue(data, "features").join("\n")}
                                onChange={(value) => {
                                    const result = lines(value);
                                    setData(
                                        "features",
                                        result.length ? result : undefined,
                                    );
                                }}
                            />
                        </Field>
                    </div>
                </section>
            ) : (
                <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                    <Field label="Client">
                        <TextInput
                            value={stringValue(data, "client")}
                            onChange={(value) => setData("client", value)}
                        />
                    </Field>

                    <Field label="Engagement type">
                        <TextInput
                            value={stringValue(data, "type")}
                            onChange={(value) => setData("type", value)}
                        />
                    </Field>

                    <Field label="Year">
                        <TextInput
                            value={stringValue(data, "year")}
                            onChange={(value) => setData("year", value)}
                        />
                    </Field>

                    <Field label="Role">
                        <TextInput
                            value={stringValue(data, "role")}
                            onChange={(value) => setData("role", value)}
                        />
                    </Field>

                    <div className="md:col-span-2">
                        <Field label="The problem">
                            <TextArea
                                rows={4}
                                value={stringValue(data, "problem")}
                                onChange={(value) => setData("problem", value)}
                            />
                        </Field>
                    </div>

                    {(["approach", "decisions", "outcomes"] as const).map(
                        (key) => (
                            <div key={key} className="md:col-span-2">
                                <Field
                                    label={key[0].toUpperCase() + key.slice(1)}
                                    hint={
                                        key === "outcomes"
                                            ? "One per line. Outcomes must come from your CV."
                                            : "One per line."
                                    }
                                >
                                    <TextArea
                                        rows={5}
                                        value={arrayValue(data, key).join("\n")}
                                        onChange={(value) =>
                                            setData(key, lines(value))
                                        }
                                    />
                                </Field>
                            </div>
                        ),
                    )}
                </section>
            )}

            {!isNew && (
                <div className="border-t pt-6">
                    <button
                        type="button"
                        disabled={pending}
                        onClick={handleDelete}
                        className="text-sm text-destructive underline underline-offset-4 disabled:opacity-50"
                    >
                        Delete project
                    </button>
                </div>
            )}
        </form>
    );
}
