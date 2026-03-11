import type { Metadata } from "next";
import { TripWizard } from "@/components/trip/TripWizard";
import { Header } from "@/components/common/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Create New Trip",
  description:
    "Start planning your vacation in 3 easy steps. Set your destination, budget, and travelers — no account needed.",
  openGraph: {
    title: "Create a New Trip — Budget Rover",
    description:
      "Set up your vacation budget in minutes. Track expenses, split costs with friends, and export reports.",
    url: "/trip/new",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Budget Rover — Create New Trip" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a New Trip — Budget Rover",
    description:
      "Set up your vacation budget in minutes. Free, offline, no account required.",
  },
  alternates: {
    canonical: `${siteUrl}/trip/new`,
  },
};

export default function NewTripPage() {
  return (
    <>
      <Header title="New Trip" backHref="/" />
      <TripWizard />
    </>
  );
}
