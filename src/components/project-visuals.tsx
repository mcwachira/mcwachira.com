
interface ProjectVisualProps {
    flow: string[];
    no: string;
    compact?: boolean;
}

interface FlowDiagramProps {
    steps: {
        label: string;
        note?: string;
    }[];
}

/**
 * Designed technical placeholder for project visuals.
 * Uses the project's system flow rather than stock photography
 * or fabricated application screenshots.
 */
export function ProjectVisual({
                                  flow,
                                  no,
                                  compact = false,
                              }: ProjectVisualProps) {
    return (
        <div
            aria-hidden="true"
            className={`relative w-full overflow-hidden border border-border bg-surface ${
                compact ? "aspect-[16/9]" : "aspect-[16/10]"
            }`}
        >
            {/* Technical grid background */}
            <div
                className="absolute inset-0 opacity-[0.5]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Schematic header */}
            <div className="absolute left-0 top-0 flex w-full items-center justify-between border-b border-rule px-3 py-2">
                <span className="label">SYS / {no}</span>
                <span className="label">SCHEMATIC</span>
            </div>

            {/* System flow */}
            <div className="absolute inset-x-0 bottom-0 top-9 flex flex-col justify-center gap-2 px-3 sm:px-5">
                {flow.map((step, i) => (
                    <div key={`${i}-${step}`} className="flex items-center gap-2">
            <span className="label w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>

                        <span
                            className={`truncate border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] sm:text-[11px] ${
                                i === flow.length - 1
                                    ? "border-accent bg-accent text-accent-foreground"
                                    : "border-border bg-background text-foreground"
                            }`}
                            style={{ marginLeft: `${Math.min(i, 4) * 10}%` }}
                        >
              {step}
            </span>

                        {i < flow.length - 1 && (
                            <span className="label hidden sm:inline">
                &darr;
              </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Vertical timeline showing the stages of a technical process.
 */
export function FlowDiagram({ steps }: FlowDiagramProps) {
    return (
        <ol className="relative">
            {steps.map((step, i) => (
                <li
                    key={`${i}-${step.label}`}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-6 last:pb-0 sm:grid-cols-[4rem_1fr]"
                >
                    <div className="relative flex justify-center">
                        <span className="relative z-10 mt-1 block h-2.5 w-2.5 rotate-45 border border-border bg-accent" />

                        {i < steps.length - 1 && (
                            <svg
                                className="absolute left-1/2 top-4 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 overflow-visible"
                                aria-hidden="true"
                            >
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="100%"
                                    stroke="var(--color-border)"
                                    strokeWidth="1"
                                    className="flow-dash"
                                />
                            </svg>
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="font-display text-base font-bold uppercase tracking-tight sm:text-lg">
                            {step.label}
                        </p>

                        {step.note && (
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                {step.note}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}
