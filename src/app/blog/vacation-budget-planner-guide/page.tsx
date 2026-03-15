import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Vacation Budget Planner: Estimate, Track & Stick to Your Travel Budget",
  description:
    "A complete vacation budget planner guide — how to estimate travel costs before you go, track spending as you travel, and analyze your budget after the trip.",
  openGraph: {
    title: "Vacation Budget Planner: Estimate, Track & Stick to Your Travel Budget",
    description:
      "Estimate travel costs, track spending during your vacation, and analyze your budget after the trip — the complete lifecycle of a vacation budget.",
    type: "article",
    publishedTime: "2026-03-15T00:00:00.000Z",
    authors: ["Budget Rover"],
    images: [
      {
        url: "/og?title=Vacation+Budget+Planner+Guide",
        width: 1200,
        height: 630,
        alt: "Vacation Budget Planner: Estimate, Track & Stick to Your Travel Budget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacation Budget Planner: Estimate, Track & Stick to Your Travel Budget",
    description:
      "Estimate travel costs, track spending, and analyze your budget — the complete vacation budget planner guide.",
    images: ["/og?title=Vacation+Budget+Planner+Guide"],
  },
  alternates: {
    canonical: `${siteUrl}/blog/vacation-budget-planner-guide`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Vacation Budget Planner: Estimate, Track & Stick to Your Travel Budget",
  description:
    "A complete vacation budget planner guide — how to estimate travel costs before you go, track spending as you travel, and analyze your budget after the trip.",
  author: { "@type": "Organization", name: "Budget Rover" },
  publisher: {
    "@type": "Organization",
    name: "Budget Rover",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
  },
  datePublished: "2026-03-15T00:00:00.000Z",
  dateModified: "2026-03-15T00:00:00.000Z",
  wordCount: 1000,
  url: `${siteUrl}/blog/vacation-budget-planner-guide`,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/og?title=Vacation+Budget+Planner+Guide`,
    width: 1200,
    height: 630,
  },
};

const allTemplates = [
  { name: "Paris, France", travelers: 2, days: 7, budget: "$2,800", slug: "paris-honeymoon", label: "Paris Honeymoon" },
  { name: "Tokyo, Japan", travelers: 4, days: 10, budget: "$6,000", slug: "tokyo-group", label: "Tokyo Group" },
  { name: "Bali, Indonesia", travelers: 1, days: 14, budget: "$980", slug: "bali-backpacker", label: "Bali Backpacker" },
  { name: "Cancun, Mexico", travelers: 4, days: 7, budget: "$5,600", slug: "cancun-family", label: "Cancun Family" },
  { name: "Barcelona, Spain", travelers: 2, days: 5, budget: "$2,200", slug: "barcelona-couple", label: "Barcelona Couple" },
  { name: "Prague, Czech Republic", travelers: 8, days: 4, budget: "$4,800", slug: "prague-stag", label: "Prague Stag Do" },
];

export default function VacationBudgetPlannerGuideArticle() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center gap-3 px-6 h-14 max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors -ml-2"
            aria-label="Back to blog"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <p className="flex-1 font-bold text-[var(--text-primary)] truncate">
            Vacation Budget Planner Guide
          </p>
          <Link
            href="/trip/new"
            className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            New Trip
          </Link>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "Vacation Budget Planner Guide" },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Vacation Budget Planner Guide" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          March 15, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          Vacation Budget Planner: Estimate, Track, and Stick to Your Travel Budget
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Budgeting a vacation isn&apos;t a one-time task — it&apos;s a three-phase process that
          spans before, during, and after the trip. Most guides cover the estimation phase. This
          one covers all three: how to estimate your vacation costs, how to track spending as you
          go, and how to analyze the results when you&apos;re back home.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Part 1: Estimating your vacation budget
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A realistic vacation budget starts with two separate estimates: fixed costs and daily
          variable costs. Fixed costs (flights, accommodation, visas) can be priced before you
          leave with real quotes. Variable costs (food, local transport, activities) need to be
          researched per destination — what meals cost in Bali is nothing like what they cost in
          Paris.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Multiply your daily variable estimate by your number of travel days, add it to your fixed
          costs, and then add 10–20% as a buffer. That total becomes the budget you enter in your
          vacation planner.{" "}
          <Link href="/blog/how-to-budget-a-vacation" className="text-[var(--primary)] hover:underline font-medium">
            Full step-by-step estimation guide →
          </Link>
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Part 2: Choosing the right vacation budget planner app
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A good vacation budget planner needs to work <strong className="text-[var(--text-primary)]">offline</strong> (you won&apos;t always have internet),
          require <strong className="text-[var(--text-primary)]">no account</strong> (you shouldn&apos;t need to sign up to manage your own money), and
          handle <strong className="text-[var(--text-primary)]">expense splitting</strong> if you&apos;re traveling with others.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Budget Rover meets all three. It&apos;s a free Progressive Web App — no account, no
          subscription, fully offline. All your vacation data stays on your device; nothing is
          uploaded to a server. It handles solo and group trips, with a debt-minimization algorithm
          that simplifies settling shared costs.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Part 3: Tracking expenses during your vacation
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          The habit that separates travelers who stay on budget from those who don&apos;t is
          logging expenses as they happen — not at the end of the day, and definitely not at the
          end of the trip. A real-time log gives you a live picture of where you stand.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Budget Rover&apos;s dashboard shows your total spent vs. total budget, broken down by
          category and by day. The daily chart is especially useful: if you see Tuesday spiked
          because of a big dinner, you know Wednesday needs to be lighter. You can adjust in real
          time instead of discovering the problem after you land.
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? ""} format="auto" className="my-6" />

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Part 4: What to do if you&apos;re going over budget
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Even well-planned vacations can trend over budget. When you spot it early (which a good
          vacation budget tracker makes possible), you still have options:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2 mb-8 pl-2">
          <li>Identify which category is running over — usually food or activities — and cut back there specifically</li>
          <li>Swap one expensive day-plan for a cheaper alternative (a picnic instead of a restaurant lunch)</li>
          <li>Reduce shopping if it&apos;s a discretionary category in your budget</li>
          <li>Dip into your buffer — that&apos;s what it&apos;s for</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Part 5: Analyzing your spending after the trip
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          The post-trip analysis is the most underrated part of vacation budgeting — and the most
          valuable if you travel regularly. In Budget Rover, you can export a full PDF expense
          report showing every transaction, category totals, per-person breakdowns, and how actual
          spending compared to your original budget. Use this to calibrate your estimates for the
          next trip: which categories did you over-estimate? Which ones blew up unexpectedly?
          Your own data is the best planning tool you have.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Sample vacation budgets
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Use these as a starting benchmark for your own vacation budget estimate.
        </p>

        <Card className="mb-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left pb-2 pr-4 font-semibold text-[var(--text-primary)]">Destination</th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">Travelers</th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">Days</th>
                <th className="text-right pb-2 font-semibold text-[var(--text-primary)]">Total</th>
              </tr>
            </thead>
            <tbody>
              {allTemplates.map((d) => (
                <tr key={d.slug} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2.5 pr-4">
                    <Link href={`/templates/${d.slug}`} className="text-[var(--primary)] hover:underline font-medium">
                      {d.label}
                    </Link>
                    <span className="text-[var(--text-secondary)] ml-1 hidden sm:inline">— {d.name}</span>
                  </td>
                  <td className="text-right py-2.5 pr-4 text-[var(--text-secondary)]">{d.travelers}</td>
                  <td className="text-right py-2.5 pr-4 text-[var(--text-secondary)]">{d.days}</td>
                  <td className="text-right py-2.5 font-semibold text-[var(--text-primary)]">{d.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Start your vacation budget today</p>
          <p className="text-white/80 text-sm mb-4">
            Free vacation budget planner — estimate, track, and analyze your travel spending.
            No account required, works offline.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Plan your vacation for free →
          </Link>
        </div>
      </article>

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>
          <Link href="/" className="hover:underline">Budget Rover</Link>
          {" "}·{" "}
          <Link href="/blog" className="hover:underline">Blog</Link>
          {" "}·{" "}
          <Link href="/vacation-planner" className="hover:underline">Vacation Planner</Link>
          {" "}·{" "}
          <Link href="/templates" className="hover:underline">Templates</Link>
        </p>
      </footer>
    </main>
  );
}
