import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";

export const metadata: Metadata = {
  title: "Travel Budget Tips & Guides",
  description:
    "Free guides on budgeting trips, splitting expenses with friends, and traveling smarter — from the Budget Rover team.",
  openGraph: {
    title: "Travel Budget Tips & Guides — Budget Rover Blog",
    description:
      "Free guides on budgeting trips, splitting expenses with friends, and traveling smarter.",
    type: "website",
  },
};

const articles = [
  {
    slug: "split-expenses-with-friends",
    title: "How to Split Trip Expenses Fairly With Friends",
    date: "January 15, 2026",
    excerpt:
      "Group travel is fun — until it's time to settle who owes what. Learn how debt minimization works and how to split costs fairly with zero spreadsheets.",
  },
  {
    slug: "how-to-budget-a-vacation",
    title: "How to Budget a Vacation: A Step-by-Step Guide",
    date: "January 22, 2026",
    excerpt:
      "From estimating flights to building a daily spending buffer, here's a practical framework for planning a realistic trip budget before you book anything.",
  },
  {
    slug: "offline-travel-apps",
    title: "Best Free Offline Travel Apps That Work Without Internet",
    date: "February 5, 2026",
    excerpt:
      "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-12 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Travel Budget Tips &amp; Guides
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Practical advice on planning budgets, splitting costs, and traveling smarter.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {articles.map((article) => (
            <Card key={article.slug} hoverable className="!p-5">
              <Link href={`/blog/${article.slug}`} className="block">
                <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
                  {article.date}
                </time>
                <h2 className="font-bold text-[var(--text-primary)] mt-1 mb-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {article.excerpt}
                </p>
                <span className="text-sm font-semibold text-[var(--primary)]">
                  Read article →
                </span>
              </Link>
            </Card>
          ))}
        </div>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG ?? ""} format="auto" />

        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Need inspiration?</p>
          <p className="text-white/80 text-sm mb-4">
            Browse sample budgets for popular destinations — Paris, Tokyo, Bali, and more.
          </p>
          <Link
            href="/templates"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Browse trip templates →
          </Link>
        </div>
      </div>

      <PublicFooter />
    </main>
  );
}
