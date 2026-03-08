"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useTripStore } from "@/store/tripStore";
import { Card } from "@/components/common/Card";
import { formatCurrency, formatDate, getTotalSpent, getBudgetPercentage, getBudgetStatus } from "@/lib/utils";
import { MapPin, ChevronRight } from "lucide-react";

export function TripsList() {
  const allTrips = useTripStore((s) => s.trips);
  const loaded = useTripStore((s) => s.loaded);
  const trips = useMemo(() => allTrips.filter((t) => !t.archived), [allTrips]);

  if (!loaded || trips.length === 0) return null;

  return (
    <section className="px-4 py-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Your Trips</h2>
      <div className="flex flex-col gap-3 animate-stagger">
        {trips.map((trip) => {
          const totalSpent = getTotalSpent(trip.expenses);
          const pct = getBudgetPercentage(totalSpent, trip.budget);
          const status = getBudgetStatus(pct);

          const barColors = {
            safe: "bg-[var(--success)]",
            warning: "bg-amber-400",
            danger: "bg-[var(--danger)]",
          };

          const statusColors = {
            safe: "text-[var(--success)]",
            warning: "text-amber-500",
            danger: "text-[var(--danger)]",
          };

          return (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <Card hoverable>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] truncate">{trip.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mt-0.5">
                      <MapPin size={11} className="text-[var(--primary)] opacity-70" />
                      <span>{trip.destination}</span>
                      <span className="text-[var(--border)]">·</span>
                      <span>{formatDate(trip.startDate, "MMM d")} – {formatDate(trip.endDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={`font-semibold mono ${statusColors[status]}`}>
                          {formatCurrency(totalSpent, trip.baseCurrency)}
                        </span>
                        <span className="text-[var(--text-secondary)] mono">
                          of {formatCurrency(trip.budget, trip.baseCurrency)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColors[status]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[var(--text-secondary)] mt-1 shrink-0" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
