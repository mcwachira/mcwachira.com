"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visuals";
import {
    projectFilters,
    type Project,
    type EngineeringProject,
} from "@/data/site";

type Item = {
    slug: string;
    no: string;
    title: string;
    category: string;
    summary: string;
    label: string;
    technologies: string[];
    categories: string[];
    featured: boolean;
    flow: string[];
    github?: string;
    live?: string;
};

function toCaseItems(projects: Project[]): Item[] {
    return projects.map((project) => ({
        slug: project.slug,
        no: project.no,
        title: project.title,
        category: project.category,
        summary: project.summary,
        label: "Professional case study",
        technologies: project.technologies,
        categories: [
            "CRM / Automation",
            "Client Work",
            ...(project.technologies.some((technology) =>
                /Next|React|Node/.test(technology),
            )
                ? ["Full-Stack"]
                : ["Business Systems"]),
        ],
        featured: project.featured,
        flow: project.flow,
    }));
}

function toBuildItems(builds: EngineeringProject[]): Item[] {
    return builds.map((project) => ({
        slug: project.slug,
        no: project.no,
        title: project.title,
        category: project.category,
        summary: project.summary,
        label: `${project.provenance} · ${project.statusLabel}`,
        technologies: project.technologies,
        categories: project.categories,
        featured: project.featured,
        flow: project.flow,
        github: project.github,
        live: project.live,
    }));
}

function matches(item: Item, filter: string, query: string) {
    const matchesFilter =
        filter === "All" ||
        (filter === "Featured"
            ? item.featured
            : item.categories.includes(filter));

    if (!matchesFilter) {
        return false;
    }

    if (!query.trim()) {
        return true;
    }

    const searchableText = [
        item.title,
        item.category,
        item.summary,
        ...item.technologies,
    ]
        .join(" ")
        .toLowerCase();

    return searchableText.includes(query.trim().toLowerCase());
}

type ProjectsBrowserProps = {
    cases: Project[];
    builds: EngineeringProject[];
};

export default function ProjectsBrowser({
                                            cases: caseProjects,
                                            builds: engineeringProjects,
                                        }: ProjectsBrowserProps) {
    const [filter, setFilter] = useState("All");
    const [query, setQuery] = useState("");

    const caseItems = useMemo(
        () => toCaseItems(caseProjects),
        [caseProjects],
    );

    const buildItems = useMemo(
        () => toBuildItems(engineeringProjects),
        [engineeringProjects],
    );

    const cases = useMemo(
        () => caseItems.filter((item) => matches(item, filter, query)),
        [caseItems, filter, query],
    );

    const builds = useMemo(
        () => buildItems.filter((item) => matches(item, filter, query)),
        [buildItems, filter, query],
    );

    const clearFilters = () => {
        setFilter("All");
        setQuery("");
    };

    return (
        <>
            <section className="sticky top-14 z-20 border-b border-border bg-background">
                <div className="shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
                    <div
                        role="group"
                        aria-label="Filter projects"
                        className="flex flex-wrap gap-1.5"
                    >
                        {projectFilters.map((item) => (
                            <button
                                key={item}
                                type="button"
                                aria-pressed={filter === item}
                                onClick={() => setFilter(item)}
                                className={`edge px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                                    filter === item
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-surface"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <label className="flex items-center gap-2">
                        <span className="label">Search</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) =>
                                setQuery(event.target.value)
                            }
                            placeholder="Project or technology"
                            className="edge w-full bg-background px-3 py-1.5 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-64"
                        />
                    </label>
                </div>
            </section>

            <Group
                no="02"
                heading="Professional case studies"
                note="From my CV — business context and outcomes are real engagements."
                items={cases}
            />

            <Group
                no="03"
                heading="Built in public"
                note="GitHub repositories. Status is stated plainly; nothing is called production unless it is."
                items={builds}
            />

            {cases.length + builds.length === 0 && (
                <p className="shell py-16 text-muted-foreground">
                    Nothing matches that filter.{" "}
                    <button
                        type="button"
                        className="border-b border-accent text-foreground"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                </p>
            )}
        </>
    );
}

function Group({
                   no,
                   heading,
                   note,
                   items,
               }: {
    no: string;
    heading: string;
    note: string;
    items: Item[];
}) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="shell border-b border-border py-12 md:py-16">
            <div className="grid12 mb-8">
                <div className="col-span-2 md:col-span-4 lg:col-span-8">
                    <p className="label">
                        {no} / {items.length}{" "}
                        {items.length === 1 ? "entry" : "entries"}
                    </p>
                    <h2 className="fluid-section mt-2 font-bold">
                        {heading}
                    </h2>
                </div>

                <p className="col-span-2 text-sm text-muted-foreground md:col-span-2 lg:col-span-4 lg:self-end">
                    {note}
                </p>
            </div>

            <div className="grid12 gap-y-12">
                {items.map((project) => (
                    <article
                        key={project.slug}
                        className="group col-span-2 md:col-span-3 lg:col-span-6"
                    >
                        <Link
                            href={`/work/${project.slug}`}
                            className="block"
                        >
                            <div className="transition-transform duration-300 group-hover:-translate-y-1">
                                <ProjectVisual
                                    flow={project.flow}
                                    no={project.no}
                                />
                            </div>

                            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
                                <span className="label">
                                    {project.category}
                                </span>
                                <span className="label text-foreground">
                                    {project.label}
                                </span>
                            </div>

                            <h3 className="mt-2 font-display text-2xl font-bold">
                                {project.title}
                            </h3>

                            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                                {project.summary}
                            </p>

                            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                                {project.technologies.slice(0, 5).join(" · ")}
                            </p>
                        </Link>

                        <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.14em]">
                            <Link
                                href={`/work/${project.slug}`}
                                className="border-b border-accent pb-0.5"
                            >
                                Details →
                            </Link>

                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border-b border-border pb-0.5 hover:border-foreground"
                                >
                                    Repository ↗
                                </a>
                            )}

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border-b border-border pb-0.5 hover:border-foreground"
                                >
                                    Live demo ↗
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}