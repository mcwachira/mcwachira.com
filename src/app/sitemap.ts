import { MetadataRoute } from "next";
import { listProjects } from "@/lib/content.functions";
import { listPosts } from "@/lib/content.functions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://mcwachira.com";

    const [projects, posts] = await Promise.all([
        listProjects(),
        listPosts(),
    ]);

    const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/work/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: project.featured ? 0.8 : 0.6,
    }));

    const postUrls: MetadataRoute.Sitemap = posts
        .filter((post) => post.hasBody)
        .map((post) => ({
            url: `${baseUrl}/writing/${post.slug}`,
            lastModified: post.published_at ? new Date(post.published_at) : new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        }));

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/writing`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    return [...staticUrls, ...projectUrls, ...postUrls];
}