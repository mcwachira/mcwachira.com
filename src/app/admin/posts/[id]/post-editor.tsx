
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    deletePost,
    savePost,
    type PostInput,
    type PostStatus,
} from "../actions";

type PostForm = Omit<PostInput, "id"> & {
    id?: string;
};

type Props = {
    initialPost?: PostForm;
};

const blankPost: PostForm = {
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "",
    tags: [],
    published_at: "",
    read_time: "",
    status: "draft",
    featured: false,
    seo_title: "",
    seo_description: "",
};

const statuses: PostStatus[] = [
    "draft",
    "published",
    "scheduled",
    "needs-review",
    "archived",
];

function dateInputValue(value: string) {
    if (!value) return "";
    return value.slice(0, 10);
}

function estimateReadTime(body: string) {
    const words = body.trim().split(/\s+/).filter(Boolean).length;

    if (!words) return "";

    return `${Math.max(1, Math.round(words / 220))} min read`;
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function PostEditor({ initialPost }: Props) {
    const router = useRouter();
    const isNew = !initialPost?.id;

    const [form, setForm] = useState<PostForm>(
        initialPost ?? blankPost,
    );
    const [preview, setPreview] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    function update<K extends keyof PostForm>(
        key: K,
        value: PostForm[K],
    ) {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    }

    function updateTags(value: string) {
        update(
            "tags",
            value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        );
    }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setMessage(null);

        const payload: PostInput = {
            ...form,
            slug: form.slug.trim() || slugify(form.title),
            read_time: form.read_time.trim() || estimateReadTime(form.body),
        };

        startTransition(async () => {
            try {
                const result = await savePost(payload);

                setMessage("Post saved successfully.");

                if (isNew) {
                    router.push(`/admin/posts/${result.id}`);
                }

                router.refresh();
            } catch (cause) {
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Could not save post.",
                );
            }
        });
    }

    function handleDelete() {
        if (!form.id) return;

        if (!window.confirm(`Delete "${form.title}"? This cannot be undone.`)) {
            return;
        }

        setError(null);
        setMessage(null);

        startTransition(async () => {
            try {
                await deletePost({ id: form.id! });
                router.push("/admin/posts");
                router.refresh();
            } catch (cause) {
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Could not delete post.",
                );
            }
        });
    }

    return (
        <form onSubmit={handleSave} className="max-w-5xl space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Link
                        href="/admin/posts"
                        className="text-sm text-muted-foreground underline underline-offset-4"
                    >
                        ← Posts
                    </Link>

                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {isNew ? "New post" : form.title || "Edit post"}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Create and manage your writing.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {!isNew && form.status === "published" && (
                        <Link
                            href={`/writing/${form.slug}`}
                            target="_blank"
                            className="text-sm underline underline-offset-4"
                        >
                            View on site ↗
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
                    >
                        {pending ? "Saving..." : "Save post"}
                    </button>
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="rounded-md border border-destructive/30 p-3 text-sm text-destructive"
                >
                    {error}
                </div>
            )}

            {message && (
                <p role="status" className="text-sm text-muted-foreground">
                    {message}
                </p>
            )}

            <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="post-title" className="text-sm font-medium">
                        Title
                    </label>
                    <input
                        id="post-title"
                        required
                        value={form.title}
                        onChange={(event) =>
                            update("title", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="post-slug" className="text-sm font-medium">
                        Slug
                    </label>
                    <input
                        id="post-slug"
                        value={form.slug}
                        placeholder={slugify(form.title) || "post-url"}
                        onChange={(event) =>
                            update("slug", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                        Leave blank to generate it from the title.
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="post-category" className="text-sm font-medium">
                        Category
                    </label>
                    <input
                        id="post-category"
                        value={form.category}
                        onChange={(event) =>
                            update("category", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="post-tags" className="text-sm font-medium">
                        Tags
                    </label>
                    <input
                        id="post-tags"
                        value={form.tags.join(", ")}
                        onChange={(event) => updateTags(event.target.value)}
                        placeholder="Next.js, Supabase, Engineering"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                        Separate tags with commas.
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="post-status" className="text-sm font-medium">
                        Status
                    </label>
                    <select
                        id="post-status"
                        value={form.status}
                        onChange={(event) =>
                            update("status", event.target.value as PostStatus)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="post-date" className="text-sm font-medium">
                        Publish date
                    </label>
                    <input
                        id="post-date"
                        type="date"
                        value={dateInputValue(form.published_at)}
                        onChange={(event) =>
                            update("published_at", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                        Keep the original date when migrating older posts.
                    </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="post-excerpt" className="text-sm font-medium">
                        Excerpt
                    </label>
                    <textarea
                        id="post-excerpt"
                        rows={3}
                        value={form.excerpt}
                        onChange={(event) =>
                            update("excerpt", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>

                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(event) =>
                            update("featured", event.target.checked)
                        }
                        className="size-4 accent-primary"
                    />
                    Featured post
                </label>
            </section>

            <section className="space-y-4 border-t pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="font-semibold">Article content</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Markdown supported: headings, bold, links, lists,
                            code blocks, tables and quotes.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setPreview((current) => !current)}
                        className="text-sm underline underline-offset-4"
                    >
                        {preview ? "Edit Markdown" : "Preview article"}
                    </button>
                </div>

                {preview ? (
                    <div className="prose-cw min-h-64 rounded-lg border p-5">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {form.body || "_Nothing written yet._"}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <textarea
                        aria-label="Article Markdown"
                        rows={24}
                        value={form.body}
                        onChange={(event) =>
                            update("body", event.target.value)
                        }
                        placeholder="Start writing your article in Markdown..."
                        className="w-full resize-y rounded-lg border bg-background p-4 font-mono text-sm leading-6 outline-none focus:border-foreground"
                    />
                )}

                <p className="text-xs text-muted-foreground">
                    Estimated reading time:{" "}
                    {form.read_time || estimateReadTime(form.body) || "Not set"}
                </p>
            </section>

            <section className="grid gap-4 border-t pt-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="seo-title" className="text-sm font-medium">
                        Search title
                    </label>
                    <input
                        id="seo-title"
                        value={form.seo_title}
                        onChange={(event) =>
                            update("seo_title", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="seo-description"
                        className="text-sm font-medium"
                    >
                        Search description
                    </label>
                    <textarea
                        id="seo-description"
                        rows={2}
                        value={form.seo_description}
                        onChange={(event) =>
                            update("seo_description", event.target.value)
                        }
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                    />
                </div>
            </section>

            {!isNew && (
                <section className="border-t pt-6">
                    <button
                        type="button"
                        disabled={pending}
                        onClick={handleDelete}
                        className="text-sm text-destructive underline underline-offset-4 disabled:opacity-50"
                    >
                        Delete post
                    </button>
                </section>
            )}
        </form>
    );
}
