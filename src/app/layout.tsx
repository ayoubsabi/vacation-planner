import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { StoreProvider } from "@/components/common/StoreProvider";
import { ServiceWorkerRegistrar } from "@/components/common/ServiceWorkerRegistrar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${APP_NAME} — Vacation Budget Planner`,
  description:
    "Plan your trip budget, split expenses with friends, and track spending — no login required.",
  keywords: ["vacation", "budget", "travel", "expense tracker", "trip planner"],
  openGraph: {
    title: `${APP_NAME} — Vacation Budget Planner`,
    description: "Track vacation spending, split expenses, export reports. Works offline.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF6B35",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[var(--background)] text-[var(--text-primary)]">
        <StoreProvider>
          <ServiceWorkerRegistrar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
