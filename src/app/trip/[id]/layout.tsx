import type { Metadata } from "next";
import { BottomNavigation } from "@/components/trip/BottomNavigation";

// Trip data lives in IndexedDB (client-only) — cannot generate per-trip titles server-side.
// These pages are disallowed in robots.ts; robots meta reinforces that.
export const metadata: Metadata = {
  title: "Trip Dashboard",
  description: "Manage your vacation budget, track expenses, and split costs with your group.",
  robots: { index: false, follow: false },
};

interface TripLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function TripLayout({ children, params }: TripLayoutProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="pb-20">{children}</div>
      <BottomNavigation tripId={id} />
    </div>
  );
}
