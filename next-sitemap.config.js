module.exports = {
    siteUrl: "https://mcwachira.com",
    generateRobotsTxt: true,
    sitemapSize: 1000,
    exclude: ["/server-sitemap.xml"], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            "https://mcwachira.com/server-sitemap.xml", // <==== Add here
        ],
    },
};