import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Itinerary",
  robots: { index: false, follow: false },
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
