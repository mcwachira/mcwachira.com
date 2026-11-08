
import type { Metadata } from "next";
import Link from "next/link";

import { Page, Band, SectionHead } from "@/components/page-layout";
import {
    profile,
    engagements,
    industries,
    principles,
    type SkillLevel,
} from "@/data/site";
import {
    listExperiences,
    listSkills,
} from "@/lib/content.functions";

export const metadata: Metadata = {
    title: "About — Charles Wachira, Senior Software Engineer",
    description:
        "Seven years of software engineering across full-stack development, CRM architecture, automation and integrations, based in Diani, Kenya.",
    openGraph: {
        title: "About — Charles Wachira, Senior Software Engineer",
        description:
            "Seven years of software engineering across full-stack development, CRM architecture, automation and integrations.",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
    },
};

const levelDot: Record<SkillLevel, string> = {
    primary: "bg-accent border border-foreground",
    strong: "bg-foreground",
    working: "bg-muted-foreground",
    "project-demonstrated": "border border-foreground",
    familiar: "border border-dashed border-muted-foreground",
};

export default async function AboutPage() {
    const [experienceRows, skillRows] = await Promise.all([
        listExperiences(),
        listSkills(),
    ]);

    // Group the flat Supabase skills records by category.
    const skillGroups = skillRows.reduce<
        Record<string, typeof skillRows>
    >((groups, skill) => {
        const category = skill.category;

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(skill);

        return groups;
    }, {});

    const skills = Object.entries(skillGroups).map(
        ([group, items]) => ({
            group,
            items,
        }),
    );

    return (
        <Page>
            {/* Introduction */}
            <section className="border-b border-border">
                <div className="shell grid12 py-12 md:py-16">
                    <div className="col-span-2 md:col-span-6 lg:col-span-8">
                        <p className="label">01 / About</p>

                        <h1 className="fluid-display mt-4 font-bold">
                            Engineer.
                            <br />
                            Systems first.
                        </h1>
                    </div>

                    <ul className="col-span-2 mt-6 divide-y divide-rule border-y border-rule md:col-span-6 lg:col-span-4 lg:mt-0 lg:self-end">
                        {[
                            profile.location,
                            "Software Engineer",
                            "Technical Lead",
                            "Full-stack builder",
                            "Systems thinker",
                        ].map((item) => (
                            <li
                                key={item}
                                className="py-2.5 font-mono text-sm"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Profile */}
            <Band>
                <div className="grid12">
                    <div className="col-span-2 space-y-5 md:col-span-6 lg:col-span-7">
                        <p className="text-xl leading-relaxed">
                            I design and build software systems that turn
                            complex business workflows into reliable digital
                            products.
                        </p>

                        <p className="leading-relaxed text-muted-foreground">
                            Over {profile.years} years I have worked across
                            hospitality, NGOs, e-commerce, CRM, real estate,
                            construction and general business operations.
                            These experiences have taught me that the
                            interesting problem is rarely the interface. It
                            is the workflow underneath it: who approves what,
                            which system holds the truth, and what happens
                            when two of them disagree.
                        </p>

                        <p className="leading-relaxed text-muted-foreground">
                            My current work focuses on CRM architecture,
                            automation, API integrations, custom business
                            applications and technical leadership. As
                            technical lead at Finlanza I take projects from
                            requirements through architecture, implementation,
                            QA and deployment, and then through client handover
                            and technical training. A system nobody can
                            operate is not delivered.
                        </p>

                        <p className="leading-relaxed text-muted-foreground">
                            I work from {profile.location}, mostly with
                            businesses across East Africa.
                        </p>
                    </div>

                    <div className="col-span-2 md:col-span-6 lg:col-span-4 lg:col-start-9">
                        <p className="label">Industries</p>

                        <ul className="mt-3 divide-y divide-rule border-y border-rule">
                            {industries.map((industry) => (
                                <li
                                    key={industry}
                                    className="py-2 font-mono text-sm"
                                >
                                    {industry}
                                </li>
                            ))}
                        </ul>

                        <p className="label mt-6">Specialisms</p>

                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {profile.specialisms.map((specialism) => (
                                <li
                                    key={specialism}
                                    className="edge px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
                                >
                                    {specialism}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Band>

            {/* Experience */}
            <Band className="bg-surface">
                <SectionHead
                    no="02"
                    title="Experience"
                    meta={["2018 — Present"]}
                />

                <ol className="border-t border-border">
                    {experienceRows.map((item) => (
                        <li
                            key={item.id}
                            className="grid12 border-b border-rule py-6"
                        >
                            <div className="col-span-2 md:col-span-2 lg:col-span-3">
                                <p className="label">
                                    {item.start_label} — {item.end_label}
                                </p>

                                <p className="label mt-1">
                                    {item.kind}
                                </p>
                            </div>

                            <div className="col-span-2 md:col-span-4 lg:col-span-6">
                                <h3 className="font-display text-xl font-bold md:text-2xl">
                                    {item.role}
                                </h3>

                                <p className="mt-1 font-mono text-sm">
                                    {item.company}
                                </p>

                                <p className="mt-1 font-mono text-xs text-muted-foreground">
                                    {item.location}
                                </p>

                                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>

                            <ul className="col-span-2 space-y-1.5 md:col-span-6 lg:col-span-3">
                                {(Array.isArray(item.achievements)
                                        ? item.achievements
                                        : []
                                ).map((achievement) => (
                                    <li
                                        key={achievement}
                                        className="text-sm leading-snug text-muted-foreground"
                                    >
                                        <span className="mr-2 text-accent">
                                            &#9633;
                                        </span>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>

                <p className="label mt-8">Project engagements</p>

                <ul className="mt-3 divide-y divide-rule border-y border-rule">
                    {engagements.map((engagement) => (
                        <li
                            key={engagement.client}
                            className="grid12 py-3"
                        >
                            <span className="col-span-1 font-mono text-sm md:col-span-2 lg:col-span-3">
                                {engagement.year}
                            </span>

                            <span className="col-span-1 font-display text-sm font-bold md:col-span-2 lg:col-span-4">
                                {engagement.client}
                            </span>

                            <span className="col-span-2 text-sm text-muted-foreground md:col-span-2 lg:col-span-5">
                                {engagement.work}
                            </span>
                        </li>
                    ))}
                </ul>
            </Band>

            {/* Principles */}
            <Band>
                <SectionHead
                    no="03"
                    title="How I Think"
                    lead="Principles that decide the trade-offs in the systems I build."
                />

                <ul className="grid12">
                    {principles.map((principle) => (
                        <li
                            key={principle.no}
                            className="col-span-2 border-t border-border pt-4 md:col-span-3 lg:col-span-4"
                        >
                            <span className="label">
                                {principle.no}
                            </span>

                            <p className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-tight">
                                {principle.text}
                            </p>

                            <p className="mt-1.5 text-sm text-muted-foreground">
                                {principle.note}
                            </p>
                        </li>
                    ))}
                </ul>
            </Band>

            {/* Skills */}
            <Band className="bg-surface">
                <SectionHead
                    no="04"
                    title="Skills, with evidence"
                    lead="Depth isn't equal across everything I've touched. Each entry says how well I know it and where that comes from."
                />

                <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-1">
                    {(
                        [
                            ["primary", "Primary"],
                            ["strong", "Strong"],
                            ["working", "Working"],
                            ["project-demonstrated", "Shown in work"],
                            ["familiar", "Familiar"],
                        ] as [SkillLevel, string][]
                    ).map(([key, label]) => (
                        <li
                            key={key}
                            className="label flex items-center gap-2"
                        >
                            <span
                                className={`inline-block h-2.5 w-2.5 ${levelDot[key]}`}
                            />
                            {label}
                        </li>
                    ))}
                </ul>

                <dl className="divide-y divide-rule border-y border-rule">
                    {skills.map((group) => (
                        <div
                            key={group.group}
                            className="grid12 py-4"
                        >
                            <dt className="label col-span-2 md:col-span-2 lg:col-span-3">
                                {group.group}
                            </dt>

                            <dd className="col-span-2 md:col-span-4 lg:col-span-9">
                                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((skill) => (
                                        <li
                                            key={skill.id}
                                            className="flex items-baseline gap-2"
                                            title={`${skill.level} — ${skill.evidence}`}
                                        >
                                            <span
                                                className={`inline-block h-2.5 w-2.5 shrink-0 ${
                                                    levelDot[
                                                        skill.level as SkillLevel
                                                        ]
                                                }`}
                                                aria-hidden="true"
                                            />

                                            <span className="font-mono text-sm">
                                                {skill.name}
                                            </span>

                                            <span className="label ml-auto truncate">
                                                {skill.evidence}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/projects"
                        className="press edge bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background"
                    >
                        View selected work
                    </Link>

                    <Link
                        href="/contact"
                        className="press edge bg-background px-5 py-3 font-mono text-xs uppercase tracking-[0.14em]"
                    >
                        Contact me
                    </Link>
                </div>
            </Band>
        </Page>
    );
}
