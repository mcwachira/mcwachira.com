
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts.actions";
import PostEditor from "./post-editor";

type PageProps = {
    params: Promise<{ id: string }>;
};

async function PostEditorContent({ params }: PageProps) {
    const { id } = await params;

    if (id === "new") {
        return <PostEditor id="new" initialPost={null} />;
    }

    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return <PostEditor id={id} initialPost={post} />;
}

function PostEditorFallback() {
    return (
        <div className="space-y-6" aria-busy="true">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
        </div>
    );
}

export default function AdminPostEditorPage({ params }: PageProps) {
    return (
        <Suspense fallback={<PostEditorFallback />}>
            <PostEditorContent params={params} />
        </Suspense>
    );
}
