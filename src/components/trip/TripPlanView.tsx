"use client";
import { useState, useEffect, useRef } from "react";
import {
  CalendarDays, RefreshCw, AlertTriangle, Info, MapPin, Sun, Cloud, Moon,
  Lightbulb, Wallet, Star, Navigation, Sparkles, Search, ChevronDown,
} from "lucide-react";
import { Trip, TripInterest } from "@/lib/types";
import type { PlaceResult } from "@/lib/places";
import { useTripStore } from "@/store/tripStore";
import { Button } from "@/components/common/Button";
import { Skeleton } from "@/components/common/Skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";

interface TripPlanViewProps {
  trip: Trip;
}

function arraysEqual(a: TripInterest[], b: TripInterest[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Slot {
  placeId?: string;
  placeName?: string;
  text: string;
  cost?: string;
}

interface DayCard {
  header: string;
  morning?: Slot;
  afternoon?: Slot;
  evening?: Slot;
  alternatives: string[];
  budget?: string;
  tip?: string;
  extra: string[];
}

// ── Parser ────────────────────────────────────────────────────────────────────

function parseSlot(raw: string): Slot {
  const idMatch = raw.match(/\[id:([^\]]+)\]/);
  const placeId = idMatch?.[1];
  let text = raw.replace(/\[id:[^\]]+\]\s*/g, "").trim();

  const costMatch = text.match(/\s+—\s+(~?[$]?\d[\d,.]* ?(?:[A-Z]{3})?)$/);
  let cost: string | undefined;
  if (costMatch) {
    cost = costMatch[1].trim();
    text = text.slice(0, costMatch.index).trim().replace(/\s+—\s*$/, "");
  }

  let placeName: string | undefined;
  const sepIdx = text.indexOf(" — ");
  if (sepIdx !== -1) {
    placeName = text.slice(0, sepIdx).trim();
    text = text.slice(sepIdx + 3).trim();
  } else {
    placeName = text;
  }

  return { placeId, placeName, text, cost };
}

// Extracts a single numeric value from a budget string like "~$150", "$80–$120", "~50 USD"
function parseBudgetAmount(str: string): number | null {
  const cleaned = str.replace(/[~$,]/g, "");
  const rangeMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) return (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2;
  const single = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (single) return parseFloat(single[1]);
  return null;
}

function parseStreamedText(text: string): DayCard[] {
  const lines = text.split("\n");
  const days: DayCard[] = [];
  let current: DayCard | null = null;

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## Day ")) {
      if (current) days.push(current);
      current = { header: line.slice(3), alternatives: [], extra: [] };
      continue;
    }

    if (!current) continue;

    if (line.startsWith("**Morning:**")) {
      current.morning = parseSlot(line.replace("**Morning:**", "").trim());
    } else if (line.startsWith("**Afternoon:**")) {
      current.afternoon = parseSlot(line.replace("**Afternoon:**", "").trim());
    } else if (line.startsWith("**Evening:**")) {
      current.evening = parseSlot(line.replace("**Evening:**", "").trim());
    } else if (line.startsWith("**Alternatives:**")) {
      const altText = line.replace("**Alternatives:**", "").trim();
      const idMatches = [...altText.matchAll(/\[id:([^\]]+)\]/g)];
      current.alternatives = idMatches.map((m) => m[1]);
    } else if (line.startsWith("**Day Budget:**")) {
      current.budget = line.replace("**Day Budget:**", "").trim();
    } else if (line.startsWith("**Tip:**")) {
      current.tip = line.replace("**Tip:**", "").trim();
    } else if (line) {
      current.extra.push(line);
    }
  }

  if (current) days.push(current);
  return days;
}

// ── PriceLevel ────────────────────────────────────────────────────────────────

function PriceLevel({ level }: { level?: 1 | 2 | 3 | 4 }) {
  if (!level) return null;
  return (
    <span className="text-[11px] font-medium tracking-tight">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={i <= level ? "text-emerald-600" : "text-slate-200"}>
          $
        </span>
      ))}
    </span>
  );
}

// ── PlaceMiniCard ─────────────────────────────────────────────────────────────

function PlaceMiniCard({ place, compact = false }: { place: PlaceResult; compact?: boolean }) {
  const mapsUrl = `https://maps.google.com/?q=${place.lat},${place.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${place.lat},${place.lng}&navigate=yes`;

  if (compact) {
    return (
      <div className="flex-shrink-0 w-44 bg-white rounded-2xl p-2.5 border border-slate-100 shadow-sm">
        <div className="w-full h-24 rounded-xl overflow-hidden bg-orange-50 flex items-center justify-center mb-2">
          {place.photoUrl ? (
            <img src={place.photoUrl} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <MapPin size={18} className="text-[var(--primary)]" />
          )}
        </div>
        <p className="text-xs font-semibold text-[var(--text-primary)] truncate leading-tight mb-1">{place.name}</p>
        <div className="flex items-center gap-1.5 mb-2">
          {place.rating !== undefined && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <Star size={8} fill="currentColor" />
              {place.rating.toFixed(1)}
            </span>
          )}
          <PriceLevel level={place.priceLevel} />
        </div>
        <div className="flex gap-1.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 rounded-xl bg-[var(--primary)] text-white active:scale-95 transition-transform"
          >
            <MapPin size={9} />
            Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 rounded-xl bg-slate-100 text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            <Navigation size={9} />
            Waze
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
      <div className="w-16 h-16 rounded-xl shrink-0 overflow-hidden bg-orange-50 flex items-center justify-center">
        {place.photoUrl ? (
          <img src={place.photoUrl} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <MapPin size={20} className="text-[var(--primary)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate leading-tight">{place.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {place.rating !== undefined && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <Star size={9} fill="currentColor" />
              {place.rating.toFixed(1)}
            </span>
          )}
          <PriceLevel level={place.priceLevel} />
        </div>
        {place.address && (
          <p className="text-[11px] text-[var(--text-secondary)] mt-1 truncate">{place.address}</p>
        )}
        <div className="flex gap-2 mt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white active:scale-95 transition-transform"
          >
            <MapPin size={10} />
            Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            <Navigation size={10} />
            Waze
          </a>
        </div>
      </div>
    </div>
  );
}

// ── SlotRow ───────────────────────────────────────────────────────────────────

const SLOT_STYLES = {
  Morning:   { dot: "bg-amber-400",  pill: "bg-amber-50 text-amber-700 border border-amber-200",   line: "from-amber-200" },
  Afternoon: { dot: "bg-sky-400",    pill: "bg-sky-50 text-sky-700 border border-sky-200",          line: "from-sky-200"   },
  Evening:   { dot: "bg-indigo-400", pill: "bg-indigo-50 text-indigo-700 border border-indigo-200", line: "from-indigo-200" },
};

function SlotRow({
  icon: Icon,
  label,
  slot,
  place,
  alternatives,
  isLast,
}: {
  icon: React.ElementType;
  label: "Morning" | "Afternoon" | "Evening";
  slot: Slot;
  place?: PlaceResult;
  alternatives: PlaceResult[];
  isLast?: boolean;
}) {
  const styles = SLOT_STYLES[label];

  return (
    <div className="flex gap-3">
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 pt-0.5">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${styles.dot}`}>
          <Icon size={14} className="text-white" />
        </div>
        {!isLast && (
          <div className={`w-px flex-1 min-h-[2rem] mt-1 bg-gradient-to-b ${styles.line} to-transparent`} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-4"}`}>
        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${styles.pill}`}>
          {label}
        </span>
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">{slot.text}</p>
        {slot.cost && (
          <span className="mt-1.5 inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            ~{slot.cost}
          </span>
        )}
        {place && (
          <div className="mt-2.5">
            <PlaceMiniCard place={place} />
          </div>
        )}
        {alternatives.length > 0 && (
          <div className="mt-2.5">
            <AlternativesRow places={alternatives} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── AlternativesRow ───────────────────────────────────────────────────────────

function AlternativesRow({ places }: { places: PlaceResult[] }) {
  if (!places.length) return null;

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 flex items-center gap-1">
        <Sparkles size={9} className="text-amber-400" />
        Alternatives
      </p>
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
        {places.map((p) => (
          <PlaceMiniCard key={p.id} place={p} compact />
        ))}
      </div>
    </div>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────

function PlaceSkeletonCard() {
  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
      <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2 py-0.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-5 w-1/3 rounded-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-0.5">
          <Skeleton className="h-7 w-16 rounded-xl" />
          <Skeleton className="h-7 w-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Day card ──────────────────────────────────────────────────────────────────

const DAY_COLORS = [
  "from-orange-400 to-amber-400",
  "from-sky-400 to-blue-400",
  "from-violet-400 to-purple-400",
  "from-emerald-400 to-teal-400",
  "from-rose-400 to-pink-400",
  "from-indigo-400 to-blue-500",
  "from-amber-400 to-orange-500",
];

function DayCardUI({
  day,
  dayIndex,
  isLast,
  isStreaming,
  morningPlace,
  afternoonPlace,
  eveningPlace,
  morningAlts,
  afternoonAlts,
  eveningAlts,
}: {
  day: DayCard;
  dayIndex: number;
  isLast: boolean;
  isStreaming: boolean;
  morningPlace?: PlaceResult;
  afternoonPlace?: PlaceResult;
  eveningPlace?: PlaceResult;
  morningAlts: PlaceResult[];
  afternoonAlts: PlaceResult[];
  eveningAlts: PlaceResult[];
}) {
  const [collapsed, setCollapsed] = useState(false);
  const parts = day.header.split(" — ");
  const dayLabel = parts[0] ?? day.header;
  const dateLabel = parts[1];
  const theme = parts.slice(2).join(" — ");
  const dayNum = dayLabel.replace("Day ", "");
  const gradientClass = DAY_COLORS[(dayIndex) % DAY_COLORS.length];

  const hasEvening = !!day.evening;
  const hasAfternoon = !!day.afternoon;

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full text-left"
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-sm`}>
            <span className="text-white text-sm font-extrabold">{dayNum}</span>
          </div>
          <div className="flex-1 min-w-0">
            {theme ? (
              <>
                <p className="font-bold text-sm text-[var(--text-primary)] truncate">{theme}</p>
                {dateLabel && (
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{dateLabel}</p>
                )}
              </>
            ) : (
              <p className="font-bold text-sm text-[var(--text-primary)]">
                {dayLabel}{dateLabel && <span className="text-[var(--text-secondary)] font-normal ml-1.5">· {dateLabel}</span>}
              </p>
            )}
          </div>
          <ChevronDown
            size={16}
            className={`text-[var(--text-secondary)] shrink-0 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
          />
        </div>
      </button>

      {/* Body */}
      {!collapsed && (
        <div className="px-4 pt-1 pb-4 border-t border-[var(--border)]">
          <div className="pt-3 space-y-0">
            {day.morning && (
              <SlotRow
                icon={Sun}
                label="Morning"
                slot={day.morning}
                place={morningPlace}
                alternatives={morningAlts}
                isLast={!hasAfternoon && !hasEvening}
              />
            )}
            {day.afternoon && (
              <SlotRow
                icon={Cloud}
                label="Afternoon"
                slot={day.afternoon}
                place={afternoonPlace}
                alternatives={afternoonAlts}
                isLast={!hasEvening}
              />
            )}
            {day.evening && (
              <SlotRow
                icon={Moon}
                label="Evening"
                slot={day.evening}
                place={eveningPlace}
                alternatives={eveningAlts}
                isLast
              />
            )}
          </div>

          {/* Extra lines */}
          {day.extra.length > 0 && (
            <div className="mt-1 space-y-1">
              {day.extra.map((line, i) => (
                <p key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed">{line}</p>
              ))}
            </div>
          )}

          {/* Budget + Tip */}
          {(day.budget || day.tip) && (
            <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2">
              {day.budget && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                  <Wallet size={13} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-800">{day.budget}</span>
                </div>
              )}
              {day.tip && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                  <Lightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-amber-800 leading-relaxed">{day.tip}</span>
                </div>
              )}
            </div>
          )}

          {/* Streaming cursor */}
          {isLast && isStreaming && (
            <span className="inline-block w-1.5 h-3.5 bg-[var(--primary)] animate-pulse rounded-sm mt-2 ml-1" />
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TripPlanView({ trip }: TripPlanViewProps) {
  const updateTrip = useTripStore((s) => s.updateTrip);
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [fetchingPlaces, setFetchingPlaces] = useState(false);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const [placesNotConfigured, setPlacesNotConfigured] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (trip.tripPlan?.content) {
      const cachedInterests = trip.tripPlan.interests ?? [];
      const currentInterests = trip.interests ?? [];
      const interestsMatch = arraysEqual(cachedInterests, currentInterests);
      const placesAvailable = (trip.places?.length ?? 0) > 0;
      const cacheIsStale = placesAvailable && !trip.tripPlan.groundedWithPlaces;
      if (interestsMatch && !cacheIsStale) {
        setStreamedText(trip.tripPlan.content);
      }
    }
  }, [trip.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPlaces() {
    setFetchingPlaces(true);
    setPlacesError(null);
    setPlacesNotConfigured(false);
    try {
      const interestsParam = trip.interests?.length
        ? `&interests=${encodeURIComponent(trip.interests.join(","))}`
        : "";
      const res = await fetch(
        `/api/places?lat=${trip.destinationLat}&lng=${trip.destinationLng}${interestsParam}`
      );
      const json = await res.json();
      if (json.error === "PLACES_NOT_CONFIGURED") {
        setPlacesNotConfigured(true);
        return;
      }
      if (json.error) throw new Error(json.message ?? json.error);
      await updateTrip(trip.id, { places: json.places });
    } catch (err) {
      setPlacesError(err instanceof Error ? err.message : "Failed to fetch places");
    } finally {
      setFetchingPlaces(false);
    }
  }

  async function fetchPlan() {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsStreaming(true);
    setStreamedText("");
    setError(null);
    setNotConfigured(false);

    try {
      const res = await fetch("/api/trip-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          destination: trip.destination,
          budget: trip.budget,
          currency: trip.baseCurrency,
          startDate: trip.startDate,
          endDate: trip.endDate,
          travelersCount: trip.travelers.length,
          interests: trip.interests ?? [],
          places: trip.places ?? [],
        }),
      });

      if (res.status === 503) {
        setNotConfigured(true);
        setIsStreaming(false);
        return;
      }
      if (!res.ok) {
        setError("Failed to generate itinerary. Please try again.");
        setIsStreaming(false);
        return;
      }

      const groundedWithPlaces = res.headers.get("X-Grounded-With-Places") === "1";
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setStreamedText(fullText);
      }

      await updateTrip(trip.id, {
        tripPlan: {
          content: fullText,
          generatedAt: new Date().toISOString(),
          interests: trip.interests ?? [],
          groundedWithPlaces,
        },
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsStreaming(false);
    }
  }

  const days = parseStreamedText(streamedText);
  const allPlaces: PlaceResult[] = trip.places ?? [];
  const hasPlaces = allPlaces.length > 0;
  const hasCoords = !!(trip.destinationLat && trip.destinationLng);

  // ── Global deduplication across all days ───────────────────────────────────
  const findPlace = (slot?: Slot): PlaceResult | undefined => {
    if (!slot || !allPlaces.length) return undefined;
    if (slot.placeId) {
      const byId = allPlaces.find((p) => p.id === slot.placeId);
      if (byId) return byId;
    }
    if (slot.placeName) {
      const needle = slot.placeName.toLowerCase();
      return allPlaces.find((p) => {
        const hay = p.name.toLowerCase();
        return hay.includes(needle) || needle.includes(hay);
      });
    }
    return undefined;
  };

  // First pass: resolve every primary slot place across ALL days
  const resolvedDays = days.map((day) => ({
    morning:   findPlace(day.morning),
    afternoon: findPlace(day.afternoon),
    evening:   findPlace(day.evening),
  }));

  // Seed global used set with every primary slot place so none leaks into alternatives
  const globalUsedIds = new Set<string>();
  resolvedDays.forEach(({ morning, afternoon, evening }) => {
    [morning, afternoon, evening].forEach((p) => p && globalUsedIds.add(p.id));
  });

  // Second pass: compute alternatives sequentially — each picked place is
  // immediately marked used so it cannot appear in any later slot or day
  const takeAlts = (place: PlaceResult | undefined): PlaceResult[] => {
    if (!place) return [];
    const alts = allPlaces
      .filter((p) => p.filter === place.filter && !globalUsedIds.has(p.id))
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
    alts.forEach((p) => globalUsedIds.add(p.id));
    return alts;
  };

  const dayAlts = resolvedDays.map(({ morning, afternoon, evening }) => ({
    morningAlts:   takeAlts(morning),
    afternoonAlts: takeAlts(afternoon),
    eveningAlts:   takeAlts(evening),
  }));

  // Estimated total from day budgets (only days that have a budget line)
  const daysWithBudget = days.filter((d) => d.budget);
  const estimatedTotal = daysWithBudget.reduce((sum, d) => {
    const amount = parseBudgetAmount(d.budget!);
    return amount !== null ? sum + amount : sum;
  }, 0);
  const showTotal = !isStreaming && daysWithBudget.length > 0 && estimatedTotal > 0;

  // ── Not configured ─────────────────────────────────────────────────────────
  if (notConfigured) {
    return (
      <div className="px-4 py-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
          <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800">AI Planner not configured</p>
            <p className="text-xs text-blue-600 mt-1">
              Add <code className="bg-blue-100 px-1 rounded">NVIDIA_API_KEY</code> to{" "}
              <code className="bg-blue-100 px-1 rounded">.env.local</code> to enable AI trip planning.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in pb-24">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-orange-600 flex items-center justify-center shadow-sm">
            <CalendarDays size={15} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--text-primary)] leading-tight">Trip Plan</p>
            {hasPlaces && (
              <p className="text-[10px] text-[var(--text-secondary)]">{allPlaces.length} places loaded</p>
            )}
          </div>
        </div>
        {streamedText && !isStreaming && (
          <button
            onClick={fetchPlan}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] bg-[var(--bg-secondary)] hover:bg-orange-50 border border-[var(--border)] px-3 py-1.5 rounded-xl transition-colors"
            type="button"
          >
            <RefreshCw size={12} />
            Regenerate
          </button>
        )}
      </div>

      {/* Places fetching skeleton */}
      {fetchingPlaces && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
            <Search size={14} className="text-[var(--primary)] animate-pulse" />
            <span className="text-sm text-[var(--text-secondary)]">Finding nearby places…</span>
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <PlaceSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!streamedText && !isStreaming && !error && !fetchingPlaces && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center mb-5 shadow-sm">
            <CalendarDays size={32} className="text-[var(--primary)]" />
          </div>
          <p className="font-bold text-[var(--text-primary)] text-base">Plan your trip</p>

          {hasPlaces ? (
            <>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs leading-relaxed">
                <span className="font-semibold text-emerald-600">{allPlaces.length} nearby places</span> loaded —
                generate a personalized day-by-day itinerary with directions.
              </p>
              {(!trip.interests || trip.interests.length === 0) && (
                <p className="text-xs text-[var(--text-secondary)] mt-2 bg-slate-50 border border-[var(--border)] rounded-xl px-3 py-2 max-w-xs">
                  Tip: add interests in Settings for a more personalized plan.
                </p>
              )}
              <Button onClick={fetchPlan} className="mt-5">
                <CalendarDays size={14} className="mr-1.5" />
                Generate Plan
              </Button>
            </>
          ) : hasCoords ? (
            <>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs leading-relaxed">
                Find nearby places first for a plan with real photos and directions, or skip for a generic itinerary.
              </p>

              {placesNotConfigured && (
                <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 max-w-xs">
                  Yelp API key not set — places unavailable. You can still generate a generic plan.
                </div>
              )}
              {placesError && (
                <div className="mt-3 text-xs text-[var(--danger)] bg-red-50 border border-red-100 rounded-xl px-3 py-2 max-w-xs">
                  {placesError}
                </div>
              )}

              <div className="flex flex-col gap-2.5 mt-5 w-full max-w-xs">
                {!placesNotConfigured && (
                  <Button onClick={fetchPlaces}>
                    <Search size={14} className="mr-1.5" />
                    Find Nearby Places First
                  </Button>
                )}
                <button
                  onClick={fetchPlan}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl py-2.5 px-4 transition-colors"
                  type="button"
                >
                  Skip & generate without places
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs leading-relaxed">
                Get a personalized day-by-day itinerary for{" "}
                <span className="font-semibold text-[var(--text-primary)]">{trip.destination}</span>.
              </p>
              <Button onClick={fetchPlan} className="mt-5">
                <CalendarDays size={14} className="mr-1.5" />
                Generate Plan
              </Button>
            </>
          )}
        </div>
      )}

      {/* Initial loading spinner */}
      {isStreaming && days.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-10">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
            <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin" />
            <CalendarDays size={16} className="absolute inset-0 m-auto text-[var(--primary)]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">Building your itinerary…</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">This may take a moment</p>
          </div>
        </div>
      )}

      {/* Day cards */}
      {days.length > 0 && (
        <div className="space-y-3">
          {days.map((day, i) => (
            <DayCardUI
              key={i}
              day={day}
              dayIndex={i}
              isLast={i === days.length - 1}
              isStreaming={isStreaming}
              morningPlace={resolvedDays[i]?.morning}
              afternoonPlace={resolvedDays[i]?.afternoon}
              eveningPlace={resolvedDays[i]?.evening}
              morningAlts={dayAlts[i]?.morningAlts ?? []}
              afternoonAlts={dayAlts[i]?.afternoonAlts ?? []}
              eveningAlts={dayAlts[i]?.eveningAlts ?? []}
            />
          ))}
        </div>
      )}

      {/* Estimated total */}
      {showTotal && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Wallet size={17} className="text-emerald-700" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Estimated Total</p>
              <p className="text-[10px] text-emerald-500 mt-0.5">
                Based on {daysWithBudget.length} day{daysWithBudget.length !== 1 ? "s" : ""} · {trip.travelers.length} traveler{trip.travelers.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-extrabold text-emerald-800">
              ~{formatCurrency(Math.round(estimatedTotal), trip.baseCurrency)}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      {streamedText && !isStreaming && trip.tripPlan?.generatedAt && (
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 pb-2">
          <p className="text-xs text-[var(--text-secondary)] opacity-60">
            Generated {formatDate(trip.tripPlan.generatedAt)}
          </p>
          {trip.tripPlan.groundedWithPlaces && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <MapPin size={9} />
              Based on real nearby places
            </span>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-[var(--danger)] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[var(--danger)]">Something went wrong</p>
            <p className="text-xs text-[var(--danger)] opacity-80 mt-0.5">{error}</p>
            <button
              onClick={fetchPlan}
              className="text-xs font-semibold text-[var(--primary)] hover:underline mt-2"
              type="button"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
