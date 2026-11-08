import type { Metadata } from "next";

import { Page } from "@/components/page-layout";
import { listProjects } from "@/lib/content.functions";
import { toBuild, toCaseStudy } from "@/lib/content";
import ProjectsBrowser from "./projects-browser";

export const metadata: Metadata = {
    title: "Work — Charles Wachira",
    description:
        "Professional case studies in CRM architecture and business systems, plus engineering work built in public on GitHub.",
    openGraph: {
        title: "Work — Charles Wachira",
        description:
            "Professional case studies in CRM architecture and business systems, plus engineering work built in public on GitHub.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default async function ProjectsPage() {
    const rows = await listProjects();

    const cases = rows
        .filter((row) => row.kind === "case-study")
        .map(toCaseStudy);

    const builds = rows
        .filter((row) => row.kind === "engineering")
        .map(toBuild);

    return (
        <Page>
            <section className="border-b border-border">
                <div className="shell grid12 py-12 md:py-16">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <p className="label">01 / Work</p>
                        <h1 className="fluid-display mt-4 font-bold">
                            Work
                        </h1>
                    </div>

                    <p className="col-span-2 mt-4 text-sm leading-relaxed text-muted-foreground md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        Two kinds of work, kept apart on purpose: systems I
                        delivered professionally, and projects I&apos;m
                        building in public. Each is labelled for what it is.
                    </p>
                </div>
            </section>

            <ProjectsBrowser cases={cases} builds={builds} />
        </Page>
    );
}