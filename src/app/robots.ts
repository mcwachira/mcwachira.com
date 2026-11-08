import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://mcwachira.com";

    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/about", "/work", "/writing", "/contact"],
            disallow: ["/admin/", "/auth/", "/api/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}