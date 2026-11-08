
import Link from "next/link";
import { createClient } from "@/integrations/supabase/server";

type ActivityItem = {
    id: string;
    title: string;
    type: "Project" | "Post";
    status: string;
    updatedAt: string | null;
    href: string;
};

function formatDate(value: string | null) {
    if (!value) return "Not updated";

    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    const [
        { data: projects, error: projectsError },
        { data: posts, error: postsError },
    ] = await Promise.all([
        supabase
            .from("projects")
            .select("slug,title,kind,state,verification,updated_at")
             .order("updated_at", { ascending: false }),

        supabase
            .from("posts")
            .select("id,title,status,body,updated_at")
            .order("updated_at", { ascending: false }),
    ]);

    if (projectsError) {
        throw new Error(`Could not load projects: ${projectsError.message}`);
    }

    if (postsError) {
        throw new Error(`Could not load posts: ${postsError.message}`);
    }

    const projectRows = projects ?? [];
    const postRows = posts ?? [];

    const publishedProjects = projectRows.filter(
        (project) => project.state === "published",
    ).length;

    const draftProjects = projectRows.filter(
        (project) => project.state === "draft",
    ).length;

    const projectsNeedingReview = projectRows.filter(
        (project) => project.verification === "needs-review",
    );

    const publishedPosts = postRows.filter(
        (post) => post.status === "published",
    ).length;

    const postsWithoutBody = postRows.filter(
        (post) => !post.body?.trim(),
    );

    const activity: ActivityItem[] = [
        ...projectRows.map((project) => ({
            id: project.slug,
            href: `/admin/projects/${project.slug}`,
            title: project.title,
            type: "Project" as const,
            status: `${project.state} · ${project.verification}`,
            updatedAt: project.updated_at,
        })),

        ...postRows.map((post) => ({
            id: post.id,
            title: post.title,
            type: "Post" as const,
            status: post.status,
            updatedAt: post.updated_at,
            href: `/admin/posts/${post.id}`,
        })),
    ]
        .sort((a, b) => {
            const aTime = a.updatedAt
                ? new Date(a.updatedAt).getTime()
                : 0;

            const bTime = b.updatedAt
                ? new Date(b.updatedAt).getTime()
                : 0;

            return bTime - aTime;
        })
        .slice(0, 6);

    const stats = [
        {
            label: "Published projects",
            value: publishedProjects,
        },
        {
            label: "Draft projects",
            value: draftProjects,
        },
        {
            label: "Needs review",
            value: projectsNeedingReview.length,
        },
        {
            label: "Published posts",
            value: publishedPosts,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Overview
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your portfolio content and review its status.
                </p>
            </div>

            <section
                aria-label="Content statistics"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-lg border p-5">
                        <p className="text-sm text-muted-foreground">
                            {stat.label}
                        </p>
                        <p className="mt-2 text-3xl font-semibold tabular-nums">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border p-5">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="font-semibold">Content health</h2>
                    </div>

                    <div className="mt-4 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium">
                                    Projects needing review
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    These projects have not been verified.
                                </p>
                            </div>
                            <span className="text-sm font-semibold tabular-nums">
                                {projectsNeedingReview.length}
                            </span>
                        </div>

                        {projectsNeedingReview.length > 0 && (
                            <ul className="space-y-2 border-l-2 pl-3">
                                {projectsNeedingReview.slice(0, 5).map((project) => (
                                    <li key={project.slug}>
                                        <Link href={`/admin/projects/${project.slug}`}
                                            className="text-sm hover:underline"
                                        >
                                            {project.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="border-t pt-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Posts without body content
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        These posts cannot display complete content.
                                    </p>
                                </div>
                                <span className="text-sm font-semibold tabular-nums">
                                    {postsWithoutBody.length}
                                </span>
                            </div>

                            {postsWithoutBody.length > 0 && (
                                <ul className="mt-3 space-y-2 border-l-2 pl-3">
                                    {postsWithoutBody.slice(0, 5).map((post) => (
                                        <li key={post.id}>
                                            <Link
                                                href={`/admin/posts/${post.id}`}
                                                className="text-sm hover:underline"
                                            >
                                                {post.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border p-5">
                    <h2 className="font-semibold">Quick links</h2>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/admin/projects"
                            className="rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                            <p className="font-medium">Manage projects</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Create and edit portfolio projects.
                            </p>
                        </Link>

                        <Link
                            href="/admin/posts"
                            className="rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                            <p className="font-medium">Manage posts</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Write and publish articles.
                            </p>
                        </Link>

                        <Link
                            href="/admin/messages"
                            className="rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                            <p className="font-medium">Inbox</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review contact enquiries.
                            </p>
                        </Link>

                        <Link
                            href="/admin/settings"
                            className="rounded-md border p-4 transition-colors hover:bg-muted"
                        >
                            <p className="font-medium">Site settings</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Update homepage and SEO content.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-5">
                    <div>
                        <h2 className="font-semibold">Recent activity</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your six most recently updated content items.
                        </p>
                    </div>
                </div>

                {activity.length === 0 ? (
                    <p className="p-5 text-sm text-muted-foreground">
                        No content has been created yet.
                    </p>
                ) : (
                    <div className="divide-y">
                        {activity.map((item, index) => (
                            <Link
                                key={`${item.type}-${item.id}`}
                                href={item.href}
                                className="flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:bg-muted/50"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="text-sm tabular-nums text-muted-foreground">
                                        {index + 1}.
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {item.type} · {item.status}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs text-muted-foreground">
                                    {formatDate(item.updatedAt)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
