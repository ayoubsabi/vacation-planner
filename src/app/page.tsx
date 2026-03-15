import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TripsList } from "@/components/landing/TripsList";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { LandingJsonLd } from "@/components/landing/LandingJsonLd";
import { AdUnit } from "@/components/common/AdUnit";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Free Vacation & Trip Planner — Budget Tracker",
  description:
    "Budget Rover is a free vacation planner and trip budget tracker. Plan your travel budget, split expenses with friends, and track spending — no login required. Works offline.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Budget Rover — Free Vacation & Trip Planner",
    description:
      "Track vacation spending, split travel expenses with friends, export PDF reports. 100% free, works offline, no account needed.",
    url: siteUrl,
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <LandingJsonLd />
      <PublicNav />

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

      <PublicFooter />
    </main>
  );
}
