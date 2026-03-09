import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { StoreProvider } from "@/components/common/StoreProvider";
import { ServiceWorkerRegistrar } from "@/components/common/ServiceWorkerRegistrar";
import { InstallPrompt } from "@/components/common/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: APP_NAME,
  url: siteUrl,
  description:
    "Plan your trip budget, split expenses with friends, and track spending. No login required. Works offline.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Offline support",
    "Expense splitting",
    "PDF export",
    "QR code sharing",
    "No account required",
  ],
  screenshot: {
    "@type": "ImageObject",
    url: `${siteUrl}/og`,
    width: 1200,
    height: 630,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${APP_NAME} — Vacation Budget Planner`,
    template: `%s — ${APP_NAME}`,
  },
  description:
    "Plan your trip budget, split expenses with friends, and track spending — no login required. Works offline.",
  keywords: [
    "vacation budget planner",
    "travel expense tracker",
    "trip cost splitter",
    "group travel budget",
    "offline budget app",
    "free travel planner",
    "expense tracker",
    "trip planner",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/icons/icon.svg", color: "#FF6B35" }],
  },
  openGraph: {
    title: `${APP_NAME} — Vacation Budget Planner`,
    description:
      "Track vacation spending, split expenses with friends, export PDF reports. 100% free, works offline, no account needed.",
    url: siteUrl,
    siteName: APP_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Free Vacation Budget Planner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Vacation Budget Planner`,
    description:
      "Track vacation spending, split expenses, export PDF reports. Free, offline, no login required.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF6B35",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[var(--background)] text-[var(--text-primary)]">
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoreProvider>
          <ServiceWorkerRegistrar />
          <InstallPrompt />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
