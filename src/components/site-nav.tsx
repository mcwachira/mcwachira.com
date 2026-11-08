
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, profile } from "@/data/site";
import { ThemeToggle } from "@/components/theme";

export function SiteNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Prevent background scrolling while the mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Determine whether a navigation link matches the current route.
    const isActive = (to: string) =>
        to === "/"
            ? pathname === "/"
            : pathname === to || pathname.startsWith(`${to}/`);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-[2px]">
            <div className="shell flex h-14 items-center justify-between gap-4">

                {/* Brand */}
                <Link
                    href="/"
                    className="group flex items-baseline gap-2"
                    aria-label={`${profile.name} — home`}
                >
          <span className="font-display text-base font-bold tracking-tight">
            {profile.name}
          </span>

                    <span className="label hidden sm:inline">
            Senior Software Engineer
          </span>
                </Link>

                {/* Desktop navigation */}
                <nav
                    aria-label="Primary"
                    className="hidden items-center gap-6 md:flex"
                >
                    {nav.map((item) => {
                        const active = isActive(item.to);

                        return (
                            <Link
                                key={item.to}
                                href={item.to}
                                aria-current={active ? "page" : undefined}
                                className="relative font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
                            >
                                {item.label}

                                <span
                                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                                        active ? "w-full" : "w-0"
                                    }`}
                                />
                            </Link>
                        );
                    })}

                    <ThemeToggle />
                </nav>

                {/* Mobile controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setOpen((previous) => !previous)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                        className="edge h-8 px-3 font-mono text-[11px] uppercase tracking-[0.14em]"
                    >
                        {open ? "Close" : "Menu"}
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {open && (
                <div
                    id="mobile-menu"
                    className="fixed inset-x-0 bottom-0 top-14 z-50 bg-background md:hidden"
                >
                    <nav
                        aria-label="Mobile"
                        className="flex h-full flex-col"
                    >
                        <Link
                            href="/"
                            aria-current={pathname === "/" ? "page" : undefined}
                            className="hairline flex items-baseline justify-between px-4 py-5 font-display text-3xl font-bold"
                        >
                            Home
                            <span className="label">00</span>
                        </Link>

                        {nav.map((item, index) => (
                            <Link
                                key={item.to}
                                href={item.to}
                                aria-current={isActive(item.to) ? "page" : undefined}
                                className="hairline flex items-baseline justify-between px-4 py-5 font-display text-3xl font-bold"
                            >
                                {item.label}

                                <span className="label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                            </Link>
                        ))}

                        {/* Contact information */}
                        <div className="hairline mt-auto space-y-1 px-4 py-6">
                            <p className="label">{profile.location}</p>

                            <a
                                href={`mailto:${profile.email}`}
                                className="block font-mono text-sm underline underline-offset-4"
                            >
                                {profile.email}
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
