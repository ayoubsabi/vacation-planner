"use client";
import { use } from "react";
import { useTripStore } from "@/store/tripStore";
import { useUIStore } from "@/store/uiStore";
import { BudgetOverview } from "@/components/trip/BudgetOverview";
import { ExpenseList } from "@/components/trip/ExpenseList";
import { AddExpenseModal } from "@/components/trip/AddExpenseModal";
import { ShareModal } from "@/components/trip/ShareModal";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/common/Button";
import { Plus, Share2, FileDown } from "lucide-react";
import { exportTripToPDF } from "@/lib/export-pdf";
import { useState } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TripDashboard({ params }: PageProps) {
  const { id } = use(params);
  const trip = useTripStore((s) => s.getTrip(id));
  const { isAddExpenseOpen, isShareOpen, openAddExpense, closeAddExpense, openShare, closeShare } =
    useUIStore();
  const [exporting, setExporting] = useState(false);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
        <p className="text-4xl">🗺️</p>
        <h2 className="text-xl font-bold">Trip not found</h2>
        <p className="text-[var(--text-secondary)]">This trip may have been deleted or not loaded yet.</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  async function handleExportPDF() {
    if (!trip) return;
    setExporting(true);
    try {
      await exportTripToPDF(trip);
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <Header
        title={trip.name}
        backHref="/"
        actions={
          <div className="flex items-center gap-1">
            <button
              onClick={openShare}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Share trip"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors disabled:opacity-50"
              aria-label="Export PDF"
            >
              <FileDown size={18} />
            </button>
          </div>
        }
      />

      <BudgetOverview trip={trip} />

      {/* Add Expense FAB */}
      <div className="px-4 py-3">
        <Button onClick={() => openAddExpense()} className="w-full">
          <Plus size={18} />
          Add Expense
        </Button>
      </div>

      <ExpenseList trip={trip} />

      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={closeAddExpense}
        trip={trip}
      />

      <ShareModal isOpen={isShareOpen} onClose={closeShare} tripId={trip.id} />
    </>
  );
}
