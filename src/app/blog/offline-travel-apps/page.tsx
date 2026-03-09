import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { AdUnit } from "@/components/common/AdUnit";

export const metadata: Metadata = {
  title: "Best Free Offline Travel Apps That Work Without Internet",
  description:
    "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
  openGraph: {
    title: "Best Free Offline Travel Apps That Work Without Internet",
    description:
      "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
    type: "article",
    publishedTime: "2026-02-05T00:00:00.000Z",
    authors: ["Budget Rover"],
    images: [
      {
        url: "/og?title=Best+Free+Offline+Travel+Apps+That+Work+Without+Internet",
        width: 1200,
        height: 630,
        alt: "Best Free Offline Travel Apps That Work Without Internet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Offline Travel Apps That Work Without Internet",
    description:
      "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
    images: ["/og?title=Best+Free+Offline+Travel+Apps+That+Work+Without+Internet"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Best Free Offline Travel Apps That Work Without Internet",
  description:
    "The best travel apps that work without Wi-Fi — offline maps, translation, and expense tracking you can rely on anywhere in the world.",
  author: { "@type": "Organization", name: "Budget Rover" },
  publisher: {
    "@type": "Organization",
    name: "Budget Rover",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com"}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
  },
  datePublished: "2026-02-05T00:00:00.000Z",
  dateModified: "2026-02-05T00:00:00.000Z",
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com"}/blog/offline-travel-apps`,
  image: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com"}/og?title=Best+Free+Offline+Travel+Apps+That+Work+Without+Internet`,
    width: 1200,
    height: 630,
  },
};

export default function OfflineTravelAppsArticle() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center gap-3 px-6 h-14 max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors -ml-2"
            aria-label="Back to blog"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <p className="flex-1 font-bold text-[var(--text-primary)] truncate">
            Best Offline Travel Apps
          </p>
          <Link
            href="/trip/new"
            className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            New Trip
          </Link>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "Offline Travel Apps" },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Offline Travel Apps" },
          ]}
        />

        <time className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
          February 5, 2026
        </time>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-2 mb-6 leading-tight">
          Best Free Offline Travel Apps That Work Without Internet
        </h1>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Roaming data charges can be eye-watering, and Wi-Fi in remote destinations is
          unpredictable at best. A solid set of offline travel apps means you can navigate, communicate,
          and track your spending without needing a signal. Here are the categories that matter most
          — and the apps that actually deliver offline.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Why You Need Offline Travel Apps
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Even if you have an international data plan, connectivity drops at the worst moments —
          mountain passes, rural islands, underground metros, remote temples. Apps that rely entirely
          on a live internet connection are useless when you need them most.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Offline-capable apps download what they need in advance, so they work from local storage.
          No signal required during use — only for the initial download and occasional syncing.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Offline Maps</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Maps.me</strong> and{" "}
          <strong className="text-[var(--text-primary)]">OsmAnd</strong> (both free) let you
          download entire countries for offline use. Search for places, navigate turn-by-turn, and
          find points of interest without a data connection. Google Maps also offers offline map
          downloads, though the feature is more limited outside major cities.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Download your destination region before you fly. A country like Japan or Spain is
          typically 500MB-1GB — well worth the storage for a 2-week trip.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Offline Translation</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Google Translate</strong> supports offline
          language packs for text translation, and even camera translation (point your phone at a
          menu or sign) works offline if you download the relevant language pack in advance.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Download your destination&apos;s language pack before departure. Japanese, Thai, and
          Arabic packs are particularly useful given how different the scripts are from Latin
          alphabets.
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? ""} format="auto" className="my-6" />

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Offline Budget Tracking — Budget Rover
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          Most expense tracking apps sync to a cloud server — which means they need internet to
          function and your financial data lives on someone else&apos;s server.{" "}
          <strong className="text-[var(--text-primary)]">Budget Rover</strong> is different: it&apos;s
          a fully offline-first Progressive Web App (PWA) that stores everything on your device.
          No account. No cloud. No signal required after the first load.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          How Budget Rover Works Offline
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          When you first open Budget Rover, a{" "}
          <strong className="text-[var(--text-primary)]">Service Worker</strong> caches the entire
          app shell — all the JavaScript, CSS, and UI components — to your device. From that point
          on, the app loads instantly from the cache, even with no internet.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          All your trip data — expenses, travelers, budgets — is stored in{" "}
          <strong className="text-[var(--text-primary)]">IndexedDB</strong>, the browser&apos;s
          built-in local database. It&apos;s far more capable than cookies or localStorage, and your
          data never leaves your device unless you explicitly share it. You can add expenses, view
          charts, and check who owes whom in a Tokyo subway, a Bali rice terrace, or an Icelandic
          highland with no bars of signal.
        </p>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Installing Budget Rover as a PWA
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          On Android (Chrome), tap the three-dot menu and select &quot;Add to Home Screen.&quot; On
          iOS (Safari), tap the share icon and select &quot;Add to Home Screen.&quot; Budget Rover
          then works like a native app — full screen, no browser chrome, instant launch.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          This is ideal for a{" "}
          <Link
            href="/templates/bali-backpacker"
            className="text-[var(--primary)] hover:underline"
          >
            backpacking trip to Bali
          </Link>{" "}
          or any destination where data costs are high and connectivity is patchy.
        </p>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          A Complete Offline Travel Tech Stack
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Here&apos;s the complete setup to travel fully offline-ready:
        </p>
        <Card className="mb-8">
          <ul className="space-y-3 text-sm">
            {[
              { label: "Maps", detail: "Maps.me or OsmAnd (download country before flying)" },
              { label: "Translation", detail: "Google Translate with offline language packs" },
              { label: "Budget tracking", detail: "Budget Rover PWA (install to home screen)" },
              { label: "Boarding passes", detail: "Download to Apple Wallet or Google Wallet before airport" },
              { label: "Guides", detail: "Save Lonely Planet or Wikivoyage pages to your browser's reading list" },
            ].map(({ label, detail }) => (
              <li key={label} className="flex gap-2">
                <span className="text-[var(--primary)] font-semibold shrink-0">{label}</span>
                <span className="text-[var(--text-secondary)]">— {detail}</span>
              </li>
            ))}
          </ul>
        </Card>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
          Need help planning how much to budget for your next trip? Read our{" "}
          <Link
            href="/blog/how-to-budget-a-vacation"
            className="text-[var(--primary)] hover:underline"
          >
            step-by-step vacation budgeting guide
          </Link>
          .
        </p>

        <div className="bg-[var(--primary)] rounded-2xl p-6 text-white text-center">
          <p className="font-semibold text-lg mb-1">Track your trip spending — offline</p>
          <p className="text-white/80 text-sm mb-4">
            Budget Rover works anywhere, even without internet. Free, no account, no app store.
          </p>
          <Link
            href="/trip/new"
            className="inline-block bg-white text-[var(--primary)] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
          >
            Start planning for free →
          </Link>
        </div>
      </article>

      <footer className="text-center py-8 text-sm text-[var(--text-secondary)] border-t border-[var(--border)]">
        <p>
          <Link href="/" className="hover:underline">
            Budget Rover
          </Link>{" "}
          ·{" "}
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          ·{" "}
          <Link href="/templates" className="hover:underline">
            Templates
          </Link>
        </p>
      </footer>
    </main>
  );
}
