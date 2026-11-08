
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Project = {
    slug: string;
    title: string;
    kind: string;
    state: string;
    verification: string;
    featured: boolean;
    featured_order: number | null;
    current_build: boolean;
};

export default function ProjectsClient({
                                           projects,
                                       }: {
    projects: Project[];
}) {
    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return projects;

        return projects.filter((project) =>
            [
                project.title,
                project.slug,
                project.kind,
                project.state,
                project.verification,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query)),
        );
    }, [projects, search]);

    return (
        <section className="overflow-hidden rounded-lg border">
            <div className="border-b p-4">
                <label htmlFor="project-search" className="sr-only">
                    Search projects
                </label>
                <input
                    id="project-search"
                    type="search"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground sm:max-w-sm"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                    Showing {filteredProjects.length} of {projects.length} projects
                </p>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="p-10 text-center">
                    <p className="font-medium">No projects found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Try another search or create a new project.
                    </p>
                </div>
            ) : (
                <div className="divide-y">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/admin/projects/${project.slug}`}
                            className="flex flex-wrap items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50 sm:p-5"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="font-medium">
                                        {project.title}
                                    </h2>

                                    {project.featured && (
                                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                            Featured
                                        </span>
                                    )}

                                    {project.current_build && (
                                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                                            Current build
                                        </span>
                                    )}
                                </div>

                                <p className="mt-1 truncate text-sm text-muted-foreground">
                                    /{project.slug}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    <span className="capitalize">
                                        {project.kind}
                                    </span>
                                    <span>·</span>
                                    <span className="capitalize">
                                        {project.state}
                                    </span>
                                    <span>·</span>
                                    <span>
                                        {project.verification}
                                    </span>
                                    {project.featured && (
                                        <>
                                            <span>·</span>
                                            <span>
                                                Featured order: {project.featured_order ?? 0}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <span className="text-sm text-muted-foreground">
                                Edit →
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
