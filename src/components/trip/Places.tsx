"use client";
import { useState, useMemo } from "react";
import {
  Utensils, Landmark, ShoppingBag, Hotel, Coffee, Wine,
  MapPin, Navigation, Star, AlertTriangle, RefreshCw,
} from "lucide-react";
import { Trip } from "@/lib/types";
import type { PlaceResult, PlaceFilter } from "@/lib/places";
import { useTripStore } from "@/store/tripStore";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Skeleton } from "@/components/common/Skeleton";

interface PlacesProps {
  trip: Trip;
}

const CATEGORIES: { id: PlaceFilter; label: string; icon: React.ElementType; color: string }[] = [
  { id: "restaurant", label: "Eat",     icon: Utensils,    color: "text-rose-500"   },
  { id: "explore",    label: "Explore", icon: Landmark,    color: "text-sky-500"    },
  { id: "shop",       label: "Shop",    icon: ShoppingBag, color: "text-violet-500" },
  { id: "stay",       label: "Stay",    icon: Hotel,       color: "text-emerald-500"},
  { id: "cafe",       label: "Cafes",   icon: Coffee,      color: "text-amber-500"  },
  { id: "bar",        label: "Bars",    icon: Wine,        color: "text-indigo-500" },
];

function PriceLevel({ level }: { level?: 1 | 2 | 3 | 4 }) {
  if (!level) return null;
  return (
    <span className="text-xs font-medium tracking-tight">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={i <= level ? "text-emerald-600" : "text-slate-200"}>
          $
        </span>
      ))}
    </span>
  );
}

function EmptyState({ icon: Icon = MapPin, title, description, action }: {
  icon?: React.ElementType;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center mb-5 shadow-sm">
        <Icon size={32} className="text-[var(--primary)]" />
      </div>
      <p className="font-bold text-[var(--text-primary)] text-base">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

function PlaceCardSkeleton() {
  return (
    <Card className="flex gap-3 !p-3">
      <Skeleton className="w-28 h-28 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/3 rounded-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-20 rounded-xl" />
          <Skeleton className="h-9 w-16 rounded-xl" />
        </div>
      </div>
    </Card>
  );
}

function PlaceCard({ place }: { place: PlaceResult }) {
  const mapsUrl = `https://maps.google.com/?q=${place.lat},${place.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${place.lat},${place.lng}&navigate=yes`;

  return (
    <Card hoverable className="flex gap-3 !p-3">
      {/* Photo */}
      <div className="w-28 h-28 rounded-2xl shrink-0 overflow-hidden bg-orange-50 flex items-center justify-center">
        {place.photoUrl ? (
          <img
            src={place.photoUrl}
            alt={place.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <MapPin size={28} className="text-[var(--primary)]" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <p className="font-semibold text-[var(--text-primary)] text-sm leading-tight line-clamp-2">
            {place.name}
          </p>

          {/* Rating + price */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {place.rating !== undefined && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                <Star size={10} fill="currentColor" />
                {place.rating.toFixed(1)}
              </span>
            )}
            <PriceLevel level={place.priceLevel} />
          </div>

          {/* Address */}
          {place.address && (
            <p className="flex items-start gap-1 text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
              <MapPin size={10} className="shrink-0 mt-0.5" />
              {place.address}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] active:scale-95 transition-all duration-150"
          >
            <MapPin size={12} />
            Maps
          </a>
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-[var(--text-primary)] hover:bg-slate-200 active:scale-95 transition-all duration-150"
          >
            <Navigation size={12} />
            Waze
          </a>
        </div>
      </div>
    </Card>
  );
}

export function Places({ trip }: PlacesProps) {
  const updateTrip = useTripStore((s) => s.updateTrip);
  const [activeFilter, setActiveFilter] = useState<PlaceFilter>("restaurant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);

  const hasPlaces = trip.places && trip.places.length > 0;

  const filtered = useMemo(
    () => (trip.places ?? []).filter((p) => p.filter === activeFilter),
    [trip.places, activeFilter]
  );

  async function fetchPlaces() {
    setLoading(true);
    setError(null);
    setNotConfigured(false);
    try {
      const interestsParam = trip.interests?.length
        ? `&interests=${encodeURIComponent(trip.interests.join(","))}`
        : "";
      const res = await fetch(
        `/api/places?lat=${trip.destinationLat}&lng=${trip.destinationLng}${interestsParam}`
      );
      const json = await res.json();
      if (json.error === "PLACES_NOT_CONFIGURED") {
        setNotConfigured(true);
        return;
      }
      if (json.error) throw new Error(json.message ?? json.error);
      const updates: Partial<Trip> = { places: json.places };
      if (trip.aiSuggestions && !trip.aiSuggestions.groundedWithPlaces) {
        updates.aiSuggestions = undefined;
      }
      await updateTrip(trip.id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch places");
    } finally {
      setLoading(false);
    }
  }

  // No coordinates
  if (!trip.destinationLat || !trip.destinationLng) {
    return (
      <EmptyState
        title="No location data"
        description="This trip was created without coordinates. Re-create it and pick a city from the autocomplete to enable nearby places."
      />
    );
  }

  // API key not configured
  if (notConfigured) {
    return (
      <EmptyState
        title="Places not configured"
        description={
          <>
            Add a <span className="font-mono text-xs bg-slate-100 px-1 rounded">YELP_API_KEY</span>{" "}
            to your <span className="font-mono text-xs bg-slate-100 px-1 rounded">.env.local</span> to enable this feature.
          </>
        }
      />
    );
  }

  // First load — not fetched yet
  if (!hasPlaces && !loading && !error) {
    return (
      <EmptyState
        title={`Discover ${trip.destination}`}
        description="Find restaurants, attractions, shops and more nearby."
        action={<Button onClick={fetchPlaces}>Find Places</Button>}
      />
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="px-4 py-4 space-y-3 animate-fade-in">
        <Skeleton className="h-12 w-full rounded-2xl" />
        {Array.from({ length: 5 }).map((_, i) => (
          <PlaceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description={error}
        action={<Button variant="secondary" onClick={fetchPlaces}>Try Again</Button>}
      />
    );
  }

  const activeCat = CATEGORIES.find((c) => c.id === activeFilter);

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in pb-24">
      {/* Category filter bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        {CATEGORIES.map(({ id, label, icon: Icon, color }) => {
          const count = (trip.places ?? []).filter((p) => p.filter === id).length;
          const isActive = activeFilter === id;
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-md scale-[1.03]"
                  : "bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:bg-orange-50 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              <Icon size={14} className={isActive ? "text-white" : color} />
              {label}
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                    isActive ? "bg-white/25 text-white" : "bg-slate-100 text-[var(--text-secondary)]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result header with refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {activeCat && <activeCat.icon size={13} className={activeCat.color} />}
          <p className="text-xs font-semibold text-[var(--text-secondary)]">
            {filtered.length > 0
              ? `${filtered.length} place${filtered.length !== 1 ? "s" : ""}`
              : "No places in this category"}
          </p>
        </div>
        <button
          onClick={fetchPlaces}
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] bg-[var(--bg-secondary)] hover:bg-orange-50 border border-[var(--border)] px-2.5 py-1.5 rounded-xl transition-colors"
          type="button"
        >
          <RefreshCw size={11} />
          Refresh
        </button>
      </div>

      {/* Place cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3">
            <MapPin size={22} className="text-[var(--primary)]" />
          </div>
          <p className="text-sm font-semibold text-[var(--text-secondary)]">No places found here</p>
          <p className="text-xs text-[var(--text-secondary)] opacity-60 mt-1">Try a different category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
