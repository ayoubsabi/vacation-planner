import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

  return {
    rules: [
      {
        userAgent: "*",
        // allow: "/trip/new" is more specific than disallow: "/trip/" — Google honors specificity
        allow: ["/", "/trip/new", "/blog/", "/templates/"],
        disallow: ["/trip/", "/share/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
