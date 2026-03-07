"use client";
import { useState } from "react";
import { Trip } from "@/lib/types";
import { useExpenses } from "@/hooks/useExpenses";
import { useTripStore } from "@/store/tripStore";
import { useUIStore } from "@/store/uiStore";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

type SortKey = "date" | "amount" | "category";

interface ExpenseListProps {
  trip: Trip;
}

export function ExpenseList({ trip }: ExpenseListProps) {
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const removeExpense = useTripStore((s) => s.removeExpense);
  const openAddExpense = useUIStore((s) => s.openAddExpense);
  const sortedExpenses = useExpenses(trip.expenses, sortBy);

  async function handleDelete(expenseId: string) {
    await removeExpense(trip.id, expenseId);
    setConfirmDelete(null);
  }

  if (trip.expenses.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-4xl mb-3">💸</p>
        <p className="font-semibold text-[var(--text-primary)] mb-1">No expenses yet</p>
        <p className="text-sm text-[var(--text-secondary)]">
          Tap &ldquo;+ Add Expense&rdquo; to start tracking
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4">
      {/* Sort controls */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-[var(--text-secondary)] mr-1">Sort:</span>
        {(["date", "amount", "category"] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              sortBy === key
                ? "bg-[var(--primary)] text-white"
                : "bg-slate-100 text-[var(--text-secondary)] hover:bg-slate-200"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 animate-stagger">
        {sortedExpenses.map((expense) => {
          const cat = EXPENSE_CATEGORIES.find((c) => c.value === expense.category);
          const paidByTraveler = trip.travelers.find((t) => t.id === expense.paidBy);
          const color = CATEGORY_COLORS[expense.category];

          return (
            <div
              key={expense.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-start"
            >
              {/* Category icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${color}20`, color }}
              >
                <CategoryIcon category={expense.category} size={20} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[var(--text-primary)] text-sm truncate">
                    {expense.description}
                  </p>
                  <p className="font-bold text-[var(--text-primary)] mono shrink-0">
                    {formatCurrency(expense.amount, expense.currency)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[var(--text-secondary)]">
                  <span
                    className="px-1.5 py-0.5 rounded text-white text-xs font-medium"
                    style={{ backgroundColor: color }}
                  >
                    {cat?.label}
                  </span>
                  <span>{formatDate(expense.date, "MMM d")}</span>
                  <span>Paid by {paidByTraveler?.name ?? "Unknown"}</span>
                  {expense.splitBetween.length > 1 && (
                    <span>Split {expense.splitBetween.length} ways</span>
                  )}
                </div>
                {expense.notes && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1 italic">
                    {expense.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => openAddExpense(expense.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[var(--secondary)] hover:bg-blue-50 transition-colors"
                  aria-label="Edit expense"
                >
                  <Pencil size={14} />
                </button>
                {confirmDelete === expense.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 text-xs bg-slate-200 rounded-lg"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(expense.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[var(--danger)] hover:bg-red-50 transition-colors"
                    aria-label="Delete expense"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
