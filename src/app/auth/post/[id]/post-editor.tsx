"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Database } from "@/integrations/supabase/types";
import {
    deletePost,
    savePost,
    type PostInput,
} from "@/lib/posts.actions";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];

type Props = {
    id: string;
    initialPost: PostRow | null;
};

const STATUSES = [
    "draft",
    "published",
    "scheduled",
    "needs-review",
    "archived",
] as const;

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function toLocalDateTime(value: string | null) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset() * 60_000;

    return new Date(date.getTime() - offset)
        .toISOString()
        .slice(0, 16);
}

function createInitialForm(post: PostRow | null): PostInput {
    if (!post) {
        return {
            title: "",
            slug: "",
            excerpt: "",
            body: "",
            category: "",
            tags: [],
            published_at: "",
            read_time: 0,
            status: "draft",
            featured: false,
            seo_title: "",
            seo_description: "",
        };
    }

    return {
        title: post.title ?? "",
        slug: post.slug ?? "",
        excerpt: post.excerpt ?? "",
        body: post.body ?? "",
        category: post.category ?? "",
        tags: Array.isArray(post.tags)
            ? post.tags.filter((tag): tag is string => typeof tag === "string")
            : [],
        published_at: toLocalDateTime(post.published_at),
        read_time: Number(post.read_time ?? 0),
        status: post.status ?? "draft",
        featured: post.featured ?? false,
        seo_title: post.seo_title ?? "",
        seo_description: post.seo_description ?? "",
    };
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
        <label className="block space-y-2">
            <span className="block text-sm font-medium">{label}</span>
            {children}
            {hint && (
                <span className="block text-xs text-muted-foreground">
                    {hint}
                </span>
            )}
        </label>
    );
}

const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

const textareaClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

export default function PostEditor({ id, initialPost }: Props) {
    const router = useRouter();
    const [form, setForm] = useState<PostInput>(() =>
        createInitialForm(initialPost),
    );
    const [preview, setPreview] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();

    const isNew = id === "new";

    function update<K extends keyof PostInput>(
        key: K,
        value: PostInput[K],
    ) {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        const title = form.title.trim();
        const slug = form.slug.trim() || slugify(title);

        if (!title) {
            setError("A post title is required.");
            return;
        }

        if (!slug) {
            setError("A post slug is required.");
            return;
        }

        const publishedAt = form.published_at
            ? new Date(form.published_at).toISOString()
            : "";

        const post: PostInput = {
            ...form,
            title,
            slug,
            published_at: publishedAt,
        };

        startTransition(async () => {
            try {
                const result = await savePost({
                    id: isNew ? undefined : id,
                    post,
                });

                setSuccess("Post saved successfully.");

                if (isNew) {
                    router.replace(`/admin/posts/${result.id}`);
                } else {
                    router.refresh();
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not save the post.",
                );
            }
        });
    }

    function handleDelete() {
        if (isNew) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this post? This cannot be undone.",
        );

        if (!confirmed) return;

        setError("");
        setSuccess("");

        startTransition(async () => {
            try {
                await deletePost(id);
                router.push("/admin/posts");
                router.refresh();
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not delete the post.",
                );
            }
        });
    }

    const publicUrl =
        form.slug.trim() && form.status === "published" && form.body.trim()
            ? `/writing/${form.slug.trim()}`
            : null;

    return (
        <form onSubmit={handleSave} className="space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <Link
                        href="/admin/posts"
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        ← Back to posts
                    </Link>

                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {isNew ? "New post" : "Edit post"}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the post content, publishing details, and SEO.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {!isNew && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending}
                            className="rounded-lg border border-destructive/40 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
                        >
                            Delete
                        </button>
                    )}

                    {publicUrl && (
                        <Link
                            href={publicUrl}
                            target="_blank"
                            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                        >
                            View post
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                        {isPending ? "Saving..." : "Save post"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
                    {success}
                </div>
            )}

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0 space-y-6">
                    <section className="space-y-5 rounded-xl border border-border p-5">
                        <h2 className="font-semibold">Content</h2>

                        <Field label="Title">
                            <input
                                value={form.title}
                                onChange={(event) =>
                                    update("title", event.target.value)
                                }
                                className={inputClass}
                                placeholder="Post title"
                            />
                        </Field>

                        <Field label="Slug">
                            <input
                                value={form.slug}
                                onChange={(event) =>
                                    update("slug", event.target.value)
                                }
                                className={inputClass}
                                placeholder="post-url-slug"
                            />
                        </Field>

                        <Field label="Excerpt">
                            <textarea
                                value={form.excerpt}
                                onChange={(event) =>
                                    update("excerpt", event.target.value)
                                }
                                rows={3}
                                className={textareaClass}
                                placeholder="A short summary of the post..."
                            />
                        </Field>

                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h3 className="text-sm font-medium">Body</h3>

                                <div className="flex rounded-lg border border-border p-1">
                                    <button
                                        type="button"
                                        onClick={() => setPreview(false)}
                                        className={`rounded-md px-3 py-1.5 text-xs ${
                                            !preview
                                                ? "bg-muted font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        Write
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPreview(true)}
                                        className={`rounded-md px-3 py-1.5 text-xs ${
                                            preview
                                                ? "bg-muted font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>

                            {preview ? (
                                <div className="prose prose-neutral min-h-[400px] max-w-none rounded-lg border border-border bg-background p-5 dark:prose-invert">
                                    {form.body.trim() ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {form.body}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="text-muted-foreground">
                                            Nothing to preview yet.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    value={form.body}
                                    onChange={(event) =>
                                        update("body", event.target.value)
                                    }
                                    rows={24}
                                    className={`${textareaClass} min-h-[400px] font-mono leading-6`}
                                    placeholder="Write your post in Markdown..."
                                />
                            )}
                        </div>
                    </section>

                    <section className="space-y-5 rounded-xl border border-border p-5">
                        <h2 className="font-semibold">SEO</h2>

                        <Field label="SEO title">
                            <input
                                value={form.seo_title}
                                onChange={(event) =>
                                    update("seo_title", event.target.value)
                                }
                                maxLength={120}
                                className={inputClass}
                            />
                        </Field>

                        <Field label="SEO description">
                            <textarea
                                value={form.seo_description}
                                onChange={(event) =>
                                    update("seo_description", event.target.value)
                                }
                                maxLength={300}
                                rows={3}
                                className={textareaClass}
                            />
                        </Field>
                    </section>
                </div>

                <aside className="space-y-6">
                    <section className="space-y-5 rounded-xl border border-border p-5">
                        <h2 className="font-semibold">Publishing</h2>

                        <Field label="Status">
                            <select
                                value={form.status}
                                onChange={(event) =>
                                    update("status", event.target.value)
                                }
                                className={inputClass}
                            >
                                {STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status.replace("-", " ")}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Published at">
                            <input
                                type="datetime-local"
                                value={form.published_at}
                                onChange={(event) =>
                                    update("published_at", event.target.value)
                                }
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Category">
                            <input
                                value={form.category}
                                onChange={(event) =>
                                    update("category", event.target.value)
                                }
                                className={inputClass}
                                placeholder="Engineering"
                            />
                        </Field>

                        <Field label="Tags" hint="Separate tags with commas.">
                            <input
                                value={form.tags.join(", ")}
                                onChange={(event) =>
                                    update(
                                        "tags",
                                        event.target.value
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter(Boolean),
                                    )
                                }
                                className={inputClass}
                                placeholder="Zoho, Engineering, Software"
                            />
                        </Field>

                        <Field label="Read time (minutes)">
                            <input
                                type="number"
                                min={0}
                                value={form.read_time || ""}
                                onChange={(event) =>
                                    update(
                                        "read_time",
                                        Number(event.target.value),
                                    )
                                }
                                className={inputClass}
                                placeholder="Automatic estimate"
                            />
                        </Field>

                        <label className="flex items-center gap-3 text-sm">
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(event) =>
                                    update("featured", event.target.checked)
                                }
                                className="size-4 rounded border-input"
                            />
                            Featured post
                        </label>
                    </section>

                    <section className="rounded-xl border border-border p-5">
                        <h2 className="font-semibold">Writing details</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {form.body.trim()
                                ? `${form.body.trim().split(/\s+/).filter(Boolean).length} words`
                                : "No words yet"}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {form.read_time > 0
                                ? `${form.read_time} minute read`
                                : "Read time will be estimated when saved."}
                        </p>
                    </section>
                </aside>
            </div>

            <div className="flex justify-end border-t border-border pt-5">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                    {isPending ? "Saving..." : "Save post"}
                </button>
            </div>
        </form>
    );
}