import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

import { getHomeContent } from "@/lib/content";

import { formatDate } from "@/lib/format";
import { Page, SectionHead, Band } from "@/components/page-layout";
import { ProjectVisual, FlowDiagram } from "@/components/project-visuals";
import { HeroScene } from "@/components/hero-scene";

import {
  profile,
  metrics as defaultMetrics,
  focus,
  stack,
  principles,
  architecture,
  industries,
} from "@/data/site";

const defaultTitle =
    "Charles Wachira — Senior Software Engineer & Technical Lead";

const defaultDescription =
    "Senior software engineer and technical lead in Nairobi. Full-stack systems, CRM architecture, business automation and API integrations for real businesses.";

/**
 * Load homepage data on the server.
 *
 * React cache() allows generateMetadata() and the page to reuse
 * the same result during a server render.
 */
const getHomeData = cache(async () => {
  const queryClient = new QueryClient();

  const getHomeData = cache(getHomeContent);
  const { projects, posts, experiences, settings } = await getHomeData();

  return {
    projects,
    posts,
    experiences,
    settings,
  };
});

/**
 * Next.js SEO metadata.
 * Replaces TanStack Router's head() configuration.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getHomeData();

  const title = settings?.homeTitle || defaultTitle;
  const description = settings?.homeDescription || defaultDescription;

  const ogTitle = settings?.ogTitle || title;
  const ogDescription = settings?.ogDescription || description;

  return {
    title,
    description,

    alternates: {
      canonical: "https://mcwachira.com/",
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "profile",
      url: "https://mcwachira.com/",
      siteName: "Charles Wachira",
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
  };
}

export default async function Home() {
  const { projects, posts, experiences, settings } = await getHomeData();

  const featured = projects.cases.filter((project) => project.featured);

  const publishedEngineering = projects.builds;

  const metricList = settings?.metrics?.length
      ? settings.metrics
      : defaultMetrics;

  const employment = experiences.filter(
      (experience) => experience.kind === "Employment",
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Senior Software Engineer, Technical Lead",
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: profile.specialisms,
  };

  return (
      <>
        {/* Structured data for search engines */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
        />

        <Page>
          {/* 02 — HERO */}
          <section className="rule-field border-b border-border">
            <div className="shell grid12 relative py-12 sm:py-16 md:py-20 lg:py-24">
              <HeroScene className="pointer-events-none absolute inset-0 opacity-50" />

              <div className="relative col-span-2 min-w-0 md:col-span-6 lg:col-span-8 rise">
                <p className="label">
                  01 / Profile — Based in Nairobi
                </p>

                <h1 className="fluid-display mt-5 max-w-full font-bold">
                  Senior software
                  <br />
                  engineer building
                  <br />
                  <span className="bg-accent px-2 text-accent-foreground">
                  scalable systems
                </span>
                  <br />
                  for real businesses.
                </h1>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {settings?.statement ?? profile.statement}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {settings?.currentLine ??
                      "Currently technical lead at Finlanza, working across full-stack engineering, CRM architecture, automation and technical delivery."}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                      href="/work"
                      className="press edge inline-flex items-center justify-center bg-foreground px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-background"
                  >
                    View selected work
                  </Link>

                  <Link
                      href="/contact"
                      className="press edge inline-flex items-center justify-center bg-background px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.14em]"
                  >
                    Let&rsquo;s work together
                  </Link>
                </div>
              </div>

              {/* Technical identity module */}
              <aside className="relative col-span-2 mt-10 min-w-0 md:col-span-6 lg:col-span-4 lg:mt-0">
                <div className="edge shadow-hard bg-surface">
                  <div className="hairline flex items-center justify-between border-b border-border px-4 py-2">
                    <span className="label">Identity</span>
                    <span className="label">CW / 01</span>
                  </div>

                  <dl className="divide-y divide-rule">
                    {[
                      ["Location", profile.location],
                      ["Role", "Senior Software Engineer"],
                      ["Also", "Technical Lead"],
                      ["Experience", `${profile.years} years`],
                    ].map(([key, value]) => (
                        <div
                            key={key}
                            className="flex items-baseline justify-between gap-4 px-4 py-3"
                        >
                          <dt className="label">{key}</dt>
                          <dd className="text-right font-display text-sm font-bold">
                            {value}
                          </dd>
                        </div>
                    ))}
                  </dl>

                  <div className="grid grid-cols-2 border-t border-border">
                    {[
                      "Full-stack",
                      "Systems",
                      "Automation",
                      "Integrations",
                    ].map((technology, index) => (
                        <span
                            key={technology}
                            className={`px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] ${
                                index % 2 === 0 ? "border-r border-rule" : ""
                            } ${
                                index < 2 ? "border-b border-rule" : ""
                            }`}
                        >
                      {technology}
                    </span>
                    ))}
                  </div>
                </div>

                <p className="label mt-3">
                  Building software systems — full-stack + automation
                </p>
              </aside>
            </div>
          </section>

          {/* 03 — METRICS */}
          <section className="border-b border-border bg-surface">
            <div className="shell grid grid-cols-2 divide-rule lg:grid-cols-4">
              {metricList.map((metric, index) => (
                  <div
                      key={metric.label}
                      className={`min-w-0 py-6 ${
                          index % 2 === 1
                              ? "border-l border-rule pl-4 sm:pl-6"
                              : ""
                      } ${
                          index < 2
                              ? "border-b border-rule lg:border-b-0"
                              : ""
                      } ${
                          index === 2 || index === 3
                              ? "lg:border-l lg:border-rule lg:pl-6"
                              : ""
                      } ${index === 0 ? "lg:pl-0" : ""}`}
                  >
                    <p className="font-display text-4xl font-bold leading-none sm:text-5xl">
                      {metric.value}
                    </p>

                    <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">
                      {metric.label}
                    </p>
                  </div>
              ))}
            </div>
          </section>

          {/* 04 — ENGINEERING FOCUS */}
          <Band>
            <SectionHead
                no="02"
                title="Engineering Focus"
                lead="Four areas that account for most of the work I ship. They usually appear together on the same project."
                meta={["Architecture", "Implementation", "Integration"]}
            />

            <div className="grid12">
              {focus.map((item) => (
                  <article
                      key={item.no}
                      className={`col-span-2 min-w-0 border-t border-border pt-5 md:col-span-3 ${item.span}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="label">{item.no}</span>
                      <span className="label">{item.tech.length} tech</span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((technology) => (
                          <li
                              key={technology}
                              className="edge px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
                          >
                            {technology}
                          </li>
                      ))}
                    </ul>
                  </article>
              ))}
            </div>
          </Band>

          {/* 05 — SELECTED WORK */}
          <Band>
            <SectionHead
                no="03"
                title="Selected Work"
                lead="Systems delivered across real estate, construction, hospitality and NGO operations. Each entry opens a full case study."
                meta={["2018—2026", "Nairobi / Remote"]}
            />

            <div className="grid12">
              {featured.map((project) => (
                  <article
                      key={project.slug}
                      className={`group col-span-2 min-w-0 md:col-span-6 ${project.span}`}
                  >
                    <Link
                        href={`/work/${project.slug}`}
                        className="block"
                    >
                      <div className="overflow-hidden">
                        <div className="transition-transform duration-300 group-hover:-translate-y-1">
                          <ProjectVisual
                              flow={project.flow}
                              no={project.no}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
                    <span className="label">
                      {project.no} — {project.category}
                    </span>

                        <span className="label">{project.year}</span>
                      </div>

                      <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>

                      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {project.technologies.slice(0, 5).map((technology) => (
                            <li key={technology} className="label">
                              {technology}
                            </li>
                        ))}
                      </ul>

                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                    <span className="border-b border-accent pb-0.5">
                      View case study &rarr;
                    </span>
                      </p>
                    </Link>
                  </article>
              ))}
            </div>
          </Band>

          {/* BUILT IN PUBLIC */}
          <Band className="border-t border-border">
            <SectionHead
                no="03b"
                title="Built in Public"
                lead="What I'm building now, on GitHub. Kept separate from client work and labelled honestly — current builds are current builds."
                meta={[
                  `${publishedEngineering.length} repositories`,
                  "github.com/mcwachira",
                ]}
            />

            <ul className="border-t border-border">
              {publishedEngineering
                  .filter((project) => project.featured)
                  .sort(
                      (a, b) => a.featuredOrder - b.featuredOrder,
                  )
                  .map((project) => (
                      <li
                          key={project.slug}
                          className="border-b border-border"
                      >
                        <Link
                            href={`/work/${project.slug}`}
                            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-2 py-5 transition-colors hover:bg-surface sm:grid-cols-6 lg:grid-cols-12"
                        >
                    <span className="label row-span-3 pt-1 sm:col-span-1 sm:row-span-1">
                      {project.no}
                    </span>

                          <span className="min-w-0 font-display text-lg font-bold sm:col-span-5 sm:text-xl lg:col-span-3">
                      {project.title}
                    </span>

                          <span className="col-span-2 min-w-0 text-sm leading-relaxed text-muted-foreground sm:col-span-6 lg:col-span-5">
                      {project.summary}
                    </span>

                          <span className="col-span-2 sm:col-span-6 lg:col-span-3 lg:text-right">
                      <span
                          className={`inline-block px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] ${
                              project.currentBuild
                                  ? "bg-accent text-accent-foreground"
                                  : "edge"
                          }`}
                      >
                        {project.statusLabel}
                      </span>
                    </span>
                        </Link>
                      </li>
                  ))}
            </ul>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em]">
              <Link
                  href="/work"
                  className="border-b border-accent pb-0.5"
              >
                All work and repositories &rarr;
              </Link>
            </p>
          </Band>

          {/* 06 — ARCHITECTURE + PRINCIPLES */}
          <Band className="bg-surface">
            <SectionHead
                no="04"
                title="How I Build"
                lead="The shape most of my systems take, and the principles that decide the trade-offs inside them."
                meta={["Systems thinking", "Trade-offs"]}
            />

            <div className="grid12">
              <div className="col-span-2 min-w-0 md:col-span-6 lg:col-span-5">
                <p className="label mb-5">System layers</p>
                <FlowDiagram steps={architecture} />
              </div>

              <div className="col-span-2 min-w-0 md:col-span-6 lg:col-span-6 lg:col-start-7">
                <p className="label mb-5">Principles</p>

                <ul className="divide-y divide-rule border-y border-rule">
                  {principles.map((principle) => (
                      <li
                          key={principle.no}
                          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-4"
                      >
                    <span className="label pt-1">
                      {principle.no}
                    </span>

                        <div className="min-w-0">
                          <p className="font-display text-base font-bold uppercase leading-snug tracking-tight">
                            {principle.text}
                          </p>

                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {principle.note}
                          </p>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </Band>

          {/* 07 — TECHNOLOGY INDEX */}
          <Band>
            <SectionHead
                no="05"
                title="Technology Index"
                lead="What I actually work with, grouped the way I use it rather than as a logo wall."
                meta={[
                  "Index",
                  `${stack.reduce(
                      (total, group) => total + group.items.length,
                      0,
                  )} entries`,
                ]}
            />

            <dl className="divide-y divide-rule border-y border-rule">
              {stack.map((group) => (
                  <div
                      key={group.category}
                      className="grid12 gap-y-2 py-4"
                  >
                    <dt className="label col-span-2 md:col-span-2 lg:col-span-3">
                      {group.category}
                    </dt>

                    <dd className="col-span-2 min-w-0 md:col-span-4 lg:col-span-9">
                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {group.items.map((technology) => (
                            <li
                                key={technology}
                                className="font-mono text-sm"
                            >
                              {technology}
                            </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
              ))}
            </dl>
          </Band>

          {/* 08 — EXPERIENCE */}
          <Band className="bg-surface">
            <SectionHead
                no="06"
                title="Experience"
                lead="Software developer to technical lead, across product work and long-running client systems."
                meta={["2018 — Present"]}
            />

            <ol className="border-t border-border">
              {employment.map((experience) => (
                  <li
                      key={experience.id}
                      className="grid12 gap-y-5 border-b border-rule py-6"
                  >
                    <div className="col-span-2 min-w-0 md:col-span-2 lg:col-span-3">
                      <p className="label">
                        {experience.start_label} — {experience.end_label}
                      </p>

                      <p className="label mt-1">
                        {experience.location}
                      </p>
                    </div>

                    <div className="col-span-2 min-w-0 md:col-span-4 lg:col-span-6">
                      <h3 className="font-display text-xl font-bold sm:text-2xl">
                        {experience.role}
                      </h3>

                      <p className="mt-1 font-mono text-sm text-accent-foreground dark:text-foreground">
                        {experience.company}
                      </p>

                      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                        {experience.description}
                      </p>
                    </div>

                    <ul className="col-span-2 space-y-2 md:col-span-6 lg:col-span-3">
                      {experience.achievements.map((achievement) => (
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

            <p className="label mt-4 leading-relaxed">
              Progression: Software Developer &rarr; Front-End Engineer
              &rarr; Full-Stack Engineer &rarr; Technical Lead
            </p>
          </Band>

          {/* 09 — WRITING */}
          <Band>
            <SectionHead
                no="07"
                title="Blog"
                lead="Notes on engineering problems I have actually worked through."
            />

            <ul className="divide-y divide-rule border-y border-rule">
              {posts.slice(0, 3).map((post, index) => (
                  <li
                      key={post.slug}
                      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-2 py-5 sm:grid-cols-6 lg:grid-cols-12"
                  >
                <span className="label row-span-2 pt-1 sm:col-span-1 sm:row-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                    <div className="min-w-0 sm:col-span-5 lg:col-span-3">
                      <span className="label">{post.category}</span>
                    </div>

                    <div className="min-w-0 sm:col-span-5 lg:col-span-5">
                      <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">
                        {post.hasBody ? (
                            <Link
                                href={`/blog/${post.slug}`}
                                className="transition-colors hover:text-muted-foreground"
                            >
                              {post.title}
                            </Link>
                        ) : (
                            post.title
                        )}
                      </h3>
                    </div>

                    <div className="col-start-2 flex flex-wrap gap-x-4 gap-y-1 sm:col-span-5 sm:col-start-2 lg:col-span-3 lg:col-start-auto lg:justify-end">
                  <span className="label">
                    {formatDate(post.published_at)}
                  </span>

                      <span className="label">{post.read_time}</span>
                    </div>
                  </li>
              ))}
            </ul>

            <Link
                href="/blog"
                className="label mt-5 inline-block border-b border-accent pb-0.5 text-foreground"
            >
              All notes &rarr;
            </Link>
          </Band>

          {/* 10 — ABOUT */}
          <Band className="bg-surface">
            <SectionHead
                no="08"
                title="About"
                meta={[profile.location, `${profile.years} years`]}
            />

            <div className="grid12">
              <div className="col-span-2 min-w-0 space-y-4 md:col-span-6 lg:col-span-7">
                <p className="text-lg leading-relaxed">
                  I have spent {profile.years} years building software, most
                  of it for businesses where the software has to match how
                  the operation already works. That has meant full-stack
                  applications, CRM architecture, automation and the
                  integrations between systems that were never designed
                  to talk to each other.
                </p>

                <p className="leading-relaxed text-muted-foreground">
                  My work now centres on CRM architecture, business
                  automation, API integrations, custom business
                  applications and technical leadership — architecting
                  the system, implementing it, testing it, deploying it
                  and training the team that runs it afterwards.
                </p>

                <Link
                    href="/about"
                    className="press edge inline-flex items-center justify-center bg-background px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em]"
                >
                  More about me
                </Link>
              </div>

              <div className="col-span-2 min-w-0 md:col-span-6 lg:col-span-4 lg:col-start-9">
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
              </div>
            </div>
          </Band>

          {/* 11 — CONTACT */}
          <section className="py-14 sm:py-16 md:py-24">
            <div className="shell grid12">
              <div className="col-span-2 min-w-0 md:col-span-6 lg:col-span-7">
                <p className="label">09 / Contact</p>

                <h2 className="fluid-display mt-4 font-bold">
                  Have a system
                  <br />
                  that needs
                  <br />
                  building?
                </h2>
              </div>

              <div className="col-span-2 min-w-0 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
                <p className="leading-relaxed text-muted-foreground">
                  I take on software systems, business applications,
                  integrations, automation and full technical delivery.
                  Tell me what the operation needs to do and I will tell
                  you what it takes to build.
                </p>

                <Link
                    href="/contact"
                    className="press edge mt-6 inline-flex items-center justify-center bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </section>
        </Page>
      </>
  );
}