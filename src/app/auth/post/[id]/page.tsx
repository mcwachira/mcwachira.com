import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts.actions";
import PostEditor from "./post-editor";

export default async function AdminPostEditorPage({
                                                      params,
                                                  }: {
    params: Promise<{ id: string }>;
}) {
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