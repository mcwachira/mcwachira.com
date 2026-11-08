import { notFound } from "next/navigation";
import { createClient } from "@/integrations/supabase/server";
import ProjectEditor from "../project-editor";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function AdminProjectPage({ params }: Props) {
    const { id } = await params;

    // The editor handles new projects without a database lookup.
    if (id === "new") {
        return <ProjectEditor id="new" initialProject={null} />;
    }

    const supabase = await createClient();

    const { data: project, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error(`Could not load project: ${error.message}`);
    }

    if (!project) {
        notFound();
    }

    return (
        <ProjectEditor
            id={project.id}
            initialProject={{
                id: project.id,
                slug: project.slug,
                title: project.title,
                kind: project.kind,
                state: project.state,
                verification: project.verification,
                featured: project.featured,
                featured_order: project.featured_order ?? 0,
                current_build: project.current_build,
                sort_order: project.sort_order,
                data: project.data ?? {},
            }}
        />
    );
}