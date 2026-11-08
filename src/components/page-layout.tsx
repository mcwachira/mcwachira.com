
import type { ReactNode } from "react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

interface PageProps {
    children: ReactNode;
}

interface SectionHeadProps {
    no: string;
    title: string;
    meta?: string[];
    lead?: string;
}

interface BandProps {
    children: ReactNode;
    className?: string;
}

/**
 * Main site layout.
 * Shared by pages that need the site navigation and footer.
 */
export function Page({ children }: PageProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:edge focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
            >
                Skip to content
            </a>

            <SiteNav />

            <main id="main" className="flex-1">
                {children}
            </main>

            <SiteFooter />
        </div>
    );
}

/**
 * Reusable heading for major page sections.
 */
export function SectionHead({
                                no,
                                title,
                                meta,
                                lead,
                            }: SectionHeadProps) {
    return (
        <div className="grid12 items-end pb-8">
            <div className="col-span-2 md:col-span-4 lg:col-span-7">
                <p className="label">
                    {no} / {title.toUpperCase()}
                </p>

                <h2 className="fluid-section mt-3 font-bold">
                    {title}
                </h2>
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-4 lg:col-start-9">
                {lead && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {lead}
                    </p>
                )}

                {meta && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {meta.map((item) => (
                            <li key={item} className="label">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="col-span-2 md:col-span-6 lg:col-span-12">
                <div className="mt-6 h-px w-full bg-border" />
            </div>
        </div>
    );
}

/**
 * Consistent section wrapper with responsive vertical spacing.
 */
export function Band({
                         children,
                         className = "",
                     }: BandProps) {
    return (
        <section className={`border-b border-rule py-14 md:py-20 ${className}`}>
            <div className="shell">
                {children}
            </div>
        </section>
    );
}
