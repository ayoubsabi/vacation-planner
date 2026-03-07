"use client";
import { useMemo } from "react";
import { Expense } from "@/lib/types";

type SortKey = "date" | "amount" | "category";

export function useExpenses(expenses: Expense[], sortBy: SortKey = "date") {
  return useMemo(() => {
    return [...expenses].sort((a, b) => {
      if (sortBy === "date") return b.date.localeCompare(a.date);
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });
  }, [expenses, sortBy]);
}
