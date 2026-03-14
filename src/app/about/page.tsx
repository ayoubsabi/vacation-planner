import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "About",
  description:
    "Budget Rover is a free, offline-first vacation budget planner. No accounts, no tracking, no subscriptions — just simple trip budgeting that works anywhere.",
  openGraph: {
    title: "About Budget Rover",
    description:
      "Budget Rover is a free, offline-first vacation budget planner. No accounts, no tracking, no subscriptions.",
    type: "website",
    images: [
      {
        url: "/og?title=About+Budget+Rover",
        width: 1200,
        height: 630,
        alt: "About Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Budget Rover",
    description:
      "Budget Rover is a free, offline-first vacation budget planner. No accounts, no tracking, no subscriptions.",
    images: ["/og?title=About+Budget+Rover"],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "About Budget Rover",
      description:
        "Budget Rover is a free, offline-first vacation budget planner. No accounts, no tracking, no subscriptions — just simple trip budgeting that works anywhere.",
      url: `${siteUrl}/about`,
      publisher: { "@id": `${siteUrl}/#organization` },
      dateModified: "2026-03-14T00:00:00.000Z",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Budget Rover",
      url: siteUrl,
      description:
        "Budget Rover is a free, privacy-first vacation budget planner. No accounts, no subscriptions, works offline.",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
  ],
};

const values = [
  {
    icon: "🆓",
    title: "100% Free",
    description:
      "No subscriptions, no paywalls, no premium tiers. Every feature is available to everyone, forever.",
  },
  {
    icon: "📶",
    title: "Works Offline",
    description:
      "Plan your trip on a plane, in the mountains, or anywhere without reliable internet. Budget Rover works wherever you are.",
  },
  {
    icon: "🔒",
    title: "Privacy-First",
    description:
      "All your trip data is stored locally on your device using IndexedDB. We never see it, collect it, or transmit it.",
  },
  {
    icon: "🚀",
    title: "No Account Needed",
    description:
      "Open the app and start planning. No sign-up, no email, no password — just you and your budget.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About" },
        ]}
      />

      <PublicNav />

      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        {/* Hero */}
        <div className="mt-6 mb-8">
          <span className="inline-block bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            About Budget Rover
          </span>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            Travel smarter. Spend less. Stress less.
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Budget Rover is a free, offline-first travel budget planner built for real
            travelers. Whether you&apos;re backpacking solo or splitting costs with a group,
            it helps you track every dollar — without giving up your privacy.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mission */}
          <Card className="!p-6 sm:!p-8">
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Our Mission
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              Most travel apps want your email, your data, and eventually your credit card.
              We think that&apos;s backwards.
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover was built on a simple idea: a great budgeting tool should be
              free, fast, and work offline — without asking you to trust a server with your
              personal travel plans. Everything stays on your device, always.
            </p>
          </Card>

          {/* Values */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3 px-1">
              What we stand for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v) => (
                <Card key={v.title} className="!p-5">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {v.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Built with */}
          <Card className="!p-6 sm:!p-8 bg-[var(--background)]">
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              How it&apos;s built
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              Budget Rover is a Progressive Web App (PWA) built with modern open-source
              tools:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-[var(--text-primary)]">Next.js</strong> — fast,
                server-rendered React framework
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">IndexedDB</strong> — local
                browser storage for all trip data
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Recharts</strong> — visual
                spending charts
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Service Worker</strong> —
                offline support and instant load
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">jsPDF</strong> — PDF export
                of your trip summary
              </li>
            </ul>
          </Card>

          {/* CTA */}
          <div className="text-center pt-2">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Ready to plan your next adventure?
            </p>
            <Link
              href="/trip/new"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Start planning your trip →
            </Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </main>
  );
}
