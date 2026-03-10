import type { Metadata } from "next";
import Link from "next/link";
import { TRIP_TEMPLATES } from "@/lib/templates";
import { getTotalSpent } from "@/lib/utils";
import { AdUnit } from "@/components/common/AdUnit";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Sample Trip Budget Templates",
  description:
    "Browse free trip budget templates for popular destinations. See realistic expense breakdowns for Paris, Tokyo, Bali, Cancun, Barcelona, and Prague.",
  openGraph: {
    title: "Sample Trip Budget Templates — Budget Rover",
    description:
      "Browse free trip budget templates for popular destinations. See realistic expense breakdowns for Paris, Tokyo, Bali, and more.",
    type: "website",
    images: [
      {
        url: "/og?title=Sample+Trip+Budget+Templates",
        width: 1200,
        height: 630,
        alt: "Sample Trip Budget Templates — Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Trip Budget Templates — Budget Rover",
    description:
      "Browse free trip budget templates for popular destinations. See realistic expense breakdowns for Paris, Tokyo, Bali, and more.",
    images: ["/og?title=Sample+Trip+Budget+Templates"],
  },
  alternates: {
    canonical: `${siteUrl}/templates`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sample Trip Budget Templates",
  description: "Realistic vacation budget examples for popular travel destinations.",
  url: `${siteUrl}/templates`,
  itemListElement: TRIP_TEMPLATES.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `${siteUrl}/templates/${t.slug}`,
  })),
};

const CATEGORY_COLORS: Record<string, string> = {
  accommodation: "bg-blue-100 text-blue-700",
  food: "bg-orange-100 text-orange-700",
  transport: "bg-purple-100 text-purple-700",
  activities: "bg-green-100 text-green-700",
  shopping: "bg-pink-100 text-pink-700",
  entertainment: "bg-yellow-100 text-yellow-700",
  other: "bg-gray-100 text-gray-600",
};

const CATEGORY_LABELS: Record<string, string> = {
  accommodation: "Accommodation",
  food: "Food & Drink",
  transport: "Transport",
  activities: "Activities",
  shopping: "Shopping",
  entertainment: "Entertainment",
  other: "Other",
};

const SLUG_EMOJIS: Record<string, string> = {
  "paris-honeymoon": "🗼",
  "bali-backpacker": "🌴",
  "tokyo-group": "⛩️",
  "cancun-family": "🏖️",
  "barcelona-weekend": "🏛️",
  "prague-stag": "🍺",
};

export default function TemplatesIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
          Sample Trip Budget Templates
        </h1>
        <p className="text-[var(--text-secondary)] mb-12">
          Not sure how much your next trip will cost? Browse these realistic sample budgets for
          popular destinations and use them as a starting point for your own planning.
        </p>

        <div className="mb-8">
          <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TEMPLATES ?? ""} format="horizontal" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TRIP_TEMPLATES.map((template) => {
            const totalSpent = getTotalSpent(template.trip.expenses);
            const travelers = template.trip.travelers.length;
            const days =
              Math.round(
                (new Date(template.trip.endDate).getTime() -
                  new Date(template.trip.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
              ) + 1;
            const perPerson = Math.round(totalSpent / travelers);

            const byCategory: Record<string, number> = {};
            for (const e of template.trip.expenses) {
              byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount;
            }
            const topCategories = Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3);

            const emoji = SLUG_EMOJIS[template.slug] ?? "✈️";

            return (
              <Link
                key={template.slug}
                href={`/templates/${template.slug}`}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className="text-2xl w-11 h-11 bg-[var(--surface)] rounded-xl flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {emoji}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-bold text-[var(--text-primary)] text-base leading-tight group-hover:text-[var(--primary)] transition-colors">
                      {template.title}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {template.trip.destination}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-4 mb-4 text-center">
                  <div className="flex-1 bg-[var(--surface)] rounded-xl py-2">
                    <p className="text-base font-bold text-[var(--primary)]">
                      ${totalSpent.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">total</p>
                  </div>
                  <div className="flex-1 bg-[var(--surface)] rounded-xl py-2">
                    <p className="text-base font-bold text-[var(--text-primary)]">
                      ${perPerson.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">per person</p>
                  </div>
                  <div className="flex-1 bg-[var(--surface)] rounded-xl py-2">
                    <p className="text-base font-bold text-[var(--text-primary)]">{days}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {days === 1 ? "day" : "days"}
                    </p>
                  </div>
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {topCategories.map(([cat]) => (
                    <span
                      key={cat}
                      className={`text-xs font-medium px-2 py-0.5 rounded-md ${CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {CATEGORY_LABELS[cat] ?? cat}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Ready to plan your own trip?</p>
          <p className="text-white/80 text-sm mb-4">
            Use a template as inspiration, then create your own budget — free, offline, no account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/trip/new"
              className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
            >
              Start planning →
            </Link>
            <Link
              href="/blog/how-to-budget-a-vacation"
              className="inline-block border border-white/40 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:border-white/70 transition-colors"
            >
              Read budgeting guide →
            </Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </main>
  );
}
