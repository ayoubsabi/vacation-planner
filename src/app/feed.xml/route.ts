import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

const posts = [
  {
    title: "Best Free Offline Travel Apps That Work Without Internet",
    slug: "offline-travel-apps",
    description:
      "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
    publishedTime: "2026-02-05T00:00:00.000Z",
  },
  {
    title: "How to Budget a Vacation: A Step-by-Step Guide",
    slug: "how-to-budget-a-vacation",
    description:
      "Learn how to plan a realistic vacation budget by category, build a spending buffer, and track actuals vs estimates — before you book a single thing.",
    publishedTime: "2026-01-22T00:00:00.000Z",
  },
  {
    title: "How to Split Trip Expenses Fairly With Friends",
    slug: "split-expenses-with-friends",
    description:
      "A practical guide to splitting group travel costs fairly, with debt minimization explained in plain language. No spreadsheets needed.",
    publishedTime: "2026-01-15T00:00:00.000Z",
  },
];

export async function GET() {
  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedTime).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Budget Rover Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Travel budgeting tips, expense splitting guides, and trip planning advice from Budget Rover.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
