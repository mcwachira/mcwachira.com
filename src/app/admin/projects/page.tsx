
import Link from "next/link";
import { createClient } from "@/integrations/supabase/server";
import ProjectsClient from "./projects-client";

export default async function AdminProjectsPage() {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select(
            "id,slug,title,kind,state,verification,featured,featured_order,current_build",
        )
        .order("sort_order", { ascending: true });

    if (error) {
        throw new Error(`Could not load projects: ${error.message}`);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Projects
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage portfolio projects and case studies.
                    </p>
                </div>

                <Link
                    href="/admin/projects/new"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                    New project
                </Link>
            </div>

            <ProjectsClient projects={projects ?? []} />
        </div>
    );
}
