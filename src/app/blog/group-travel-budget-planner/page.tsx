import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Group Travel Budget Planner: How to Plan a Trip With Friends",
  description:
    "How to plan a group trip budget without the money stress — agree on costs upfront, track shared expenses, and settle debts with the fewest possible payments.",
  openGraph: {
    title: "Group Travel Budget Planner: How to Plan a Trip With Friends",
    description:
      "Plan a group trip budget that everyone agrees on, track shared expenses fairly, and settle debts automatically — no spreadsheets required.",
    type: "article",
    publishedTime: "2026-03-15T00:00:00.000Z",
    authors: ["Budget Rover"],
    images: [
      {
        url: "/og?title=Group+Travel+Budget+Planner",
        width: 1200,
        height: 630,
        alt: "Group Travel Budget Planner: How to Plan a Trip With Friends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Travel Budget Planner: How to Plan a Trip With Friends",
    description:
      "Plan a group trip budget that everyone agrees on, track shared expenses fairly, and settle debts automatically.",
    images: ["/og?title=Group+Travel+Budget+Planner"],
  },
  alternates: {
    canonical: `${siteUrl}/blog/group-travel-budget-planner`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Group Travel Budget Planner: How to Plan a Trip With Friends",
  description:
    "How to plan a group trip budget without the money stress — agree on costs upfront, track shared expenses, and settle debts with the fewest possible payments.",
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
  wordCount: 950,
  url: `${siteUrl}/blog/group-travel-budget-planner`,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/og?title=Group+Travel+Budget+Planner`,
    width: 1200,
    height: 630,
  },
};

const groupTemplates = [
  { name: "Tokyo, Japan", travelers: 4, days: 10, budget: "$6,000", slug: "tokyo-group", label: "Tokyo Group Trip" },
  { name: "Cancun, Mexico", travelers: 4, days: 7, budget: "$5,600", slug: "cancun-family", label: "Cancun Family" },
  { name: "Prague, Czech Republic", travelers: 8, days: 4, budget: "$4,800", slug: "prague-stag", label: "Prague Stag Do" },
];

export default function GroupTravelBudgetArticle() {
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
            Group Travel Budget Planner
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
          { name: "Group Travel Budget Planner" },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Group Travel Budget Planner" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          March 15, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          Group Travel Budget Planner: How to Plan a Trip With Friends Without the Money Stress
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Group trips are memorable — until someone pulls up a spreadsheet and announces that
          nobody can agree on who owes what. The money conversation at the end of a group trip is
          often the worst part. This guide is about avoiding it entirely, by planning the budget
          upfront and tracking expenses as you go.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 1: Agree on a total budget before booking anything
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Before anyone books flights, the group needs to agree on a total budget. This sounds
          obvious, but it&apos;s the step most groups skip — and it&apos;s where the trouble
          starts. One person books a luxury hotel because &quot;it&apos;s only a bit more,&quot;
          and suddenly everyone who wanted a mid-range option is stuck splitting the difference.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Poll the group for their comfortable spend before committing to anything. The budget
          should be set around the most constrained person in the group, not the most generous.
          Everyone needs to be genuinely comfortable with the number.{" "}
          <Link href="/blog/how-to-budget-a-vacation" className="text-[var(--primary)] hover:underline font-medium">
            Use this budget framework →
          </Link>{" "}
          to build a realistic estimate by category.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 2: Decide which expenses are shared and which are personal
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Not every expense on a group trip should be split equally. Accommodation, group dinners,
          shared transport (taxis, car hire), and group activities are natural shared expenses.
          Individual meals, personal shopping, and solo activities are personal — and trying to
          split those equally causes resentment.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Agree on these rules before the trip starts. Write them down in the Budget Rover trip
          description so everyone has access to the same reference point. When a gray-area expense
          comes up during the trip (should we split this drinks bill?), you have a framework to
          refer back to.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 3: Use a group travel planner app that works offline
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A shared spreadsheet doesn&apos;t work on a group trip. You need something everyone can
          access anywhere — including on planes, underground, or in areas with poor signal.
          Budget Rover is a free group travel budget planner that works fully offline as a
          Progressive Web App.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Add all travelers to the trip by name. When you log an expense, you specify who paid and
          which travelers it&apos;s split between. Budget Rover tracks the running balances
          automatically.{" "}
          <Link href="/blog/offline-travel-apps" className="text-[var(--primary)] hover:underline font-medium">
            See more offline travel apps that work without internet →
          </Link>
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? ""} format="auto" className="my-6" />

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 4: Log every shared expense as it happens
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          The discipline that makes group budgeting work is logging expenses at the time they
          happen — not trying to reconstruct them from memory at the end. Assign one person as the
          &quot;expense logger&quot; for the trip, or rotate the responsibility daily.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          In Budget Rover, logging an expense takes about 20 seconds: amount, category, who paid,
          who it&apos;s split between. The app calculates and updates balances instantly. If you
          can see the running total in real time, you can course-correct before you overspend —
          not after.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Step 5: Settle debts with the minimum number of transfers
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          When the trip ends, open the Expense Splitter tab in Budget Rover. The
          debt-minimization algorithm calculates the exact minimum set of transfers to settle all
          balances. A group of 6 people might expect 15 transfers (everyone paying everyone else),
          but the algorithm often reduces this to 4 or 5. Everyone gets a clear, simple list of
          who to pay and how much.{" "}
          <Link href="/blog/split-expenses-with-friends" className="text-[var(--primary)] hover:underline font-medium">
            Learn how debt minimization works →
          </Link>
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Sample group trip budgets
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Here are three real group trip budgets to give you a sense of what costs to expect.
        </p>

        <Card className="mb-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left pb-2 pr-4 font-semibold text-[var(--text-primary)]">Trip</th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">People</th>
                <th className="text-right pb-2 pr-4 font-semibold text-[var(--text-primary)]">Days</th>
                <th className="text-right pb-2 font-semibold text-[var(--text-primary)]">Total</th>
              </tr>
            </thead>
            <tbody>
              {groupTemplates.map((d) => (
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
          <p className="font-semibold text-lg mb-1">Planning a group trip?</p>
          <p className="text-white/80 text-sm mb-4">
            Use Budget Rover as your free group travel budget planner — add all travelers, log
            shared expenses, and settle up automatically. No account required.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Start your group trip →
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
