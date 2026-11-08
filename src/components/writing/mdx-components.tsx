"use client";

import * as React from "react";

interface CalloutProps {
    type: "note" | "warning" | "tip" | "danger";
    title?: string;
    children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
    const styles: Record<string, string> = {
        note: "border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-100",
        warning: "border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-100",
        tip: "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
        danger: "border-red-500 bg-red-500/10 text-red-900 dark:text-red-100",
    };

    const icons: Record<string, React.ReactNode> = {
        note: <InfoIcon />,
        warning: <AlertIcon />,
        tip: <LightbulbIcon />,
        danger: <AlertTriangleIcon />,
    };

    return (
        <div
            className={`edge border-l-4 p-4 my-4 ${styles[type]} text-sm`}
            role="note"
            aria-label={type}
        >
            <div className="flex gap-3">
                <span className="shrink-0" aria-hidden="true">
                    {icons[type]}
                </span>
                <div className="flex-1">
                    {title && (
                        <p className="font-semibold mb-1">{title}</p>
                    )}
                    <div className="prose prose-sm m-0">{children}</div>
                </div>
            </div>
        </div>
    );
}

function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
    );
}

function LightbulbIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 11c0 2.5-1 4.9-2 6.8" />
            <path d="M6 11c0 2.5 1 4.9 2 6.8" />
            <path d="M12 2a6 6 0 0 1 6 6v5" />
            <path d="M12 22v-2" />
            <path d="M12 2a6 6 0 0 0-6 6v5" />
            <path d="M8 14v2" />
            <path d="M16 14v2" />
        </svg>
    );
}

function AlertTriangleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
    );
}

interface CodeExampleProps {
    language?: string;
    title?: string;
    children: string;
    filename?: string;
}

export function CodeExample({ language, title, children, filename }: CodeExampleProps) {
    return (
        <div className="my-4 overflow-hidden edge">
            {(title || filename) && (
                <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                    {filename && (
                        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
                    )}
                    {title && !filename && (
                        <span className="font-mono text-xs text-muted-foreground">{title}</span>
                    )}
                    {language && (
                        <span className="font-mono text-xs text-muted-foreground">{language}</span>
                    )}
                </div>
            )}
            <pre className="p-4 overflow-x-auto"><code className={`language-${language || "text"}`}>{children}</code></pre>
        </div>
    );
}

interface ImageWithCaptionProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

export function ImageWithCaption({ src, alt, caption, width, height }: ImageWithCaptionProps) {
    return (
        <figure className="my-6">
            <div className="edge overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt || ""}
                    width={width}
                    height={height}
                    className="w-full h-auto"
                    loading="lazy"
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground font-mono">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
    return (
        <div className="my-6 aspect-video w-full max-w-4xl mx-auto">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full edge"
            />
        </div>
    );
}

interface ComparisonTableProps {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
}

export function ComparisonTable({ headers, rows, caption }: ComparisonTableProps) {
    return (
        <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-border bg-muted">
                        {headers.map((header, i) => (
                            <th key={i} className="px-4 py-3 text-left font-semibold text-sm">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-3 text-sm border-t border-border">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {caption && (
                <caption className="mt-2 text-sm text-muted-foreground font-mono text-center">
                    {caption}
                </caption>
            )}
        </div>
    );
}

interface ExternalLinkProps {
    href: string;
    children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
    const isExternal = href.startsWith("http") && !href.startsWith("https://mcwachira.com");
    
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-accent"
        >
            {children}
            {isExternal && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
            )}
        </a>
    );
}

export const mdxComponents = {
    Callout,
    CodeExample,
    ImageWithCaption,
    YouTubeEmbed,
    ComparisonTable,
    ExternalLink,
    // Override default elements for consistent styling
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} className="fluid-section font-bold" />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} className="text-2xl font-bold mt-8 mb-4" />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} className="text-xl font-bold mt-6 mb-3" />,
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h4 {...props} className="text-lg font-bold mt-4 mb-2" />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="mt-4 text-muted-foreground leading-relaxed" />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} className="mt-4 list-disc list-inside space-y-2 text-muted-foreground" />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} className="mt-4 list-decimal list-inside space-y-2 text-muted-foreground" />,
    li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} className="leading-relaxed" />,
    blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote {...props} className="mt-4 border-l-4 border-accent pl-4 italic text-muted-foreground" />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const isExternal = props.href?.startsWith("http") && !props.href?.startsWith("https://mcwachira.com");
        return (
            <a
                {...props}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="underline underline-offset-2 hover:text-accent"
            />
        );
    },
    code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded" />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} className="mt-4 overflow-x-auto p-4 edge" />,
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr {...props} className="my-8 border-border" />,
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 overflow-x-auto">
            <table {...props} className="w-full border-collapse" />
        </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th {...props} className="px-4 py-3 text-left font-semibold text-sm border-b border-border bg-muted" />,
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td {...props} className="px-4 py-3 text-sm border-t border-border" />,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        const { alt, ...rest } = props;
        return (
            <figure className="my-6">
                <div className="edge overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img {...rest} alt={alt || ""} className="w-full h-auto" loading="lazy" />
                </div>
            </figure>
        );
    },
};

export type MDXComponents = typeof mdxComponents;