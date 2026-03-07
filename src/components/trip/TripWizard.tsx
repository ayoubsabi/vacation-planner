"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { useTripStore } from "@/store/tripStore";
import { DESTINATION_SUGGESTIONS, CURRENCIES } from "@/lib/constants";
import {
  getTripDuration,
  getDailyBudget,
  formatCurrency,
  isoDateToday,
  generateId,
} from "@/lib/utils";
import { Traveler } from "@/lib/types";
import { Plus, Trash2, MapPin, DollarSign, Users } from "lucide-react";

const STEPS = ["Destination", "Budget & Dates", "Travelers"];

export function TripWizard() {
  const router = useRouter();
  const addTrip = useTripStore((s) => s.addTrip);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [destination, setDestination] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<typeof DESTINATION_SUGGESTIONS>([]);
  const [currency, setCurrency] = useState("USD");
  const [tripName, setTripName] = useState("");

  // Step 2
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState(isoDateToday());
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });

  // Step 3
  const [travelers, setTravelers] = useState<Traveler[]>([
    { id: generateId(), name: "", email: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Destination autocomplete
  function handleDestinationChange(val: string) {
    setDestination(val);
    if (val.length > 1) {
      const matches = DESTINATION_SUGGESTIONS.filter((d) =>
        d.name.toLowerCase().includes(val.toLowerCase())
      );
      setDestinationSuggestions(matches.slice(0, 5));
    } else {
      setDestinationSuggestions([]);
    }
  }

  function selectDestination(dest: (typeof DESTINATION_SUGGESTIONS)[0]) {
    setDestination(dest.name);
    setCurrency(dest.currency);
    if (!tripName) setTripName(`Trip to ${dest.name.split(",")[0]}`);
    setDestinationSuggestions([]);
  }

  // Duration & daily budget
  const duration = getTripDuration(startDate, endDate);
  const dailyBudget = budget ? getDailyBudget(parseFloat(budget), startDate, endDate) : 0;

  // Step validation
  function validateStep() {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!destination.trim()) errs.destination = "Destination is required";
      if (!tripName.trim()) errs.tripName = "Trip name is required";
    }
    if (step === 1) {
      if (!budget || parseFloat(budget) <= 0) errs.budget = "Enter a valid budget";
      if (endDate <= startDate) errs.endDate = "End date must be after start date";
    }
    if (step === 2) {
      if (travelers.some((t) => !t.name.trim())) errs.travelers = "All travelers need a name";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (validateStep()) setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => s - 1);
    setErrors({});
  }

  function addTraveler() {
    setTravelers((prev) => [...prev, { id: generateId(), name: "", email: "" }]);
  }

  function removeTraveler(id: string) {
    if (travelers.length === 1) return;
    setTravelers((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTraveler(id: string, field: keyof Traveler, value: string) {
    setTravelers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const trip = await addTrip({
        name: tripName,
        destination,
        startDate,
        endDate,
        budget: parseFloat(budget),
        baseCurrency: currency,
        travelers: travelers.filter((t) => t.name.trim()),
      });
      router.push(`/trip/${trip.id}`);
    } catch {
      setLoading(false);
    }
  }

  const currencyOptions = CURRENCIES.map((c) => ({
    value: c.code,
    label: `${c.code} — ${c.name}`,
  }));

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Progress stepper */}
      <div className="bg-white border-b border-[var(--border)] px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                      ${i <= step ? "bg-[var(--primary)] text-white" : "bg-slate-200 text-slate-500"}`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      i === step ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 rounded ${
                      i < step ? "bg-[var(--primary)]" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        <div className="animate-fade-in" key={step}>
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 text-[var(--primary)] mb-1">
                  <MapPin size={20} />
                  <h2 className="text-xl font-bold">Where are you going?</h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Tell us your destination and we&apos;ll suggest a currency.
                </p>
              </div>

              <div className="relative">
                <Input
                  label="Destination"
                  placeholder="e.g. Paris, France"
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  error={errors.destination}
                  autoFocus
                />
                {destinationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-[var(--border)] rounded-xl shadow-lg z-10 mt-1 overflow-hidden">
                    {destinationSuggestions.map((d) => (
                      <button
                        key={d.name}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm flex items-center justify-between transition-colors"
                        onClick={() => selectDestination(d)}
                        type="button"
                      >
                        <span>{d.name}</span>
                        <span className="text-xs text-[var(--text-secondary)] bg-slate-100 px-2 py-0.5 rounded">
                          {d.currency}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Input
                label="Trip Name"
                placeholder="e.g. Europe Summer 2025"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                error={errors.tripName}
              />

              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={currencyOptions}
              />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 text-[var(--primary)] mb-1">
                  <DollarSign size={20} />
                  <h2 className="text-xl font-bold">Budget & Dates</h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  How much are you planning to spend?
                </p>
              </div>

              <Input
                label={`Total Budget (${currency})`}
                type="number"
                placeholder="e.g. 3000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                error={errors.budget}
                min="1"
                step="100"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  error={errors.endDate}
                />
              </div>

              {budget && parseFloat(budget) > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--text-secondary)]">Trip duration</span>
                    <span className="font-semibold">{duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Daily budget</span>
                    <span className="font-bold text-[var(--primary)]">
                      {formatCurrency(dailyBudget, currency)} / day
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 text-[var(--primary)] mb-1">
                  <Users size={20} />
                  <h2 className="text-xl font-bold">Who&apos;s coming?</h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Add yourself and any travel companions.
                </p>
              </div>

              {errors.travelers && (
                <p className="text-sm text-[var(--danger)]">{errors.travelers}</p>
              )}

              <div className="flex flex-col gap-3">
                {travelers.map((t, i) => (
                  <div key={t.id} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        label={i === 0 ? "Your Name" : `Traveler ${i + 1}`}
                        placeholder={i === 0 ? "Your name" : "Name"}
                        value={t.name}
                        onChange={(e) => updateTraveler(t.id, "name", e.target.value)}
                      />
                    </div>
                    {travelers.length > 1 && (
                      <button
                        onClick={() => removeTraveler(t.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[var(--danger)] hover:bg-red-50 transition-colors mb-0.5"
                        aria-label="Remove traveler"
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addTraveler}
                className="flex items-center gap-2 text-[var(--primary)] text-sm font-medium hover:underline"
                type="button"
              >
                <Plus size={16} />
                Add another traveler
              </button>

              {/* Summary */}
              <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1">
                <p className="font-medium text-[var(--text-primary)] mb-2">Trip Summary</p>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Destination</span>
                  <span className="font-medium text-[var(--text-primary)]">{destination}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Budget</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {formatCurrency(parseFloat(budget) || 0, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Duration</span>
                  <span className="font-medium text-[var(--text-primary)]">{duration} days</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Travelers</span>
                  <span className="font-medium text-[var(--text-primary)]">{travelers.filter((t) => t.name.trim()).length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-[var(--border)] px-4 py-4 safe-bottom">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={prevStep} className="flex-1">
              Back
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={nextStep} className="flex-1">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading} className="flex-1">
              Create Trip 🚀
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
