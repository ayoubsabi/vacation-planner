import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "How to Plan a Trip: A Complete Travel Planner Guide",
  description:
    "A complete trip planning guide covering destination research, budgeting, building a traveler group, tracking expenses, and settling costs after the trip.",
  openGraph: {
    title: "How to Plan a Trip: A Complete Travel Planner Guide",
    description:
      "Everything you need to plan a trip from scratch — destination, budget, traveler group, expense tracking, and settling up after.",
    type: "article",
    publishedTime: "2026-03-15T00:00:00.000Z",
    authors: ["Budget Rover"],
    images: [
      {
        url: "/og?title=How+to+Plan+a+Trip%3A+A+Complete+Travel+Planner+Guide",
        width: 1200,
        height: 630,
        alt: "How to Plan a Trip: A Complete Travel Planner Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Plan a Trip: A Complete Travel Planner Guide",
    description:
      "Everything you need to plan a trip from scratch — destination, budget, traveler group, expense tracking, and settling up after.",
    images: ["/og?title=How+to+Plan+a+Trip%3A+A+Complete+Travel+Planner+Guide"],
  },
  alternates: {
    canonical: `${siteUrl}/blog/trip-planner-guide`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Plan a Trip: A Complete Travel Planner Guide",
  description:
    "A complete trip planning guide covering destination research, budgeting, building a traveler group, tracking expenses, and settling costs after the trip.",
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
  wordCount: 1100,
  url: `${siteUrl}/blog/trip-planner-guide`,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/og?title=How+to+Plan+a+Trip%3A+A+Complete+Travel+Planner+Guide`,
    width: 1200,
    height: 630,
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to plan a trip",
  description: "A five-phase process for planning any trip from scratch.",
  url: `${siteUrl}/blog/trip-planner-guide`,
  step: [
    {
      "@type": "HowToStep",
      name: "Choose and research your destination",
      text: "Pick a destination that fits your budget and travel style. Research average daily costs, visa requirements, best time to visit, and must-see activities. Browse sample budgets for popular destinations to calibrate your expectations.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Set your trip budget",
      text: "Estimate fixed costs (flights, accommodation) with real quotes, then add daily variable spending (food, transport, activities) multiplied by the number of days. Add a 10–20% buffer for unexpected costs and set this as your total in Budget Rover.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Build your traveler group",
      text: "Add everyone joining the trip to your Budget Rover trip. Decide upfront which expenses will be shared versus personal, so there are no surprises when it's time to settle up.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Track spending during the trip",
      text: "Log each expense as it happens — the amount, category, who paid, and who it's split between. Check your spending charts daily to see if you're on track with your budget.",
      position: 4,
    },
    {
      "@type": "HowToStep",
      name: "Settle debts after the trip",
      text: "Use Budget Rover's Expense Splitter to see exactly who owes whom. The debt-minimization algorithm calculates the fewest payments needed to balance all accounts. Export a PDF report for the group's records.",
      position: 5,
    },
  ],
};

const destinations = [
  { name: "Paris, France", travelers: 2, days: 7, budget: "$2,800", slug: "paris-honeymoon", label: "Paris Honeymoon" },
  { name: "Tokyo, Japan", travelers: 4, days: 10, budget: "$6,000", slug: "tokyo-group", label: "Tokyo Group" },
  { name: "Bali, Indonesia", travelers: 1, days: 14, budget: "$980", slug: "bali-backpacker", label: "Bali Backpacker" },
  { name: "Cancun, Mexico", travelers: 4, days: 7, budget: "$5,600", slug: "cancun-family", label: "Cancun Family" },
  { name: "Barcelona, Spain", travelers: 2, days: 5, budget: "$2,200", slug: "barcelona-couple", label: "Barcelona Couple" },
  { name: "Prague, Czech Republic", travelers: 8, days: 4, budget: "$4,800", slug: "prague-stag", label: "Prague Stag Do" },
];

export default function TripPlannerGuideArticle() {
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
            How to Plan a Trip
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "How to Plan a Trip" },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "How to Plan a Trip" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          March 15, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          How to Plan a Trip: A Complete Travel Planner Guide
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Most trips go wrong financially because of two things: no pre-trip budget, and no expense
          tracking during the trip. This guide walks through a five-phase process for planning any
          trip from scratch — whether you&apos;re going solo, as a couple, or in a large group.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Phase 1: Choose and research your destination
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Before you can build a budget, you need a destination. Destination choice is also a
          budget choice — a week in Tokyo costs four times more than a week in Bali. Research
          average daily costs for accommodation, food, and transport at your shortlisted
          destinations before committing.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Don&apos;t rely on averages alone. Look at actual hotel prices for your specific dates,
          and check whether there are local events or peak seasons that might inflate costs. Browse{" "}
          <Link href="/templates" className="text-[var(--primary)] hover:underline font-medium">
            sample trip budgets →
          </Link>{" "}
          for popular destinations to see realistic expense breakdowns.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Phase 2: Set your trip budget
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A trip budget has two parts: fixed costs and variable costs. Fixed costs are things you
          can price before you leave — flights, accommodation, visas, travel insurance. Variable
          costs repeat daily — food, local transport, activities, shopping.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Estimate your daily variable spend, multiply by your number of days, add it to your fixed
          costs, and add a 10–20% buffer on top. That total becomes your budget in Budget Rover.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          <Link href="/blog/how-to-budget-a-vacation" className="text-[var(--primary)] hover:underline font-medium">
            Read the full vacation budgeting guide →
          </Link>{" "}
          for a step-by-step breakdown of each cost category.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Phase 3: Build your traveler group
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          If you&apos;re travelling with others, add them to your trip as travelers in Budget Rover
          before you go. This lets you log expenses against specific people and track who owes whom
          as the trip progresses — rather than trying to reconstruct everything from memory at the
          end.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Agree upfront on which expenses are shared (accommodation, group dinners, transport) and
          which are personal (individual souvenirs, personal activities). This prevents awkward
          conversations later.{" "}
          <Link href="/blog/split-expenses-with-friends" className="text-[var(--primary)] hover:underline font-medium">
            Learn how group expense splitting works →
          </Link>
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? ""} format="auto" className="my-6" />

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Phase 4: Track spending during the trip
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Log expenses as they happen — ideally the same day. A quick log takes less than 30
          seconds: amount, category, who paid, who it&apos;s split between. Budget Rover&apos;s
          daily spending chart makes it easy to spot if you&apos;re overspending in one category
          and need to adjust elsewhere.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Budget Rover works fully offline as a Progressive Web App, so you can log expenses on
          planes, in hotels without Wi-Fi, or in areas with no signal. Everything syncs locally and
          never leaves your device.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Phase 5: Settle debts after the trip
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Once you&apos;re home, open the Expense Splitter tab. Budget Rover&apos;s
          debt-minimization algorithm calculates the exact minimum number of transfers needed to
          settle all balances. Instead of a chaotic chain of payments, everyone gets a simple list
          of who to pay and how much. Export a PDF report for the group&apos;s records.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Sample trip budgets by destination
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Use these as a starting point for your own trip budget. Each one shows a realistic
          breakdown of costs you can expect.
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
              {destinations.map((d) => (
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
          <p className="font-semibold text-lg mb-1">Ready to plan your trip?</p>
          <p className="text-white/80 text-sm mb-4">
            Use Budget Rover as your free trip planner — no account required, works offline.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Start planning for free →
          </Link>
        </div>
      </article>

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>
          <Link href="/" className="hover:underline">Budget Rover</Link>
          {" "}·{" "}
          <Link href="/blog" className="hover:underline">Blog</Link>
          {" "}·{" "}
          <Link href="/trip-planner" className="hover:underline">Trip Planner</Link>
          {" "}·{" "}
          <Link href="/templates" className="hover:underline">Templates</Link>
        </p>
      </footer>
    </main>
  );
}
