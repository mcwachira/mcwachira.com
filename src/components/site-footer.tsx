import Link from "next/link";
import { cacheLife } from "next/cache";

import { nav, profile } from "@/data/site";
import { ThemeToggle } from "@/components/theme";

async function getCurrentYear() {
    "use cache";

    cacheLife("hours");

    return new Date().getFullYear();
}

export async function SiteFooter() {
    const currentYear = await getCurrentYear();

    return (
        <footer className="border-t border-border">
            <div className="shell grid12 py-10">
                {/* Profile */}
                <div className="col-span-2 md:col-span-3 lg:col-span-4">
                    <p className="font-display text-xl font-bold">
                        {profile.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Senior Software Engineer
                    </p>

                    <p className="label mt-3">
                        {profile.location}
                    </p>
                </div>

                {/* Internal navigation */}
                <nav
                    aria-label="Footer"
                    className="col-span-1 md:col-span-1 lg:col-span-2"
                >
                    <p className="label">Pages</p>

                    <ul className="mt-3 space-y-1.5">
                        <li>
                            <Link
                                href="/"
                                className="text-sm hover:text-accent"
                            >
                                Home
                            </Link>
                        </li>

                        {nav.map((item) => (
                            <li key={item.to}>
                                <Link
                                    href={item.to}
                                    className="text-sm hover:text-accent"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* External links */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <p className="label">Elsewhere</p>

                    <ul className="mt-3 space-y-1.5">
                        <li>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-accent"
                            >
                                LinkedIn
                            </a>
                        </li>

                        <li>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-accent"
                            >
                                GitHub
                            </a>
                        </li>

                        <li>
                            <a
                                href={`mailto:${profile.email}`}
                                className="break-all text-sm hover:text-accent"
                            >
                                {profile.email}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Theme selector */}
                <div className="col-span-2 md:col-span-6 lg:col-span-3 lg:justify-self-end">
                    <p className="label">Theme</p>

                    <ThemeToggle className="mt-3" />
                </div>
            </div>

            {/* Copyright */}
            <div className="shell hairline flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="label">
                    &copy; {currentYear} {profile.name}
                </p>

                <p className="label">
                    Nairobi / Remote — 2018—{currentYear}
                </p>
            </div>
        </footer>
    );
}