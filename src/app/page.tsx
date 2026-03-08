import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TripsList } from "@/components/landing/TripsList";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { LandingJsonLd } from "@/components/landing/LandingJsonLd";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <LandingJsonLd />

      <nav className="flex items-center justify-between px-4 h-14 bg-white/80 backdrop-blur-sm border-b border-[var(--border)] sticky top-0 z-40">
        <span className="font-bold text-[var(--primary)] text-lg">{APP_NAME}</span>
        <div className="flex items-center gap-5">
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
            className="text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            + New Trip
          </Link>
        </div>
      </nav>

      <Hero />
      <TripsList />
      <Features />
      <HowItWorks />
      <UseCases />
      <FAQ />

      <footer className="border-t border-[var(--border)] py-10 px-4">
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8 text-sm">
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-3">Product</p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>
                <Link href="/trip/new" className="hover:text-[var(--text-primary)] hover:underline">
                  New Trip
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[var(--text-primary)] hover:underline">
                  Trip Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-3">Learn</p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>
                <Link href="/blog" className="hover:text-[var(--text-primary)] hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-budget-a-vacation"
                  className="hover:text-[var(--text-primary)] hover:underline"
                >
                  Vacation Budget Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/split-expenses-with-friends"
                  className="hover:text-[var(--text-primary)] hover:underline"
                >
                  Splitting Expenses
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-semibold text-[var(--text-primary)] mb-3">{APP_NAME}</p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Free vacation budget planner. Data stays on your device. No account needed.
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-[var(--text-secondary)]">
          Built with ❤️ for travelers · {APP_NAME}
        </p>
      </footer>
    </main>
  );
}
