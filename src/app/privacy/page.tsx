import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { APP_NAME } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Budget Rover stores all trip data locally on your device. No accounts, no servers, no tracking. Learn exactly what data is used and how.",
  openGraph: {
    title: "Privacy Policy — Budget Rover",
    description:
      "Budget Rover stores all trip data locally on your device. No accounts, no servers, no tracking.",
    type: "website",
    images: [
      {
        url: "/og?title=Privacy+Policy+%E2%80%94+Budget+Rover",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Budget Rover",
    description:
      "Budget Rover stores all trip data locally on your device. No accounts, no servers, no tracking.",
    images: ["/og?title=Privacy+Policy+%E2%80%94+Budget+Rover"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description:
    "Budget Rover stores all trip data locally on your device. No accounts, no servers, no personal data collected.",
  url: `${siteUrl}/privacy`,
  publisher: {
    "@type": "Organization",
    name: "Budget Rover",
    url: siteUrl,
  },
  dateModified: "2026-03-09T00:00:00.000Z",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy" },
        ]}
      />

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-6 h-14 max-w-3xl mx-auto">
          <Link href="/" className="font-bold text-[var(--primary)] text-base tracking-tight">
            {APP_NAME}
          </Link>
          <Link
            href="/trip/new"
            className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            New Trip
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        />

        <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-1">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Last updated: March 9, 2026
        </p>

        <Card className="space-y-8 !p-6 sm:!p-8">
          {/* Overview */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Overview
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover is a privacy-first travel budget planner. There are no accounts,
              no sign-in, and no server-side storage. Everything you enter stays on your
              device — we cannot see it, access it, or share it.
            </p>
          </section>

          {/* Data you enter */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Data You Enter
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              When you create a trip, Budget Rover saves the following data{" "}
              <strong>locally in your browser</strong> using IndexedDB and localStorage:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc list-inside">
              <li>Trip names, destinations, dates, and budgets</li>
              <li>Expense amounts, categories, descriptions, and dates</li>
              <li>Traveler names (for expense splitting)</li>
              <li>App settings (currency, date format, theme)</li>
            </ul>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
              This data never leaves your device unless you explicitly export it (via
              Settings → Export Data) or use the share link feature, which transmits only
              the data you choose to share.
            </p>
          </section>

          {/* Data we do not collect */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Data We Do Not Collect
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              Budget Rover does not collect, store, or transmit:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc list-inside">
              <li>Your name, email address, or any contact information</li>
              <li>Payment or financial account details</li>
              <li>Device location or GPS data</li>
              <li>Usage analytics or behavioral tracking</li>
              <li>IP addresses or device identifiers on our end</li>
            </ul>
          </section>

          {/* Google AdSense */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Advertising (Google AdSense)
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover displays ads served by Google AdSense on some pages. Google may
              use cookies and similar technologies to show you relevant ads based on your
              browsing activity across sites. This is managed by Google, not by Budget
              Rover. You can learn more or opt out via{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                Google's advertising privacy page
              </a>
              . Trip data pages (e.g., <code className="text-xs bg-[var(--surface)] px-1 py-0.5 rounded">/trip/…</code>) do not show ads.
            </p>
          </section>

          {/* Service Worker */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Service Worker &amp; Offline Cache
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover registers a service worker so the app works offline. The service
              worker caches app files (HTML, CSS, JS, icons) on your device — it does not
              cache or transmit any trip data you enter.
            </p>
          </section>

          {/* Export & deletion */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Your Data, Your Control
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              You have full control over your data at all times:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc list-inside mt-3">
              <li>
                <strong>Export</strong> — download a JSON backup of all your trips via
                Settings → Export Data
              </li>
              <li>
                <strong>Import</strong> — restore data from a previous export
              </li>
              <li>
                <strong>Delete a trip</strong> — removes it immediately from local storage
              </li>
              <li>
                <strong>Delete all data</strong> — Settings → Clear All Data wipes
                everything
              </li>
              <li>
                <strong>Uninstall / clear browser data</strong> — removes all stored data
                from your device
              </li>
            </ul>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Changes to This Policy
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              If this policy changes in a meaningful way (e.g., if we ever introduce
              analytics or account features), we will update the date above and note the
              change prominently. Since no personal data is stored server-side, no
              retroactive data changes are possible.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              Questions
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover is a free, independently built tool. If you have questions about
              this policy or the app's data practices, you can open an issue or discussion
              on the project&apos;s GitHub repository.
            </p>
          </section>
        </Card>
      </div>

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>
          <Link href="/" className="hover:underline">
            {APP_NAME}
          </Link>{" "}
          · Data stays on your device · No account needed
        </p>
      </footer>
    </main>
  );
}
