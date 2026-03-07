"use client";
import { use } from "react";
import { useTripStore } from "@/store/tripStore";
import { ExpenseSplitter } from "@/components/trip/ExpenseSplitter";
import { Header } from "@/components/common/Header";
import Link from "next/link";
import { Button } from "@/components/common/Button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SplitPage({ params }: PageProps) {
  const { id } = use(params);
  const trip = useTripStore((s) => s.getTrip(id));

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
      <Header title="Expense Splitter" backHref={`/trip/${id}`} />
      <ExpenseSplitter trip={trip} />
    </>
  );
}
