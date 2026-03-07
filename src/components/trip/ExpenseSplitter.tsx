"use client";
import { useState, useMemo } from "react";
import { Trip, Debt } from "@/lib/types";
import { Card } from "@/components/common/Card";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

interface ExpenseSplitterProps {
  trip: Trip;
}

function calculateDebts(trip: Trip): Debt[] {
  // Calculate net balance per person
  const balances: Record<string, number> = {};

  for (const traveler of trip.travelers) {
    balances[traveler.id] = 0;
  }

  for (const expense of trip.expenses) {
    if (expense.splitBetween.length === 0) continue;

    const share = expense.amount / expense.splitBetween.length;

    // Payer gets credit
    balances[expense.paidBy] = (balances[expense.paidBy] ?? 0) + expense.amount;

    // Each person in split owes their share
    for (const id of expense.splitBetween) {
      balances[id] = (balances[id] ?? 0) - share;
    }
  }

  // Simplify debts
  const creditors = Object.entries(balances)
    .filter(([, b]) => b > 0.005)
    .sort(([, a], [, b]) => b - a);

  const debtors = Object.entries(balances)
    .filter(([, b]) => b < -0.005)
    .sort(([, a], [, b]) => a - b);

  const debts: Debt[] = [];
  let ci = 0;
  let di = 0;

  const credList = creditors.map(([id, amount]) => ({ id, amount }));
  const debtList = debtors.map(([id, amount]) => ({ id, amount: Math.abs(amount) }));

  while (ci < credList.length && di < debtList.length) {
    const cred = credList[ci];
    const debt = debtList[di];
    if (!cred || !debt) break;

    const amount = Math.min(cred.amount, debt.amount);

    debts.push({ from: debt.id, to: cred.id, amount: Math.round(amount * 100) / 100 });

    cred.amount -= amount;
    debt.amount -= amount;

    if (cred.amount < 0.005) ci++;
    if (debt.amount < 0.005) di++;
  }

  return debts;
}

export function ExpenseSplitter({ trip }: ExpenseSplitterProps) {
  const [settled, setSettled] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const debts = useMemo(() => calculateDebts(trip), [trip]);

  const getTravelerName = (id: string) =>
    trip.travelers.find((t) => t.id === id)?.name ?? "Unknown";

  function debtKey(d: Debt) {
    return `${d.from}-${d.to}-${d.amount}`;
  }

  function toggleSettled(key: string) {
    setSettled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const splitExpenses = trip.expenses.filter((e) => e.splitBetween.length > 0);

  if (splitExpenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-4xl mb-3">🤝</p>
        <p className="font-semibold text-[var(--text-primary)]">No split expenses yet</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          When you add expenses with &ldquo;split between&rdquo; travelers, settlements will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      <div>
        <h2 className="font-bold text-[var(--text-primary)] text-lg">Who Owes Who</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Simplified settlements for {trip.travelers.length} travelers
        </p>
      </div>

      {debts.length === 0 ? (
        <Card>
          <div className="text-center py-4">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-semibold text-[var(--success)]">All settled up!</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Everyone is even — no debts to settle.
            </p>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {debts.map((debt) => {
            const key = debtKey(debt);
            const isSettled = settled.has(key);

            return (
              <Card key={key} className={isSettled ? "opacity-60" : ""}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleSettled(key)}
                    className="shrink-0 transition-colors"
                    aria-label={isSettled ? "Mark as unsettled" : "Mark as settled"}
                  >
                    {isSettled ? (
                      <CheckCircle2 size={24} className="text-[var(--success)]" />
                    ) : (
                      <Circle size={24} className="text-slate-300" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-sm ${isSettled ? "line-through text-slate-400" : "text-[var(--text-primary)]"}`}>
                        {getTravelerName(debt.from)}
                      </span>
                      <ArrowRight size={14} className="text-[var(--text-secondary)] shrink-0" />
                      <span className={`font-semibold text-sm ${isSettled ? "line-through text-slate-400" : "text-[var(--text-primary)]"}`}>
                        {getTravelerName(debt.to)}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={notes[key] ?? ""}
                      onChange={(e) => setNotes((n) => ({ ...n, [key]: e.target.value }))}
                      className="mt-1 text-xs text-[var(--text-secondary)] bg-transparent border-none outline-none w-full placeholder:text-slate-300"
                    />
                  </div>

                  <span className={`font-bold mono text-[var(--primary)] shrink-0 ${isSettled ? "line-through text-slate-400" : ""}`}>
                    {formatCurrency(debt.amount, trip.baseCurrency)}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Split expense breakdown */}
      <div>
        <h3 className="font-semibold text-[var(--text-primary)] mb-3">Split Expenses</h3>
        <div className="flex flex-col gap-2">
          {splitExpenses.map((expense) => (
            <Card key={expense.id} className="!p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{expense.description}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Paid by {getTravelerName(expense.paidBy)} · Split {expense.splitBetween.length} ways
                    · {formatCurrency(expense.amount / expense.splitBetween.length, expense.currency)} each
                  </p>
                </div>
                <p className="font-semibold mono text-sm shrink-0">
                  {formatCurrency(expense.amount, expense.currency)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
