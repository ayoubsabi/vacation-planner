// Server Component — metadata exports are recognized here.
// The client page (page.tsx) reads from IndexedDB so cannot export metadata itself.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Trip",
  description:
    "View a shared vacation budget. See expenses, spending breakdown, and trip summary — no account needed.",
  openGraph: {
    title: "Shared Vacation Budget — Budget Rover",
    description:
      "Someone shared their trip budget with you. View expenses, charts, and spending summary.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Budget Rover — Shared Trip Budget" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shared Vacation Budget — Budget Rover",
    description: "View a shared trip budget — expenses, charts, and spending summary. Free, no account needed.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
