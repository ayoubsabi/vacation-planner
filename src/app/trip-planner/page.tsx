import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Free Online Trip Planner — No Account Required",
  description:
    "Plan your next trip in minutes with Budget Rover's free trip planner. Set destinations, dates, traveler names, and a budget — no account required. Works offline.",
  alternates: {
    canonical: `${siteUrl}/trip-planner`,
  },
  openGraph: {
    title: "Free Online Trip Planner — Budget Rover",
    description:
      "Plan your next trip in minutes. Set destinations, dates, traveler names, and a budget — no account required. Works offline on any device.",
    url: `${siteUrl}/trip-planner`,
    type: "website",
    images: [
      {
        url: "/og?title=Free+Online+Trip+Planner",
        width: 1200,
        height: 630,
        alt: "Free Online Trip Planner — Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Trip Planner — Budget Rover",
    description:
      "Plan your next trip in minutes. Set destinations, dates, traveler names, and a budget — no account required.",
    images: ["/og?title=Free+Online+Trip+Planner"],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/trip-planner#webpage`,
  name: "Free Online Trip Planner",
  description:
    "Plan your next trip in minutes with Budget Rover's free trip planner. Set destinations, dates, traveler names, and a budget — no account required.",
  url: `${siteUrl}/trip-planner`,
  isPartOf: { "@id": `${siteUrl}/#webapp` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a trip planner do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A trip planner helps you organize all the key details of a trip before and during travel: your destination, dates, group of travelers, total budget, and individual expenses. Budget Rover's trip planner also tracks spending in real time, splits costs between travelers, and generates PDF reports.",
      },
    },
    {
      "@type": "Question",
      name: "Is Budget Rover's trip planner really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. There is no paid tier, no subscription, and no account required. You can create unlimited trips, add unlimited expenses, and use every feature — expense splitting, charts, PDF export, QR sharing — at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this trip planner without internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Budget Rover is a Progressive Web App. After your first visit, the entire app is cached to your device by a Service Worker. You can add expenses, view charts, and check balances with no internet connection — on a plane, in a remote location, or anywhere offline.",
      },
    },
    {
      "@type": "Question",
      name: "Does this trip planner work for group trips?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Add all travelers to your trip, log each shared expense with who paid and who it's split between, and Budget Rover automatically calculates the minimum number of payments needed to settle everyone's balance.",
      },
    },
    {
      "@type": "Question",
      name: "How is Budget Rover different from other online trip planners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Budget Rover is privacy-first: your data stays on your device and is never sent to a server. It works fully offline, requires no account, and is 100% free with no ads on the planning pages. The focus is on budget tracking and expense splitting, not booking flights or hotels.",
      },
    },
  ],
};

const steps = [
  {
    number: "1",
    title: "Create your trip",
    description:
      "Enter your destination, total budget, travel dates, and the names of everyone joining. Takes under a minute.",
  },
  {
    number: "2",
    title: "Log expenses as you go",
    description:
      "Add each expense as it happens — record who paid and which travelers it's split between. Works fully offline.",
  },
  {
    number: "3",
    title: "Track spending and settle up",
    description:
      "View pie charts, daily trends, and per-person breakdowns. The Expense Splitter calculates who owes whom with the fewest transfers. Export a PDF for the group.",
  },
];

const templates = [
  { slug: "paris-honeymoon", label: "Paris Honeymoon", destination: "Paris, France", travelers: 2, days: 7, budget: "$2,800" },
  { slug: "tokyo-group", label: "Tokyo Group Trip", destination: "Tokyo, Japan", travelers: 4, days: 10, budget: "$6,000" },
  { slug: "bali-backpacker", label: "Bali Backpacker", destination: "Bali, Indonesia", travelers: 1, days: 14, budget: "$980" },
  { slug: "cancun-family", label: "Cancun Family", destination: "Cancun, Mexico", travelers: 4, days: 7, budget: "$5,600" },
  { slug: "barcelona-couple", label: "Barcelona Couple", destination: "Barcelona, Spain", travelers: 2, days: 5, budget: "$2,200" },
  { slug: "prague-stag", label: "Prague Stag Do", destination: "Prague, Czech Republic", travelers: 8, days: 4, budget: "$4,800" },
];

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Trip Planner" },
        ]}
      />

      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#ff8a5b] to-[var(--accent)] text-white px-4 pt-10 sm:pt-16 pb-16 sm:pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-8 left-4 w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium mb-6">
            <span>✈️</span>
            <span>100% free — no login required</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Free Online Trip Planner
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto">
            Plan any trip in minutes — set your destination, budget, and travelers. Track expenses
            as you go, split costs fairly, and export a PDF report. All offline, no account needed.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-6 py-3 rounded-xl text-base hover:bg-white/90 transition-colors shadow-lg"
          >
            Start Planning for Free ✈️
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Trip Planner" },
          ]}
        />
      </div>

      {/* What is a trip planner */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          What does a trip planner do?
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A trip planner helps you organize the essentials before and during travel: your
          destination, dates, group of travelers, total budget, and the individual expenses you rack
          up along the way. A good one also handles the money side — tracking how much you&apos;ve
          spent vs. your budget, and making it easy to split costs between everyone in the group.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Budget Rover focuses on the budget and expense tracking side of trip planning. It&apos;s
          not for booking flights or hotels — it&apos;s for making sure you don&apos;t overspend
          once you&apos;re there, and that everyone pays their fair share.{" "}
          <Link href="/blog/how-to-budget-a-vacation" className="text-[var(--primary)] hover:underline font-medium">
            Learn how to build a realistic vacation budget →
          </Link>
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
            How to use Budget Rover as your trip planner
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10">
            Three steps, under two minutes to get started.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/trip/new"
              className="inline-block bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Create your first trip →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LANDING_1 ?? ""} format="horizontal" />
      </div>

      {/* Sample budgets */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Sample trip budgets to inspire your planning
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          Not sure where to start? Browse these ready-made trip budgets for popular destinations —
          each one shows realistic expense breakdowns you can use as a baseline.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {templates.map((t) => (
            <Link key={t.slug} href={`/templates/${t.slug}`}>
              <Card hoverable className="!p-4">
                <p className="font-bold text-[var(--text-primary)]">{t.label}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{t.destination}</p>
                <div className="flex items-center gap-3 mt-3 text-sm text-[var(--text-secondary)]">
                  <span>{t.travelers} {t.travelers === 1 ? "traveler" : "travelers"}</span>
                  <span>·</span>
                  <span>{t.days} days</span>
                  <span>·</span>
                  <span className="font-semibold text-[var(--text-primary)]">{t.budget}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          <Link href="/templates" className="text-[var(--primary)] hover:underline font-medium">
            Browse all trip templates →
          </Link>
          {" "}or start fresh with your own numbers.
        </p>
      </section>

      {/* Cross-link to vacation planner */}
      <section className="max-w-3xl mx-auto px-4 pb-6">
        <Card className="!p-5 bg-[var(--surface)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Looking for budget-focused planning?{" "}
            <Link href="/vacation-planner" className="text-[var(--primary)] hover:underline font-medium">
              See our vacation planner guide →
            </Link>{" "}
            for a deep dive into estimating costs, staying within budget, and analyzing spending
            after the trip.
          </p>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Trip Planner FAQ
        </h2>
        <div className="space-y-6">
          {faqJsonLd.mainEntity.map((item) => (
            <div key={item.name} className="border-b border-[var(--border)] pb-6 last:border-0">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-[var(--primary)] rounded-2xl p-8 text-white text-center">
          <p className="font-bold text-xl mb-2">Ready to plan your trip?</p>
          <p className="text-white/80 text-sm mb-6">
            Free, offline, no account needed. Create a trip in under two minutes.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Start planning for free →
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
