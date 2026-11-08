import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Page } from "@/components/page-layout";
import {
    FlowDiagram,
    ProjectVisual,
} from "@/components/project-visuals";
import {
    type Project,
    type EngineeringProject,
} from "@/data/site";
import { listProjects } from "@/lib/content.functions";
import { toBuild, toCaseStudy } from "@/lib/content";

type ProjectEntry =
    | { kind: "case-study"; data: Project }
    | { kind: "engineering"; data: EngineeringProject };


export async function generateStaticParams() {
    const rows = await listProjects();

    return rows.length > 0
        ? rows.map((row) => ({ slug: row.slug }))
        : [{ slug: "__no-published-projects__" }];
}
async function findProject(slug: string): Promise<ProjectEntry | null> {
    const rows = await listProjects();

    const caseStudy = rows
        .filter((row) => row.kind === "case-study")
        .map(toCaseStudy)
        .find((project) => project.slug === slug);

    if (caseStudy) {
        return {
            kind: "case-study",
            data: caseStudy,
        };
    }

    const engineeringProject = rows
        .filter((row) => row.kind === "engineering")
        .map(toBuild)
        .find((project) => project.slug === slug);

    if (engineeringProject) {
        return {
            kind: "engineering",
            data: engineeringProject,
        };
    }

    return null;
}

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const entry = await findProject(slug);

    if (!entry) {
        return {
            title: "Project unavailable — Charles Wachira",
        };
    }

    const project = entry.data;
    const kind =
        entry.kind === "case-study" ? "Case Study" : "Project";
    const title = `${project.title} — ${kind} | Charles Wachira`;

    return {
        title,
        description: project.summary,
        openGraph: {
            title,
            description: project.summary,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const entry = await findProject(slug);

    if (!entry) {
        notFound();
    }

    if (entry.kind === "case-study") {
        return <CaseStudyPage project={entry.data} />;
    }

    return <BuildPage project={entry.data} />;
}

function Chapter({
                     no,
                     title,
                     children,
                 }: {
    no: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="grid12 border-t border-rule py-8">
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
                <p className="label">
                    {no} — {title}
                </p>
            </div>

            <div className="col-span-2 md:col-span-4 lg:col-span-8">
                {children}
            </div>
        </section>
    );
}

function CaseStudyPage({ project }: { project: Project }) {
    const related = [
        // Related case studies are populated below from the other
        // published case studies when the page data is available.
    ];

    return (
        <Page>
            <section className="border-b border-border">
                <div className="shell grid12 py-10 md:py-14">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <Link
                            href="/projects"
                            className="label border-b border-accent pb-0.5 text-foreground"
                        >
                            ← All work
                        </Link>

                        <p className="label mt-6">
                            {project.no} / {project.category}
                        </p>

                        <h1 className="fluid-display mt-3 font-bold">
                            {project.title}
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            {project.summary}
                        </p>
                    </div>

                    <dl className="col-span-2 mt-8 divide-y divide-rule border-y border-rule md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        {[
                            ["Client", project.client],
                            ["Year", project.year],
                            ["Type", project.type],
                            ["Role", project.role],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-baseline justify-between gap-4 py-3"
                            >
                                <dt className="label">{label}</dt>
                                <dd className="text-right font-mono text-sm">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <div className="shell py-10 md:py-14">
                <div className="grid12 pb-6">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <ProjectVisual
                            flow={project.flow}
                            no={project.no}
                        />
                    </div>

                    <div className="col-span-2 md:col-span-6 lg:col-span-4 lg:self-end">
                        <p className="label">System flow</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            A schematic of how state moves through the
                            system, drawn from the implementation rather
                            than used as a decorative diagram.
                        </p>
                    </div>
                </div>

                <Chapter no="01" title="Overview">
                    <p className="max-w-prose text-lg leading-relaxed">
                        {project.summary}
                    </p>
                </Chapter>

                <Chapter no="02" title="The Problem">
                    <p className="max-w-prose leading-relaxed text-muted-foreground">
                        {project.problem}
                    </p>
                </Chapter>

                <Chapter no="03" title="My Role">
                    <p className="font-display text-2xl font-bold">
                        {project.role}
                    </p>
                </Chapter>

                <Chapter no="04" title="Approach">
                    <ol className="max-w-prose space-y-3">
                        {project.approach.map((step, index) => (
                            <li
                                key={`${index}-${step}`}
                                className="grid grid-cols-[2rem_1fr] gap-3"
                            >
                                <span className="label pt-1">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="leading-relaxed text-muted-foreground">
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ol>
                </Chapter>

                <Chapter no="05" title="Technologies">
                    <ul className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                            <li
                                key={technology}
                                className="edge px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em]"
                            >
                                {technology}
                            </li>
                        ))}
                    </ul>
                </Chapter>

                <Chapter no="06" title="Key Decisions">
                    <ul className="max-w-prose space-y-4">
                        {project.decisions.map((decision) => (
                            <li
                                key={decision}
                                className="border-l-2 border-accent pl-4 leading-relaxed"
                            >
                                {decision}
                            </li>
                        ))}
                    </ul>
                </Chapter>

                <Chapter no="07" title="Outcome">
                    <ul className="space-y-3">
                        {project.outcomes.map((outcome) => (
                            <li
                                key={outcome}
                                className="font-display text-xl font-bold leading-snug md:text-2xl"
                            >
                                {outcome}
                            </li>
                        ))}
                    </ul>
                </Chapter>

                <Chapter no="08" title="Data Flow">
                    <FlowDiagram
                        steps={project.flow.map((step) => ({
                            label: step,
                        }))}
                    />
                </Chapter>
            </div>

            {related.length > 0 && (
                <section className="border-t border-border bg-surface py-12">
                    <div className="shell">
                        <p className="label">09 — Related work</p>
                    </div>
                </section>
            )}
        </Page>
    );
}

function BuildPage({
                       project,
                   }: {
    project: EngineeringProject;
}) {
    let chapterNumber = 0;

    const nextChapter = () =>
        String(++chapterNumber).padStart(2, "0");

    return (
        <Page>
            <section className="border-b border-border">
                <div className="shell grid12 py-10 md:py-14">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <Link
                            href="/projects"
                            className="label border-b border-accent pb-0.5 text-foreground"
                        >
                            ← All work
                        </Link>

                        <p className="label mt-6">
                            {project.no} / {project.category}
                        </p>

                        <h1 className="fluid-display mt-3 font-bold">
                            {project.title}
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            {project.summary}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="press edge bg-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-background"
                                >
                                    Repository ↗
                                </a>
                            )}

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="press edge px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em]"
                                >
                                    Live demo ↗
                                </a>
                            )}
                        </div>
                    </div>

                    <dl className="col-span-2 mt-8 divide-y divide-rule border-y border-rule md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        {[
                            ["Type", project.provenance],
                            ["Status", project.statusLabel],
                            ["Category", project.categories.join(", ")],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-baseline justify-between gap-4 py-3"
                            >
                                <dt className="label">{label}</dt>
                                <dd className="text-right font-mono text-sm">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <div className="shell py-10 md:py-14">
                {project.flow.length > 0 && (
                    <div className="grid12 pb-6">
                        <div className="col-span-2 md:col-span-6 lg:col-span-8">
                            <ProjectVisual
                                flow={project.flow}
                                no={project.no}
                            />
                        </div>

                        <p className="col-span-2 text-sm leading-relaxed text-muted-foreground md:col-span-6 lg:col-span-4 lg:self-end">
                            Schematic of the stack as documented in the
                            repository.
                        </p>
                    </div>
                )}

                <Chapter no={nextChapter()} title="Overview">
                    <p className="max-w-prose text-lg leading-relaxed">
                        {project.detail ?? project.summary}
                    </p>
                </Chapter>

                {project.features && (
                    <Chapter
                        no={nextChapter()}
                        title="Documented features"
                    >
                        <ul className="grid max-w-3xl gap-x-6 gap-y-2 md:grid-cols-2">
                            {project.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="border-l-2 border-accent pl-3 text-muted-foreground"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </Chapter>
                )}

                <Chapter no={nextChapter()} title="Technologies">
                    <ul className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                            <li
                                key={technology}
                                className="edge px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em]"
                            >
                                {technology}
                            </li>
                        ))}
                    </ul>
                </Chapter>

                <Chapter no={nextChapter()} title="Source">
                    <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                        Everything on this page comes from the public
                        repository. Where the repository does not document
                        something, this page does not claim it.
                    </p>
                </Chapter>
            </div>
        </Page>
    );
}