"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, type MDXComponents } from "./mdx-components";

interface ArticleRendererProps {
    content: string;
    format: "markdown" | "mdx";
    components?: MDXComponents;
}

export function ArticleRenderer({ content, format, components }: ArticleRendererProps) {
    const mergedComponents = React.useMemo(
        () => ({ ...mdxComponents, ...components }),
        [components]
    );

    if (format === "mdx") {
        return <MDXRemote source={content} components={mergedComponents} />;
    }

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={mergedComponents}
        >
            {content}
        </ReactMarkdown>
    );
}

export function ArticleRendererServer({ content, format, components }: ArticleRendererProps) {
    const mergedComponents = { ...mdxComponents, ...components };

    if (format === "mdx") {
        return <MDXRemote source={content} components={mergedComponents} />;
    }

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={mergedComponents}
        >
            {content}
        </ReactMarkdown>
    );
}