"use client";
import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid,
  BarChart, Bar, Legend,
} from "recharts";
import { Trip } from "@/lib/types";
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";
import { getSpendingByCategory, getDailySpending, getSpendingByPerson, getTotalSpent, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/common/Card";

interface ChartsProps {
  trip: Trip;
}

export function Charts({ trip }: ChartsProps) {
  const categoryData = useMemo(() => {
    const spending = getSpendingByCategory(trip.expenses);
    return EXPENSE_CATEGORIES
      .filter((c) => spending[c.value])
      .map((c) => ({
        name: c.label,
        value: spending[c.value],
        color: CATEGORY_COLORS[c.value],
        emoji: c.emoji,
      }));
  }, [trip.expenses]);

  const dailyData = useMemo(
    () => getDailySpending(trip.expenses, trip.startDate, trip.endDate),
    [trip.expenses, trip.startDate, trip.endDate]
  );

  const personData = useMemo(() => {
    const spending = getSpendingByPerson(trip.expenses);
    return trip.travelers
      .filter((t) => spending[t.id])
      .map((t) => ({ name: t.name, amount: spending[t.id] ?? 0 }));
  }, [trip.expenses, trip.travelers]);

  const totalSpent = getTotalSpent(trip.expenses);
  const remaining = trip.budget - totalSpent;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{name: string; value: number; payload?: {name: string}}> }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-[var(--border)] rounded-xl px-3 py-2 shadow-lg text-xs">
          <p className="font-semibold">{payload[0]?.payload?.name ?? payload[0]?.name}</p>
          <p className="text-[var(--primary)]">{formatCurrency(payload[0]?.value ?? 0, trip.baseCurrency)}</p>
        </div>
      );
    }
    return null;
  };

  if (trip.expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-4xl mb-3">📊</p>
        <p className="font-semibold text-[var(--text-primary)]">No data yet</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Add expenses to see charts</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="!p-3">
          <p className="text-xs text-[var(--text-secondary)]">Total Spent</p>
          <p className="font-bold text-lg mono">{formatCurrency(totalSpent, trip.baseCurrency)}</p>
        </Card>
        <Card className="!p-3">
          <p className="text-xs text-[var(--text-secondary)]">Remaining</p>
          <p className={`font-bold text-lg mono ${remaining < 0 ? "text-[var(--danger)]" : "text-[var(--success)]"}`}>
            {formatCurrency(Math.abs(remaining), trip.baseCurrency)}
            {remaining < 0 ? " over" : ""}
          </p>
        </Card>
      </div>

      {/* Pie chart */}
      <Card>
        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
          {categoryData.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-[var(--text-secondary)]">{c.emoji} {c.name}</span>
              <span className="font-medium">{formatCurrency(c.value, trip.baseCurrency)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Line chart — cumulative spending */}
      <Card>
        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Daily Spending Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dailyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={trip.budget}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{ value: "Budget", position: "right", fontSize: 10, fill: "#EF4444" }}
            />
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="#FF6B35"
              strokeWidth={2.5}
              dot={false}
              animationBegin={0}
              animationDuration={1000}
              name="Cumulative"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bar chart — per person (only if multiple travelers) */}
      {personData.length > 1 && (
        <Card>
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Spending per Person</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={personData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="amount"
                fill="#004E89"
                radius={[6, 6, 0, 0]}
                animationBegin={0}
                animationDuration={800}
                name="Amount"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
