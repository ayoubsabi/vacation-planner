"use client";
import { Trip } from "@/lib/types";
import {
  getTotalSpent,
  getBudgetPercentage,
  getBudgetStatus,
  getDaysRemaining,
  getDailyBurnRate,
  formatCurrency,
  formatDate,
} from "@/lib/utils";
import { Card } from "@/components/common/Card";
import { CalendarDays, TrendingUp, Wallet } from "lucide-react";

interface BudgetOverviewProps {
  trip: Trip;
}

export function BudgetOverview({ trip }: BudgetOverviewProps) {
  const totalSpent = getTotalSpent(trip.expenses);
  const percentage = getBudgetPercentage(totalSpent, trip.budget);
  const status = getBudgetStatus(percentage);
  const daysRemaining = getDaysRemaining(trip.endDate);
  const dailyBurn = getDailyBurnRate(trip.expenses, trip.startDate);
  const remaining = trip.budget - totalSpent;

  const statusColors = {
    safe: "text-[var(--success)]",
    warning: "text-amber-500",
    danger: "text-[var(--danger)]",
  };

  const barColors = {
    safe: "bg-[var(--success)]",
    warning: "bg-amber-400",
    danger: "bg-[var(--danger)]",
  };

  return (
    <div className="px-4 pt-4 pb-2 space-y-4 animate-fade-in">
      {/* Trip header */}
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)] truncate">{trip.name}</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          📍 {trip.destination} · {formatDate(trip.startDate, "MMM d")} – {formatDate(trip.endDate, "MMM d, yyyy")}
        </p>
      </div>

      {/* Budget card */}
      <Card>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-0.5">Total Spent</p>
            <p className={`text-3xl font-bold mono animate-count-up ${statusColors[status]}`}>
              {formatCurrency(totalSpent, trip.baseCurrency)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-secondary)] mb-0.5">Budget</p>
            <p className="text-lg font-semibold text-[var(--text-primary)] mono">
              {formatCurrency(trip.budget, trip.baseCurrency)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full animate-bar-fill transition-all duration-700 ${barColors[status]}`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={Math.round(percentage)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
            <span>{Math.round(percentage)}% spent</span>
            <span className={remaining < 0 ? "text-[var(--danger)] font-semibold" : ""}>
              {remaining >= 0 ? `${formatCurrency(remaining, trip.baseCurrency)} left` : `${formatCurrency(Math.abs(remaining), trip.baseCurrency)} over budget`}
            </span>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center !py-3">
          <CalendarDays size={18} className="text-[var(--secondary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {daysRemaining > 0 ? daysRemaining : 0}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">days left</p>
        </Card>

        <Card className="text-center !py-3">
          <TrendingUp size={18} className="text-[var(--primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)] mono">
            {formatCurrency(dailyBurn, trip.baseCurrency).replace(".00", "")}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">per day</p>
        </Card>

        <Card className="text-center !py-3">
          <Wallet size={18} className="text-[var(--success)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {trip.expenses.length}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">expenses</p>
        </Card>
      </div>
    </div>
  );
}
