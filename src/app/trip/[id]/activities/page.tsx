"use client";
import { use } from "react";
import { useTripStore } from "@/store/tripStore";
import { TripPlanView } from "@/components/trip/TripPlanView";
import { DestinationInfo } from "@/components/trip/DestinationInfo";
import { Header } from "@/components/common/Header";
import Link from "next/link";
import { Button } from "@/components/common/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ActivitiesPage({ params }: PageProps) {
  const { id } = use(params);
  const trip = useTripStore((s) => s.trips.find((t) => t.id === id));

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-[var(--text-secondary)]">Trip not found</p>
        <Link href="/"><Button>Go Home</Button></Link>
      </div>
    );
  }

  return (
    <>
      <Header title="Activities" backHref={`/trip/${id}`} />
      <div className="px-4 pt-3 pb-2">
        <DestinationInfo trip={trip} autoGenerate />
      </div>
      <TripPlanView trip={trip} autoGenerate />
    </>
  );
}
