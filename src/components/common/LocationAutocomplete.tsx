"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { DESTINATION_SUGGESTIONS } from "@/lib/constants";

interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    country?: string;
  };
  lat: string;
  lon: string;
}

interface DisplayResult {
  id: string;
  cityName: string;
  displayLabel: string;
  lat?: number;
  lng?: number;
}

export interface LocationSelection {
  cityName: string;
  displayLabel: string;
  lat?: number;
  lng?: number;
}

interface LocationAutocompleteProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (sel: LocationSelection) => void;
  error?: string;
  autoFocus?: boolean;
}

function extractCityName(r: NominatimResult): string {
  return (
    r.address.city ??
    r.address.town ??
    r.address.village ??
    r.address.municipality ??
    r.display_name.split(",")[0].trim()
  );
}

function toDisplayResult(r: NominatimResult): DisplayResult {
  const cityName = extractCityName(r);
  const country = r.address.country ?? "";
  return {
    id: String(r.place_id),
    cityName,
    displayLabel: country ? `${cityName}, ${country}` : cityName,
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lon),
  };
}

function fallbackResults(q: string): DisplayResult[] {
  return DESTINATION_SUGGESTIONS.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  )
    .slice(0, 7)
    .map((d) => ({
      id: d.name,
      cityName: d.name.split(",")[0].trim(),
      displayLabel: d.name,
      lat: undefined,
      lng: undefined,
    }));
}

export function LocationAutocomplete({
  label,
  value,
  onChange,
  onSelect,
  error,
  autoFocus,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<DisplayResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const skipFetchRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputId = label?.toLowerCase().replace(/\s+/g, "-") ?? "location-input";

  // Sync query when value changes from parent (e.g. wizard reset)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounced fetch
  useEffect(() => {
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => fetchSuggestions(query, ctrl.signal), 350);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchSuggestions(q: string, signal: AbortSignal) {
    setIsLoading(true);
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", q);
      url.searchParams.set("format", "json");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("limit", "10");
      url.searchParams.set("featuretype", "city");

      const res = await fetch(url.toString(), {
        signal,
        headers: {
          "Accept-Language": "en",
          "User-Agent": "VacationPlanner/1.0",
        },
      });

      if (!res.ok) throw new Error("Network error");
      const data: NominatimResult[] = await res.json();

      const filtered = data
        .filter(
          (r) =>
            r.address.city ||
            r.address.town ||
            r.address.village ||
            r.address.municipality
        )
        .slice(0, 7)
        .map(toDisplayResult);

      setResults(filtered);
      setIsOpen(filtered.length > 0);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      // Network failure — fall back to hardcoded suggestions
      const fb = fallbackResults(q);
      setResults(fb);
      setIsOpen(fb.length > 0);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelect(result: DisplayResult) {
    skipFetchRef.current = true;
    setQuery(result.displayLabel);
    setIsOpen(false);
    setActiveIndex(-1);
    setResults([]);
    onChange(result.displayLabel);
    onSelect({
      cityName: result.cityName,
      displayLabel: result.displayLabel,
      lat: result.lat,
      lng: result.lng,
    });
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, results.length - 1);
        setActiveIndex(next);
        listRef.current
          ?.children[next]
          ?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        setActiveIndex(prev);
        listRef.current
          ?.children[prev]
          ?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(results[activeIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    },
    [isOpen, results, activeIndex] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Click outside to close
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <div className="flex flex-col gap-1 relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="location-listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `location-option-${results[activeIndex]?.id}` : undefined
          }
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            onChange(val);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Paris, France"
          className={cn(
            "w-full px-3 py-2.5 pr-8 rounded-xl border border-[var(--border)] bg-white text-[var(--text-primary)] text-sm",
            "placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]",
            "transition-colors duration-150",
            error && "border-[var(--danger)] focus:ring-[var(--danger)]/30 focus:border-[var(--danger)]"
          )}
        />
        {isLoading && (
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--primary)]"
          >
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin block" />
          </span>
        )}
      </div>

      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

      {isOpen && results.length > 0 && (
        <ul
          id="location-listbox"
          ref={listRef}
          role="listbox"
          className="absolute top-full left-0 right-0 bg-white border border-[var(--border)] rounded-xl shadow-lg z-10 mt-1 overflow-hidden"
          style={{ top: "calc(100% + 2px)" }}
        >
          {results.map((result, i) => (
            <li
              key={result.id}
              id={`location-option-${result.id}`}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "px-4 py-3 text-sm flex items-center gap-2 cursor-pointer transition-colors",
                i === activeIndex ? "bg-slate-50" : "hover:bg-slate-50"
              )}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                handleSelect(result);
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <MapPin size={14} className="shrink-0 text-[var(--primary)]" />
              <span>
                <span className="font-medium text-[var(--text-primary)]">
                  {result.cityName}
                </span>
                {result.displayLabel !== result.cityName && (
                  <span className="text-[var(--text-secondary)]">
                    {result.displayLabel.slice(result.cityName.length)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
