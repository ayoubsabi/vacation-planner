import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

export const metadata: Metadata = {
  title: "How to Budget a Vacation: A Step-by-Step Guide",
  description:
    "Learn how to plan a realistic vacation budget by category, build a spending buffer, and track actuals vs estimates — before you book a single thing.",
  openGraph: {
    title: "How to Budget a Vacation: A Step-by-Step Guide",
    description:
      "From estimating flights to building a daily spending buffer, here's a practical framework for planning a realistic trip budget.",
    type: "article",
    publishedTime: "2026-01-22T00:00:00.000Z",
    authors: ["Budget Rover"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Budget a Vacation: A Step-by-Step Guide",
  description:
    "Learn how to plan a realistic vacation budget by category, build a spending buffer, and track actuals vs estimates.",
  author: { "@type": "Organization", name: "Budget Rover" },
  publisher: {
    "@type": "Organization",
    name: "Budget Rover",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com",
  },
  datePublished: "2026-01-22T00:00:00.000Z",
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com"}/blog/how-to-budget-a-vacation`,
};

const destinations = [
  {
    name: "Paris, France",
    travelers: 2,
    days: 7,
    budget: "$2,800",
    slug: "paris-honeymoon",
    label: "Paris Honeymoon",
  },
  {
    name: "Bali, Indonesia",
    travelers: 1,
    days: 14,
    budget: "$980",
    slug: "bali-backpacker",
    label: "Bali Backpacker",
  },
  {
    name: "Tokyo, Japan",
    travelers: 4,
    days: 10,
    budget: "$6,000",
    slug: "tokyo-group",
    label: "Tokyo Group",
  },
  {
    name: "Cancun, Mexico",
    travelers: 4,
    days: 7,
    budget: "$5,600",
    slug: "cancun-family",
    label: "Cancun Family",
  },
];

export default function HowToBudgetArticle() {
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
            How to Budget a Vacation
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

      <article className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "How to Budget a Vacation" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          January 22, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          How to Budget a Vacation: A Step-by-Step Guide
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          A good vacation budget isn&apos;t about spending as little as possible — it&apos;s about
          knowing what you&apos;re likely to spend so there are no nasty surprises. Here&apos;s a
          practical framework you can apply before you book a single flight.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 1: Estimate Your Fixed Costs
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Fixed costs are things you can pin down before the trip starts. Get real quotes, not
          guesses.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Flights &amp; Transport to Your Destination
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Use flight comparison tools to get a realistic price for your dates. Don&apos;t forget
          luggage fees, airport taxes, and any visa costs. If you&apos;re travelling as a group,
          multiply accordingly — group discounts are rare on international flights.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Accommodation</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Check actual prices for your travel dates — not just averages. Peak season, local
          festivals, and school holidays can double hotel rates. Hostels, Airbnb apartments, and
          hotels all have very different price-per-night profiles, especially for groups.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 2: Estimate Daily Variable Spending
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Variable costs repeat every day. Estimate a daily figure for each category, then multiply
          by your number of days.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Food &amp; Drink
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Research what meals cost at your destination. In Tokyo, a hearty ramen lunch costs $8-12;
          in Paris, a restaurant lunch is $20-35 per person. Search for &quot;average daily food
          cost [destination]&quot; to calibrate your estimate. Factor in groceries, coffee stops,
          and the occasional splurge dinner.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Activities &amp; Entertainment
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          List the specific things you want to do and look up their actual prices. Museum entries,
          guided tours, and theme parks all have fixed admission fees you can research in advance.
          Leave room for spontaneous activities you discover on the ground.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Shopping</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Be honest with yourself here. If you&apos;re going to Harajuku or Bali, you will shop.
          Set a realistic shopping budget rather than leaving it out entirely and overspending by
          accident.
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? ""} format="auto" className="my-6" />

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 3: Add a 10-20% Buffer
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Every trip has unexpected costs: a medical kit, a missed bus that means a taxi, a
          restaurant that&apos;s closed so you go somewhere more expensive. Add 10% for a tight
          trip and 20% for more relaxed spending. This isn&apos;t money you plan to spend — it&apos;s
          money you hope not to, but will be glad you have.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 4: Track Actuals as You Travel
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          A budget you build before the trip but never check during it isn&apos;t much help. Log
          expenses as you go — ideally the same day — so you can see whether you&apos;re on track.
          Budget Rover&apos;s daily spending chart makes it easy to spot if one category is running
          away from your estimates and adjust.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Sample Vacation Budgets by Destination
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Not sure where to start? Here are four real sample trip budgets you can browse and use as
          a baseline for your own planning.
        </p>

        <Card className="mb-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left pb-2 pr-4 font-semibold text-[var(--text-primary)]">
                  Destination
                </th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">
                  Travelers
                </th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">
                  Days
                </th>
                <th className="text-right pb-2 font-semibold text-[var(--text-primary)]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d.slug} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2.5 pr-4">
                    <Link
                      href={`/templates/${d.slug}`}
                      className="text-[var(--primary)] hover:underline font-medium"
                    >
                      {d.label}
                    </Link>
                    <span className="text-[var(--text-secondary)] ml-1 hidden sm:inline">— {d.name}</span>
                  </td>
                  <td className="text-right py-2.5 pr-4 text-[var(--text-secondary)]">
                    {d.travelers}
                  </td>
                  <td className="text-right py-2.5 pr-4 text-[var(--text-secondary)]">{d.days}</td>
                  <td className="text-right py-2.5 font-semibold text-[var(--text-primary)] mono">
                    {d.budget}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Ready to build your budget?</p>
          <p className="text-white/80 text-sm mb-4">
            Create a free trip, set your budget, and start logging expenses — all offline, no
            account needed.
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
          <Link href="/" className="hover:underline">
            Budget Rover
          </Link>{" "}
          ·{" "}
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          ·{" "}
          <Link href="/templates" className="hover:underline">
            Templates
          </Link>
        </p>
      </footer>
    </main>
  );
}
