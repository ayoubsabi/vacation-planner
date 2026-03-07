import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TripsList } from "@/components/landing/TripsList";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <nav className="flex items-center justify-between px-4 h-14 bg-white/80 backdrop-blur-sm border-b border-[var(--border)] sticky top-0 z-40">
        <span className="font-bold text-[var(--primary)] text-lg">{APP_NAME}</span>
        <Link
          href="/trip/new"
          className="text-sm font-semibold text-[var(--primary)] hover:underline"
        >
          + New Trip
        </Link>
      </nav>

      <Hero />
      <TripsList />
      <Features />
      <HowItWorks />

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>Data stays on your device. No account needed. Built with ❤️ for travelers.</p>
      </footer>
    </main>
  );
}
