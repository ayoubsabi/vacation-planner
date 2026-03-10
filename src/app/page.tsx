import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TripsList } from "@/components/landing/TripsList";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { LandingJsonLd } from "@/components/landing/LandingJsonLd";
import { AdUnit } from "@/components/common/AdUnit";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Free Vacation Budget Planner",
  description:
    "Plan your trip budget, split expenses with friends, and track spending — no login required. Works offline on any device.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Budget Rover — Free Vacation Budget Planner",
    description:
      "Track vacation spending, split expenses with friends, export PDF reports. 100% free, works offline, no account needed.",
    url: siteUrl,
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <LandingJsonLd />

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-6 h-14 max-w-5xl mx-auto">
          <Link href="/" className="font-bold text-[var(--primary)] text-base tracking-tight">
            {APP_NAME}
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline"
            >
              Blog
            </Link>
            <Link
              href="/templates"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline"
            >
              Templates
            </Link>
            <Link
              href="/trip/new"
              className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              New Trip
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <TripsList />
      <div className="max-w-5xl mx-auto px-4 py-2">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LANDING_1 ?? ""} format="horizontal" />
      </div>
      <Features />
      <HowItWorks />
      <div className="max-w-5xl mx-auto px-4 py-2">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LANDING_2 ?? ""} format="horizontal" />
      </div>
      <UseCases />
      <FAQ />

      <footer className="border-t border-[var(--border)] py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Link href="/" className="font-bold text-[var(--primary)] text-sm">
                {APP_NAME}
              </Link>
              <span>·</span>
              <span>Free</span>
              <span>·</span>
              <span>Offline</span>
              <span>·</span>
              <span>No account needed</span>
            </div>
            <nav className="flex items-center gap-5 text-xs text-[var(--text-secondary)]">
              <Link href="/trip/new" className="hover:text-[var(--text-primary)] transition-colors">
                New Trip
              </Link>
              <Link href="/templates" className="hover:text-[var(--text-primary)] transition-colors">
                Templates
              </Link>
              <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">
                Blog
              </Link>
              <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
                Privacy
              </Link>
              <Link href="/tos" className="hover:text-[var(--text-primary)] transition-colors">
                Terms
              </Link>
            </nav>
          </div>
          <div className="border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--text-secondary)]">
            Data stays on your device · Made with ❤️ by travelers for travelers.
          </div>
        </div>
      </footer>
    </main>
  );
}
