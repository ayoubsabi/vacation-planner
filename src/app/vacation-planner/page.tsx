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
  title: "Free Vacation Planner & Budget Tracker — No Account Needed",
  description:
    "Budget Rover is a free vacation planner that helps you estimate costs, track spending, and split expenses with travel companions. Works offline, no login required.",
  alternates: {
    canonical: `${siteUrl}/vacation-planner`,
  },
  openGraph: {
    title: "Free Vacation Planner & Budget Tracker — Budget Rover",
    description:
      "Estimate costs, track spending, and split vacation expenses with friends. 100% free, works offline, no account needed.",
    url: `${siteUrl}/vacation-planner`,
    type: "website",
    images: [
      {
        url: "/og?title=Free+Vacation+Planner+%26+Budget+Tracker",
        width: 1200,
        height: 630,
        alt: "Free Vacation Planner & Budget Tracker — Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Vacation Planner & Budget Tracker — Budget Rover",
    description:
      "Estimate costs, track spending, and split vacation expenses with friends. Free, offline, no account required.",
    images: ["/og?title=Free+Vacation+Planner+%26+Budget+Tracker"],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/vacation-planner#webpage`,
  name: "Free Vacation Planner & Budget Tracker",
  description:
    "Budget Rover is a free vacation planner that helps you estimate costs, track spending, and split expenses with travel companions.",
  url: `${siteUrl}/vacation-planner`,
  isPartOf: { "@id": `${siteUrl}/#webapp` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a vacation planner include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good vacation planner should help you estimate your total budget before the trip (flights, accommodation, food, activities), track actual spending during the trip, split shared costs between travelers, and generate a summary at the end. Budget Rover covers all of these in one free app.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a vacation budget plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by listing your fixed costs (flights, accommodation) and getting real quotes. Then estimate daily variable spending per category (food, transport, activities, shopping). Add a 10–20% buffer for unexpected costs. In Budget Rover, you enter this as a total budget when creating a trip, then log actuals as you go.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free vacation planner app that works offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Budget Rover is a free Progressive Web App (PWA) that works fully offline. After your first visit, the entire app is cached to your device. You can add expenses, view charts, and check balances anywhere — on a plane, in a remote area, or without Wi-Fi.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a vacation planner for group trips?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Budget Rover is built for both solo and group vacation planning. Add all travelers, log shared expenses with who paid, and the app calculates who owes whom using a debt-minimization algorithm — so the whole group settles up with the fewest possible payments.",
      },
    },
    {
      "@type": "Question",
      name: "Does Budget Rover store my vacation data on a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All your vacation data is stored exclusively on your device using IndexedDB in your browser. Nothing is ever sent to a server. You can export your trip as a PDF or share a read-only link, but the source data stays on your device.",
      },
    },
  ],
};

const useCases = [
  { icon: "💑", title: "Couples", description: "Track shared costs and split them fairly without the awkward money conversation." },
  { icon: "👥", title: "Friend groups", description: "Log who paid for what and settle debts with the fewest transfers." },
  { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Keep the whole family trip within budget across every expense category." },
  { icon: "🎒", title: "Solo travelers", description: "Set a daily budget and see exactly how your spending compares to your plan." },
  { icon: "🎉", title: "Celebrations", description: "Bachelor/bachelorette, birthdays, or anniversaries — track every shared expense." },
  { icon: "🌍", title: "Long-term travel", description: "Track monthly spending across multiple countries and currencies." },
];

export default function VacationPlannerPage() {
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
          { name: "Vacation Planner" },
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
            <span>🏖️</span>
            <span>Free vacation budget tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Free Vacation Planner &amp; Budget Tracker
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto">
            Estimate your vacation costs before you book, track every expense as you travel, and
            split the bill fairly with your group. All offline, no account needed.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-6 py-3 rounded-xl text-base hover:bg-white/90 transition-colors shadow-lg"
          >
            Plan Your Vacation for Free 🏖️
          </Link>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Vacation Planner" },
          ]}
        />
      </div>

      {/* Budget before you travel */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          Plan your vacation budget before you book
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          The most common vacation mistake is starting to spend before you&apos;ve set a total
          budget. By the time you realize you&apos;ve overspent on accommodation, there&apos;s
          nothing left for activities or shopping. A vacation planner fixes this by forcing you to
          think about the whole trip upfront.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="!p-4">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Fixed costs first</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Get real quotes for flights and accommodation before estimating anything else. These
              set the floor for your total budget.
            </p>
          </Card>
          <Card className="!p-4">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Daily spending estimate</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Research daily costs at your destination — food, local transport, activities — and
              multiply by the number of days.
            </p>
          </Card>
          <Card className="!p-4">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Add a 10–20% buffer</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Every trip has unexpected costs. A buffer means you&apos;re covered — and anything
              left over is a bonus at the end.
            </p>
          </Card>
          <Card className="!p-4">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Set it in Budget Rover</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Enter your total budget when you create a trip, then track actuals against it in real
              time throughout your vacation.
            </p>
          </Card>
        </div>
        <Link href="/blog/how-to-budget-a-vacation" className="text-[var(--primary)] hover:underline font-medium text-sm">
          Read the full vacation budgeting guide →
        </Link>
      </section>

      {/* Track during your vacation */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Track spending during your vacation
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            A vacation budget you set and never look at again is just wishful thinking. Budget
            Rover&apos;s dashboard shows you — in real time — how much you&apos;ve spent versus
            your total budget, broken down by category and by day. When you&apos;re trending over
            in restaurants, you know to cut back before you&apos;ve blown the budget entirely.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📊</div>
              <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">Spending charts</p>
              <p className="text-xs text-[var(--text-secondary)]">Pie and line charts by category and day</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">💸</div>
              <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">Per-person view</p>
              <p className="text-xs text-[var(--text-secondary)]">See each traveler&apos;s share of total spending</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📄</div>
              <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">PDF export</p>
              <p className="text-xs text-[var(--text-secondary)]">One-click expense report for the whole group</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/trip/new"
              className="inline-block bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Start tracking your vacation →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LANDING_1 ?? ""} format="horizontal" />
      </div>

      {/* Use cases */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Vacation planning for every trip type
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          Whether you&apos;re planning a romantic getaway or a large group adventure, Budget Rover
          adapts to how you travel.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {useCases.map((uc) => (
            <Card key={uc.title} className="!p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{uc.icon}</span>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{uc.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{uc.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Browse{" "}
          <Link href="/templates" className="text-[var(--primary)] hover:underline font-medium">
            sample vacation budgets →
          </Link>{" "}
          for Paris, Tokyo, Bali, Cancun, Barcelona, and Prague to get a sense of realistic costs.
        </p>
      </section>

      {/* Why Budget Rover */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Why use Budget Rover as your vacation planner?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            Most vacation planner apps require you to create an account and store your data on their
            servers. Budget Rover takes a different approach: your data stays on your device, in
            your browser&apos;s local storage. Nothing is ever uploaded to a server or shared with
            a third party.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">100% free, forever</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">No paid tier, no subscription, no hidden fees</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">No account required</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">No email, no sign-up, no password to remember</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">Works fully offline</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">On planes, in remote areas, anywhere without internet</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">Data stays on your device</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Your vacation data is never sent to a server</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">Group expense splitting</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Debt-minimization algorithm settles balances fairly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl shrink-0">✓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">PDF & QR sharing</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Export reports or share a read-only view with your group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to trip planner */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <Card className="!p-5 bg-[var(--surface)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Prefer a step-by-step planning workflow?{" "}
            <Link href="/trip-planner" className="text-[var(--primary)] hover:underline font-medium">
              See our trip planner guide →
            </Link>{" "}
            for how to set up a trip from scratch, choose destinations, and get started in minutes.
          </p>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Vacation Planner FAQ
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
          <p className="font-bold text-xl mb-2">Ready to plan your vacation?</p>
          <p className="text-white/80 text-sm mb-6">
            Free, offline, no account needed. Set your budget and start tracking in under two minutes.
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
