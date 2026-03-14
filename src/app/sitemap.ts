import type { MetadataRoute } from "next";
import { TRIP_TEMPLATES } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-03-08"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date("2026-03-14"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/tos`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/trip/new`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-02-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog/split-expenses-with-friends`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog/how-to-budget-a-vacation`,
      lastModified: new Date("2026-01-22"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog/offline-travel-apps`,
      lastModified: new Date("2026-02-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/templates`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...TRIP_TEMPLATES.map((t) => ({
      url: `${siteUrl}/templates/${t.slug}`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
