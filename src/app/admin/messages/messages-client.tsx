"use client";

import { useMemo, useState, useTransition } from "react";
import {
    deleteMessage,
    setMessageStatus,
} from "@/lib/contact-admin.actions";

type MessageStatus = "new" | "read" | "replied" | "archived";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    company?: string | null;
    project_type?: string | null;
    timeline?: string | null;
    budget?: string | null;
    status: MessageStatus;
    read?: boolean;
    created_at: string;
};

type Props = {
    messages: ContactMessage[];
};

const filters: Array<"all" | MessageStatus> = [
    "all",
    "new",
    "read",
    "replied",
    "archived",
];

const statuses: MessageStatus[] = [
    "new",
    "read",
    "replied",
    "archived",
];

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function getStatusClass(status: MessageStatus) {
    switch (status) {
        case "new":
            return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
        case "read":
            return "bg-muted text-muted-foreground";
        case "replied":
            return "bg-green-500/10 text-green-700 dark:text-green-300";
        case "archived":
            return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
    }
}

export default function MessagesClient({ messages }: Props) {
    const [selectedFilter, setSelectedFilter] = useState<
        "all" | MessageStatus
    >("all");

    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [items, setItems] = useState(messages);

    const counts = useMemo(
        () => ({
            all: items.length,
            new: items.filter((item) => item.status === "new").length,
            read: items.filter((item) => item.status === "read").length,
            replied: items.filter((item) => item.status === "replied").length,
            archived: items.filter((item) => item.status === "archived").length,
        }),
        [items],
    );

    const visibleMessages = useMemo(
        () =>
            selectedFilter === "all"
                ? items
                : items.filter((item) => item.status === selectedFilter),
        [items, selectedFilter],
    );

    function updateStatus(id: string, status: MessageStatus) {
        setError(null);
        setSuccess(null);

        startTransition(async () => {
            try {
                await setMessageStatus({ id, status });

                setItems((current) =>
                    current.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                status,
                                read: status !== "new",
                            }
                            : item,
                    ),
                );

                setSuccess("Message status updated.");
            } catch (cause) {
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Could not update message.",
                );
            }
        });
    }

    function toggleMessage(id: string) {
        const isExpanded = expandedId === id;

        setExpandedId(isExpanded ? null : id);

        if (!isExpanded) {
            const message = items.find((item) => item.id === id);

            if (message?.status === "new") {
                updateStatus(id, "read");
            }
        }
    }

    function removeMessage(id: string) {
        if (!window.confirm("Permanently delete this message?")) {
            return;
        }

        setError(null);
        setSuccess(null);

        startTransition(async () => {
            try {
                await deleteMessage({ id });

                setItems((current) =>
                    current.filter((item) => item.id !== id),
                );

                setExpandedId(null);
                setSuccess("Message deleted.");
            } catch (cause) {
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Could not delete message.",
                );
            }
        });
    }

    function replyToMessage(message: ContactMessage) {
        const subject = encodeURIComponent(
            "Re: Your enquiry to Charles Wachira",
        );

        const body = encodeURIComponent(
            `Hi ${message.name},\n\n\n\nRegards,\nCharles`,
        );

        window.location.href =
            `mailto:${message.email}?subject=${subject}&body=${body}`;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Messages
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Contact enquiries submitted through your website.
                </p>
            </div>

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => setSelectedFilter(filter)}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                            selectedFilter === filter
                                ? "border-foreground"
                                : "hover:bg-muted"
                        }`}
                    >
                        <p className="text-xs capitalize text-muted-foreground">
                            {filter === "all" ? "All messages" : filter}
                        </p>

                        <p className="mt-1 text-2xl font-semibold tabular-nums">
                            {counts[filter]}
                        </p>
                    </button>
                ))}
            </section>

            {error && (
                <div
                    role="alert"
                    className="rounded-md border border-destructive/30 p-3 text-sm text-destructive"
                >
                    {error}
                </div>
            )}

            {success && (
                <p role="status" className="text-sm text-muted-foreground">
                    {success}
                </p>
            )}

            <section className="overflow-hidden rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
                    <div>
                        <h2 className="font-semibold">
                            {selectedFilter === "all"
                                ? "All enquiries"
                                : `${selectedFilter} enquiries`}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {visibleMessages.length} message
                            {visibleMessages.length === 1 ? "" : "s"}
                        </p>
                    </div>
                </div>

                {visibleMessages.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="font-medium">No messages found</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Messages matching this filter will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {visibleMessages.map((message) => {
                            const expanded = expandedId === message.id;

                            return (
                                <article
                                    key={message.id}
                                    className="p-4 sm:p-5"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleMessage(message.id)
                                            }
                                            className="min-w-0 flex-1 text-left"
                                        >
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-medium">
                                                    {message.name}
                                                </span>

                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusClass(message.status)}`}
                                                >
                                                    {message.status}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {message.email}
                                            </p>

                                            <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-sm">
                                                {message.message}
                                            </p>
                                        </button>

                                        <div className="shrink-0 text-right">
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(message.created_at)}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleMessage(message.id)
                                                }
                                                className="mt-2 text-xs underline underline-offset-4"
                                            >
                                                {expanded ? "Collapse" : "View"}
                                            </button>
                                        </div>
                                    </div>

                                    {expanded && (
                                        <div className="mt-5 space-y-4 border-t pt-4">
                                            <div>
                                                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                    Message
                                                </h3>

                                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                                                    {message.message}
                                                </p>
                                            </div>

                                            {(message.company ||
                                                message.project_type ||
                                                message.timeline ||
                                                message.budget) && (
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {[
                                                        [
                                                            "Company",
                                                            message.company,
                                                        ],
                                                        [
                                                            "Project type",
                                                            message.project_type,
                                                        ],
                                                        [
                                                            "Timeline",
                                                            message.timeline,
                                                        ],
                                                        [
                                                            "Budget",
                                                            message.budget,
                                                        ],
                                                    ]
                                                        .filter(
                                                            (entry) => entry[1],
                                                        )
                                                        .map(([label, value]) => (
                                                            <div key={label}>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {label}
                                                                </p>

                                                                <p className="mt-1 text-sm">
                                                                    {value}
                                                                </p>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    disabled={pending}
                                                    onClick={() =>
                                                        replyToMessage(message)
                                                    }
                                                    className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
                                                >
                                                    Reply by email
                                                </button>

                                                <select
                                                    aria-label={`Status for ${message.name}`}
                                                    value={message.status}
                                                    disabled={pending}
                                                    onChange={(event) =>
                                                        updateStatus(
                                                            message.id,
                                                            event.target
                                                                .value as MessageStatus,
                                                        )
                                                    }
                                                    className="rounded-md border bg-background px-3 py-2 text-sm"
                                                >
                                                    {statuses.map((status) => (
                                                        <option
                                                            key={status}
                                                            value={status}
                                                        >
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>

                                                {message.status !== "archived" && (
                                                    <button
                                                        type="button"
                                                        disabled={pending}
                                                        onClick={() =>
                                                            updateStatus(
                                                                message.id,
                                                                "archived",
                                                            )
                                                        }
                                                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
                                                    >
                                                        Archive
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    disabled={pending}
                                                    onClick={() =>
                                                        removeMessage(message.id)
                                                    }
                                                    className="rounded-md border border-destructive/30 px-3 py-2 text-sm text-destructive disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}