
import { queryOptions } from "@tanstack/react-query";

import {
    listProjects,
    listExperiences,
    listSkills,
    getSettings,
} from "./content.functions";
import { getAllArticles, getArticleBySlug, GitHubContentError } from "./writing";

import type { Project, EngineeringProject } from "@/data/site";

export type SiteSettings = {
    statement?: string;
    currentLine?: string;
    metrics?: {
        value: string;
        label: string;
    }[];
    contactHeading?: string;
    contactBody?: string;
    homeTitle?: string;
    homeDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
};

type ProjectRow = Awaited<ReturnType<typeof listProjects>>[number];

export function toCaseStudy(row: ProjectRow): Project {
    return {
        ...(row.data as object),
        slug: row.slug,
        title: row.title,
        featured: row.featured,
    } as Project;
}

export function toBuild(row: ProjectRow): EngineeringProject {
    return {
        technologies: [],
        flow: [],
        categories: [],
        ...(row.data as object),
        slug: row.slug,
        title: row.title,
        featured: row.featured,
        featuredOrder: row.featured_order,
        currentBuild: row.current_build,
        verification: "verified",
        state: "published",
    } as unknown as EngineeringProject;
}

export const projectsQuery = queryOptions({
    queryKey: ["projects"],
    queryFn: async () => {
        const rows = await listProjects();

        return {
            cases: rows
                .filter((row) => row.kind === "case-study")
                .map(toCaseStudy),

            builds: rows
                .filter((row) => row.kind === "engineering")
                .map(toBuild),
        };
    },
});

export const postsQuery = queryOptions({
    queryKey: ["posts"],
    queryFn: () => getAllArticles(),
});

export const postQuery = (slug: string) =>
    queryOptions({
        queryKey: ["post", slug],
        queryFn: () => getArticleBySlug(slug),
    });

export const experiencesQuery = queryOptions({
    queryKey: ["experiences"],
    queryFn: async () => {
        const experiences = await listExperiences();

        return experiences.map((experience) => ({
            ...experience,
            achievements: Array.isArray(experience.achievements)
                ? (experience.achievements as string[])
                : [],
        }));
    },
});

export const skillsQuery = queryOptions({
    queryKey: ["skills"],
    queryFn: () => listSkills(),
});

export const settingsQuery = queryOptions({
    queryKey: ["settings"],
    queryFn: async (): Promise<SiteSettings> => {
        return (((await getSettings()) ?? {}) as unknown) as SiteSettings;
    },
});

/**
 * Loads and prepares all data required by the homepage.
 *
 * This deliberately calls the server functions directly instead of using
 * QueryClient.fetchQuery(), avoiding QueryClient timestamps during
 * Next.js static prerendering.
 */

export async function getHomeContent() {
    let posts: Awaited<ReturnType<typeof getAllArticles>> = [];
    try {
        posts = await getAllArticles();
    } catch (error) {
        if (error instanceof GitHubContentError && error.code !== "NOT_FOUND") {
            console.warn("Failed to fetch posts for homepage:", error.message);
            posts = [];
        } else {
            throw error;
        }
    }

    const [projectRows, experiences, settings] = await Promise.all([
        listProjects(),
        listExperiences(),
        getSettings(),
    ]);

    return {
        projects: {
            cases: projectRows
                .filter((row) => row.kind === "case-study")
                .map(toCaseStudy),

            builds: projectRows
                .filter((row) => row.kind === "engineering")
                .map(toBuild),
        },
        posts,

        experiences: experiences.map((experience) => ({
            ...experience,
            achievements: Array.isArray(experience.achievements)
                ? (experience.achievements as string[])
                : [],
        })),

        settings: (settings ?? {}) as SiteSettings,
    };
}
