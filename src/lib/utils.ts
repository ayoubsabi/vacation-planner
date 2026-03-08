import { format, differenceInDays, parseISO, isValid } from "date-fns";
import { Expense, Trip } from "./types";
import { CURRENCIES } from "./constants";

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatCurrency(amount: number, currencyCode: string = "USD"): string {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  const symbol = currency?.symbol ?? currencyCode;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted}${symbol}`;
}

export function formatDate(dateString: string, fmt: string = "MMM d, yyyy"): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return format(date, fmt);
  } catch {
    return dateString;
  }
}

export function getTripDuration(startDate: string, endDate: string): number {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const diff = differenceInDays(end, start);
  return Math.max(1, diff);
}

export function getDaysRemaining(endDate: string): number {
  const end = parseISO(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = differenceInDays(end, today);
  return diff;
}

export function getTotalSpent(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getDailyBurnRate(expenses: Expense[], startDate: string): number {
  if (expenses.length === 0) return 0;
  const start = parseISO(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.max(1, differenceInDays(today, start) + 1);
  return getTotalSpent(expenses) / days;
}

export function getBudgetPercentage(spent: number, budget: number): number {
  if (budget === 0) return 0;
  return Math.min(100, (spent / budget) * 100);
}

export function getBudgetStatus(percentage: number): "safe" | "warning" | "danger" {
  if (percentage <= 60) return "safe";
  if (percentage <= 90) return "warning";
  return "danger";
}

export function getDailyBudget(budget: number, startDate: string, endDate: string): number {
  const days = getTripDuration(startDate, endDate);
  return budget / days;
}

export function isoDateToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getSpendingByCategory(expenses: Expense[]): Record<string, number> {
  return expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function getSpendingByPerson(expenses: Expense[]): Record<string, number> {
  return expenses.reduce(
    (acc, expense) => {
      acc[expense.paidBy] = (acc[expense.paidBy] ?? 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function getDailySpending(expenses: Expense[], startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const days = differenceInDays(end, start) + 1;

  const result = [];
  let cumulative = 0;

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];

    const dayTotal = expenses
      .filter((e) => e.date === dateStr)
      .reduce((sum, e) => sum + e.amount, 0);

    cumulative += dayTotal;
    result.push({ date: formatDate(dateStr, "MMM d"), cumulative, daily: dayTotal });
  }

  return result;
}

export function duplicateTrip(trip: Trip): Trip {
  const now = new Date().toISOString();
  return {
    ...trip,
    id: generateId(),
    name: `${trip.name} (Copy)`,
    expenses: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
