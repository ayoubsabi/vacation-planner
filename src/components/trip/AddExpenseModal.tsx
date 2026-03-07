"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { useTripStore } from "@/store/tripStore";
import { useUIStore } from "@/store/uiStore";
import { Trip, ExpenseCategory } from "@/lib/types";
import { EXPENSE_CATEGORIES, CURRENCIES } from "@/lib/constants";
import { isoDateToday, formatCurrency } from "@/lib/utils";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

const defaultForm = (tripCurrency: string, today: string) => ({
  description: "",
  amount: "",
  currency: tripCurrency,
  category: "food" as ExpenseCategory,
  date: today,
  paidBy: "",
  splitBetween: [] as string[],
  notes: "",
});

export function AddExpenseModal({ isOpen, onClose, trip }: AddExpenseModalProps) {
  const addExpense = useTripStore((s) => s.addExpense);
  const updateExpense = useTripStore((s) => s.updateExpense);
  const editingExpenseId = useUIStore((s) => s.editingExpenseId);

  const today = isoDateToday();
  const [form, setForm] = useState(defaultForm(trip.baseCurrency, today));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Load existing expense if editing
  useEffect(() => {
    if (editingExpenseId) {
      const expense = trip.expenses.find((e) => e.id === editingExpenseId);
      if (expense) {
        setForm({
          description: expense.description,
          amount: String(expense.amount),
          currency: expense.currency,
          category: expense.category,
          date: expense.date,
          paidBy: expense.paidBy,
          splitBetween: expense.splitBetween,
          notes: expense.notes ?? "",
        });
      }
    } else {
      setForm({
        ...defaultForm(trip.baseCurrency, today),
        paidBy: trip.travelers[0]?.id ?? "",
      });
    }
    setErrors({});
  }, [editingExpenseId, isOpen, trip, today]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.description.trim()) errs.description = "Description required";
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = "Enter a valid amount";
    if (!form.paidBy) errs.paidBy = "Select who paid";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    try {
      const expenseData = {
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        currency: form.currency,
        category: form.category,
        date: form.date,
        paidBy: form.paidBy,
        splitBetween: form.splitBetween,
        notes: form.notes.trim() || undefined,
      };

      if (editingExpenseId) {
        await updateExpense(trip.id, editingExpenseId, expenseData);
      } else {
        await addExpense(trip.id, expenseData);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  }

  function toggleSplit(travelerId: string) {
    setForm((prev) => ({
      ...prev,
      splitBetween: prev.splitBetween.includes(travelerId)
        ? prev.splitBetween.filter((id) => id !== travelerId)
        : [...prev.splitBetween, travelerId],
    }));
  }

  const amount = parseFloat(form.amount) || 0;
  const splitCount = form.splitBetween.length;
  const perPerson = splitCount > 0 ? amount / splitCount : amount;

  const categoryOptions = EXPENSE_CATEGORIES.map((c) => ({
    value: c.value,
    label: `${c.emoji} ${c.label}`,
  }));

  const currencyOptions = CURRENCIES.map((c) => ({
    value: c.code,
    label: `${c.code} — ${c.name}`,
  }));

  const travelerOptions = trip.travelers.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingExpenseId ? "Edit Expense" : "Add Expense"}
    >
      <div className="px-5 py-4 flex flex-col gap-4">
        <Input
          label="Description"
          placeholder="e.g. Dinner at La Piazza"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          error={errors.description}
          autoFocus
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            error={errors.amount}
            min="0.01"
            step="0.01"
          />
          <Select
            label="Currency"
            value={form.currency}
            onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
            options={currencyOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Category"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value as ExpenseCategory }))
            }
            options={categoryOptions}
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        <Select
          label="Paid by"
          value={form.paidBy}
          onChange={(e) => setForm((f) => ({ ...f, paidBy: e.target.value }))}
          options={travelerOptions}
          error={errors.paidBy}
        />

        {/* Split between */}
        {trip.travelers.length > 1 && (
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Split between</p>
            <div className="flex flex-wrap gap-2">
              {trip.travelers.map((traveler) => {
                const selected = form.splitBetween.includes(traveler.id);
                return (
                  <button
                    key={traveler.id}
                    type="button"
                    onClick={() => toggleSplit(traveler.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? "bg-[var(--primary)] text-white"
                        : "bg-slate-100 text-[var(--text-secondary)] hover:bg-slate-200"
                    }`}
                  >
                    {traveler.name}
                  </button>
                );
              })}
            </div>
            {splitCount > 0 && amount > 0 && (
              <p className="text-xs text-[var(--text-secondary)] mt-2 bg-slate-50 rounded-lg px-3 py-2">
                Each person pays:{" "}
                <span className="font-bold text-[var(--primary)]">
                  {formatCurrency(perPerson, form.currency)}
                </span>
              </p>
            )}
          </div>
        )}

        <Input
          label="Notes (optional)"
          placeholder="Any additional details..."
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />

        <div className="flex gap-3 pt-2 pb-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading} className="flex-1">
            {editingExpenseId ? "Save Changes" : "Add Expense"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
