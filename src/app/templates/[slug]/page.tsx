import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, TrendingUp, Users } from "lucide-react";
import { TRIP_TEMPLATES } from "@/lib/templates";
import { CATEGORY_COLORS } from "@/lib/constants";
import { formatCurrency, getTotalSpent, getBudgetPercentage, getBudgetStatus } from "@/lib/utils";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { CategoryIcon } from "@/components/icons/CategoryIcons";

export function generateStaticParams() {
  return TRIP_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = TRIP_TEMPLATES.find((t) => t.slug === slug);
  if (!template) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";
  const encodedTitle = encodeURIComponent(template.title);
  return {
    title: template.title,
    description: template.metaDescription,
    openGraph: {
      title: template.title,
      description: template.metaDescription,
      type: "website",
      url: `${siteUrl}/templates/${slug}`,
      images: [
        {
          url: `/og?title=${encodedTitle}`,
          width: 1200,
          height: 630,
          alt: template.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: template.title,
      description: template.metaDescription,
      images: [`/og?title=${encodedTitle}`],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  accommodation: "Accommodation",
  food: "Food & Drink",
  transport: "Transport",
  activities: "Activities",
  shopping: "Shopping",
  entertainment: "Entertainment",
  other: "Other",
};

const BLOG_LABELS: Record<string, string> = {
  "split-expenses-with-friends": "How to Split Trip Expenses Fairly With Friends",
  "how-to-budget-a-vacation": "How to Budget a Vacation: A Step-by-Step Guide",
  "offline-travel-apps": "Best Free Offline Travel Apps That Work Without Internet",
};

const barColors = {
  safe: "bg-[var(--success)]",
  warning: "bg-amber-400",
  danger: "bg-[var(--danger)]",
};

const amountColors = {
  safe: "text-[var(--success)]",
  warning: "text-amber-500",
  danger: "text-[var(--danger)]",
};

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = TRIP_TEMPLATES.find((t) => t.slug === slug);
  if (!template) notFound();

  const { trip } = template;
  const totalSpent = getTotalSpent(trip.expenses);
  const budgetPct = getBudgetPercentage(totalSpent, trip.budget);
  const status = getBudgetStatus(budgetPct);
  const remaining = trip.budget - totalSpent;

  const travelers = trip.travelers.length;
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const days = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const perDay = totalSpent / days;

  // Category breakdown
  const byCategory: Record<string, number> = {};
  for (const e of trip.expenses) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount;
  }
  const categorySummary = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header — matches the trip page Header component style */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center gap-3 px-6 h-14 max-w-2xl mx-auto">
          <Link
            href="/templates"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors -ml-2"
            aria-label="Back to templates"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <p className="flex-1 font-bold text-[var(--text-primary)] truncate">{trip.name}</p>
          <Link
            href="/trip/new"
            className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            New Trip
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 space-y-4">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Templates", href: "/templates" },
            { name: trip.destination },
          ]}
        />
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Templates", href: "/templates" },
            { label: trip.destination },
          ]}
        />

        {/* Trip header — matches BudgetOverview top block */}
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] truncate">{template.title}</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            📍 {trip.destination}
          </p>
        </div>

        {/* Budget card — matches BudgetOverview Card */}
        <Card>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs text-[var(--text-secondary)] mb-0.5">Total Spent</p>
              <p className={`text-3xl font-bold mono ${amountColors[status]}`}>
                {formatCurrency(totalSpent, trip.baseCurrency)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--text-secondary)] mb-0.5">Budget</p>
              <p className="text-lg font-semibold text-[var(--text-primary)] mono">
                {formatCurrency(trip.budget, trip.baseCurrency)}
              </p>
            </div>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColors[status]}`}
              style={{ width: `${budgetPct}%` }}
              role="progressbar"
              aria-valuenow={Math.round(budgetPct)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
            <span>{Math.round(budgetPct)}% spent</span>
            <span>
              {remaining >= 0
                ? `${formatCurrency(remaining, trip.baseCurrency)} left`
                : `${formatCurrency(Math.abs(remaining), trip.baseCurrency)} over budget`}
            </span>
          </div>
        </Card>

        {/* Stats row — matches BudgetOverview 3-col grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center !py-3">
            <CalendarDays size={18} className="text-[var(--secondary)] mx-auto mb-1" />
            <p className="text-lg font-bold text-[var(--text-primary)]">{days}</p>
            <p className="text-xs text-[var(--text-secondary)]">days</p>
          </Card>
          <Card className="text-center !py-3">
            <TrendingUp size={18} className="text-[var(--primary)] mx-auto mb-1" />
            <p className="text-lg font-bold text-[var(--text-primary)] mono">
              {formatCurrency(perDay, trip.baseCurrency).replace(".00", "")}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">per day</p>
          </Card>
          <Card className="text-center !py-3">
            <Users size={18} className="text-[var(--success)] mx-auto mb-1" />
            <p className="text-lg font-bold text-[var(--text-primary)]">{travelers}</p>
            <p className="text-xs text-[var(--text-secondary)]">
              {travelers === 1 ? "traveler" : "travelers"}
            </p>
          </Card>
        </div>

        {/* Category breakdown */}
        <Card>
          <h2 className="font-bold text-[var(--text-primary)] mb-4">Spending by Category</h2>
          <div className="space-y-3">
            {categorySummary.map(([cat, amount]) => {
              const color = CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] ?? "#94A3B8";
              return (
                <div key={cat} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    <CategoryIcon category={cat as Parameters<typeof CategoryIcon>[0]["category"]} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {CATEGORY_LABELS[cat] ?? cat}
                      </span>
                      <span className="text-sm font-bold mono text-[var(--text-primary)]">
                        {formatCurrency(amount, trip.baseCurrency)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(amount / totalSpent) * 100}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] w-8 text-right tabular-nums shrink-0">
                    {((amount / totalSpent) * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Expense list — matches ExpenseList card rows */}
        <div>
          <h2 className="font-bold text-[var(--text-primary)] mb-3">All Expenses</h2>
          <div className="flex flex-col gap-2">
            {trip.expenses.map((expense) => {
              const color = CATEGORY_COLORS[expense.category as keyof typeof CATEGORY_COLORS] ?? "#94A3B8";
              const payer = trip.travelers.find((t) => t.id === expense.paidBy);
              const splitCount = expense.splitBetween.length;
              return (
                <div
                  key={expense.id}
                  className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    <CategoryIcon category={expense.category} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[var(--text-primary)] text-sm truncate">
                        {expense.description}
                      </p>
                      <p className="font-bold text-[var(--text-primary)] mono shrink-0">
                        {formatCurrency(expense.amount, expense.currency)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[var(--text-secondary)]">
                      <span
                        className="px-1.5 py-0.5 rounded text-white text-xs font-medium"
                        style={{ backgroundColor: color }}
                      >
                        {CATEGORY_LABELS[expense.category] ?? expense.category}
                      </span>
                      {payer && <span>Paid by {payer.name}</span>}
                      {splitCount > 1 && <span>Split {splitCount} ways</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Plan a similar trip</p>
          <p className="text-white/80 text-sm mb-4">
            Use this as inspiration. Create your own budget in seconds — free, offline, no account.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Start planning →
          </Link>
        </div>

        {/* Related blog article */}
        {template.relatedBlogSlug && (
          <Card>
            <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide mb-1">
              Related guide
            </p>
            <Link
              href={`/blog/${template.relatedBlogSlug}`}
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              {BLOG_LABELS[template.relatedBlogSlug] ?? "Read the guide"} →
            </Link>
          </Card>
        )}
      </div>

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>
          <Link href="/" className="hover:underline">Budget Rover</Link>{" "}·{" "}
          <Link href="/templates" className="hover:underline">Templates</Link>{" "}·{" "}
          <Link href="/blog" className="hover:underline">Blog</Link>{" "}
          · Data stays on your device · No account needed
        </p>
      </footer>
    </main>
  );
}
