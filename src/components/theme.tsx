
"use client";

import { useTheme } from "next-themes";

const OPTIONS = [
    { value: "light", label: "Light theme", glyph: "\u25d0" },
    { value: "dark", label: "Dark theme", glyph: "\u25d1" },
    { value: "system", label: "System theme", glyph: "\u25a3" },
] as const;

type ThemeToggleProps = {
    className?: string;
};

export function ThemeToggle({
                                className = "",
                            }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();

    return (
        <div
            role="radiogroup"
            aria-label="Colour theme"
            className={`inline-flex edge divide-x divide-border ${className}`}
        >
            {OPTIONS.map((option) => {
                const selected = theme === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={option.label}
                        title={option.label}
                        onClick={() => setTheme(option.value)}
                        className={`h-8 w-8 font-mono text-xs leading-none transition-colors ${
                            selected
                                ? "bg-accent text-accent-foreground"
                                : "bg-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
            <span aria-hidden="true">
              {option.glyph}
            </span>
                    </button>
                );
            })}
        </div>
    );
}
