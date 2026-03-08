import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card } from "@/components/common/Card";

export const metadata: Metadata = {
  title: "How to Split Trip Expenses Fairly With Friends",
  description:
    "A practical guide to splitting group travel costs fairly, with debt minimization explained in plain language. No spreadsheets needed.",
  openGraph: {
    title: "How to Split Trip Expenses Fairly With Friends",
    description:
      "Group travel is fun — until it's time to settle who owes what. Learn how debt minimization works and how to split costs fairly.",
    type: "article",
    publishedTime: "2026-01-15T00:00:00.000Z",
    authors: ["TripBudget"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Split Trip Expenses Fairly With Friends",
  description:
    "A practical guide to splitting group travel costs fairly, with debt minimization explained in plain language.",
  author: { "@type": "Organization", name: "TripBudget" },
  publisher: {
    "@type": "Organization",
    name: "TripBudget",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripbudget.app",
  },
  datePublished: "2026-01-15T00:00:00.000Z",
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripbudget.app"}/blog/split-expenses-with-friends`,
};

export default function SplitExpensesArticle() {
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
            Splitting Expenses With Friends
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
            { label: "Splitting Expenses" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          January 15, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          How to Split Trip Expenses Fairly With Friends
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Group travel is one of life&apos;s great joys. But when the trip ends and it&apos;s time
          to figure out who owes whom, things can get awkward fast. If you&apos;ve ever stared at a
          tangle of Venmo requests and still felt unsure whether the maths was right, this guide is
          for you.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          The Problem With Manual Splitting
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          On a group trip, different people pay for different things. Alex buys the Airbnb, Ben pays
          for the group dinner, Caro covers the museum tickets, and Dana grabs the taxi. By the end
          of 10 days, you have dozens of transactions flowing in every direction.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          If you try to settle up naively — each person pays back everyone they owe — you might end
          up with 12 separate bank transfers for a group of 4. That&apos;s unnecessary. A smarter
          approach can reduce those 12 transfers to as few as 3.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          How Debt Minimization Works
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Debt minimization (sometimes called{" "}
          <strong className="text-[var(--text-primary)]">debt simplification</strong>) is an
          algorithm that calculates the net balance for each person — how much they paid versus how
          much their fair share was — then produces the smallest possible set of transactions to
          bring everyone back to zero.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Here&apos;s a simple example. Three friends go on a weekend trip:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] mb-4 space-y-1">
          <li>Alice paid $300 for the Airbnb (shared equally)</li>
          <li>Bob paid $90 for dinner (shared equally)</li>
          <li>Carol paid $60 for museum tickets (shared equally)</li>
        </ul>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Total: $450 split 3 ways = $150 each. Alice overpaid by $150, Bob overpaid by $40, Carol
          overpaid by $10. Bob owes Alice $40, Carol owes Alice $10. Two transfers instead of a
          back-and-forth mess.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          TripBudget runs this calculation automatically every time you add an expense, so
          you&apos;re always looking at the current, simplified settlement picture.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Splitting Expenses Step by Step with TripBudget
        </h2>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Step 1: Add Your Travelers
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          When you create a trip, add everyone who&apos;s going. Each person gets their own entry so
          TripBudget can track who paid and who benefits from each expense independently.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Step 2: Log Each Expense as It Happens
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          For every expense, record who paid and which travelers it should be split between. Not all
          expenses split equally — maybe the hotel is shared but one friend paid for their own
          private activities. TripBudget handles both.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Step 3: Let TripBudget Calculate the Debts
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Head to the Expense Splitter tab. TripBudget shows you the minimum set of payments needed
          to settle all debts — no manual maths, no spreadsheet. Share the settlement summary with
          the group via the read-only share link or export a PDF.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Related Trip Templates
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          See expense splitting in action with these sample group trip budgets:
        </p>

        <Card className="mb-8">
          <ul className="space-y-3">
            <li>
              <Link
                href="/templates/tokyo-group"
                className="text-[var(--primary)] hover:underline font-medium text-sm"
              >
                Tokyo Group Adventure — 4 friends, 10 days →
              </Link>
            </li>
            <li>
              <Link
                href="/templates/prague-stag"
                className="text-[var(--primary)] hover:underline font-medium text-sm"
              >
                Prague Stag/Bachelor Trip — 6 people, 5 days →
              </Link>
            </li>
          </ul>
        </Card>

        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Ready to settle up fairly?</p>
          <p className="text-white/80 text-sm mb-4">
            Create a free trip in seconds — no account, no app download required.
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
            TripBudget
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
