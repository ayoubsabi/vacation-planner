"use client";
import { use, useEffect, useState } from "react";
import { useTripStore } from "@/store/tripStore";
import { BudgetOverview } from "@/components/trip/BudgetOverview";
import { ExpenseList } from "@/components/trip/ExpenseList";
import { Charts } from "@/components/trip/Charts";
import { Header } from "@/components/common/Header";
import { Trip } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/common/Button";

interface PageProps {
  params: Promise<{ tripId: string }>;
}

export default function SharePage({ params }: PageProps) {
  const { tripId } = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [tab, setTab] = useState<"overview" | "charts">("overview");
  const getTrip = useTripStore((s) => s.getTrip);
  const loaded = useTripStore((s) => s.loaded);

  useEffect(() => {
    if (loaded) {
      const found = getTrip(tripId);
      setTrip(found ?? null);
    }
  }, [loaded, tripId, getTrip]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
        <p className="text-4xl">🔗</p>
        <h2 className="text-xl font-bold">Trip not found</h2>
        <p className="text-[var(--text-secondary)]">
          This trip isn&apos;t on your device. Ask the trip owner to share the data with you.
        </p>
        <Link href="/"><Button>Create Your Own Trip</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title={trip.name} backHref="/" />

      <div className="flex border-b border-[var(--border)] bg-white px-4">
        {(["overview", "charts"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-secondary)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <>
          <BudgetOverview trip={trip} />
          <div className="px-4 py-2">
            <p className="text-xs text-[var(--text-secondary)] text-center bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
              📖 View-only — add expenses from the original device
            </p>
          </div>
          <ExpenseList trip={trip} />
        </>
      ) : (
        <Charts trip={trip} />
      )}
    </div>
  );
}
