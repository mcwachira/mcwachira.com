import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/integrations/supabase/server";
import { signOutAdmin } from "./actions";

const navigation = [
    { label: "Overview", href: "/admin" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Posts", href: "/admin/posts" },
    { label: "Messages", href: "/admin/messages" },
    { label: "Settings", href: "/admin/settings" },
];

async function AdminContent({
                                children,
                            }: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/auth");
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc(
        "has_role",
        {
            _user_id: user.id,
            _role: "admin",
        },
    );

    if (roleError) {
        throw new Error(
            `Could not verify administrator access: ${roleError.message}`,
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <Link
                            href="/admin"
                            className="text-lg font-semibold tracking-tight"
                        >
                            Admin
                        </Link>

                        <p className="text-sm text-muted-foreground">
                            Content management
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                            {user.email}
                        </span>

                        <form action={signOutAdmin}>
                            <button
                                type="submit"
                                className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-6">
                <nav
                    aria-label="Admin navigation"
                    className="mb-8 flex flex-wrap gap-2 border-b pb-4"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {!isAdmin ? (
                    <div className="rounded-lg border p-8">
                        <h1 className="text-lg font-semibold">No access</h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            This account cannot manage content.
                        </p>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}

function AdminFallback() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <p className="text-sm text-muted-foreground">
                    Loading administration...
                </p>
            </div>
        </div>
    );
}

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<AdminFallback />}>
            <AdminContent>{children}</AdminContent>
        </Suspense>
    );
}