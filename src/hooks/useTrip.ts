"use client";
import { useTripStore } from "@/store/tripStore";
import {
  getTotalSpent,
  getBudgetPercentage,
  getBudgetStatus,
  getDailyBurnRate,
  getDaysRemaining,
} from "@/lib/utils";

export function useTrip(tripId: string) {
  const trip = useTripStore((s) => s.getTrip(tripId));

  if (!trip) return { trip: null };

  const totalSpent = getTotalSpent(trip.expenses);
  const percentage = getBudgetPercentage(totalSpent, trip.budget);
  const status = getBudgetStatus(percentage);
  const dailyBurn = getDailyBurnRate(trip.expenses, trip.startDate);
  const daysRemaining = getDaysRemaining(trip.endDate);
  const remaining = trip.budget - totalSpent;

  return { trip, totalSpent, percentage, status, dailyBurn, daysRemaining, remaining };
}
