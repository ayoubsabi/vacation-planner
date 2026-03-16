"use client";
import { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, AlertTriangle, Info, MapPin } from "lucide-react";
import { Trip, TripInterest } from "@/lib/types";
import { useTripStore } from "@/store/tripStore";
import { Button } from "@/components/common/Button";
import { formatDate } from "@/lib/utils";

interface AISuggestionsProps {
  trip: Trip;
}

function arraysEqual(a: TripInterest[], b: TripInterest[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h3 key={i} className="font-bold text-[var(--text-primary)] text-sm mt-5 mb-2 first:mt-0 flex items-center gap-1.5">
          <span className="w-1 h-4 rounded-full bg-[var(--primary)] inline-block shrink-0" />
          {line.slice(3)}
        </h3>
      );
    }
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {line}
      </p>
    );
  });
}

export function AISuggestions({ trip }: AISuggestionsProps) {
  const updateTrip = useTripStore((s) => s.updateTrip);
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (trip.aiSuggestions?.content) {
      const cachedInterests = trip.aiSuggestions.interests ?? [];
      const currentInterests = trip.interests ?? [];
      const interestsMatch = arraysEqual(cachedInterests, currentInterests);
      const placesAvailable = (trip.places?.length ?? 0) > 0;
      const cacheIsStale = placesAvailable && !trip.aiSuggestions.groundedWithPlaces;
      if (interestsMatch && !cacheIsStale) {
        setStreamedText(trip.aiSuggestions.content);
      }
    }
  }, [trip.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchSuggestions() {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsStreaming(true);
    setStreamedText("");
    setError(null);
    setNotConfigured(false);

    try {
      const res = await fetch("/api/ai-suggestions", {
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
        setError("Failed to generate suggestions. Please try again.");
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
        aiSuggestions: {
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

  if (notConfigured) {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">AI Suggestions not configured</p>
          <p className="text-xs text-blue-600 mt-1">
            Add <code className="bg-blue-100 px-1 rounded">NVIDIA_API_KEY</code> to{" "}
            <code className="bg-blue-100 px-1 rounded">.env.local</code> to enable personalized activity suggestions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-orange-600 flex items-center justify-center shadow-sm">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-bold text-sm text-[var(--text-primary)]">AI Suggestions</span>
        </div>
        {streamedText && !isStreaming && (
          <button
            onClick={fetchSuggestions}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] bg-white/70 hover:bg-white border border-orange-200 px-3 py-1.5 rounded-xl transition-colors"
            type="button"
          >
            <RefreshCw size={12} />
            Regenerate
          </button>
        )}
      </div>

      {/* Empty state */}
      {!streamedText && !isStreaming && !error && (
        <div className="flex flex-col items-center py-6 text-center">
          <p className="text-sm text-[var(--text-secondary)] mb-1 leading-relaxed">
            Get personalized activities, tips, and a budget breakdown for{" "}
            <span className="font-semibold text-[var(--text-primary)]">{trip.destination}</span>.
          </p>
          {(!trip.interests || trip.interests.length === 0) && (
            <p className="text-xs text-[var(--text-secondary)] mb-4 opacity-70 bg-white/60 rounded-xl px-3 py-2 mt-2 border border-orange-100">
              Tip: add interests in settings for more personalized suggestions.
            </p>
          )}
          <Button onClick={fetchSuggestions} className="mt-2">
            <Sparkles size={14} className="mr-1.5" />
            Get AI Suggestions
          </Button>
        </div>
      )}

      {/* Streaming indicator */}
      {isStreaming && !streamedText && (
        <div className="flex items-center gap-3 py-5">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-orange-200" />
            <div className="absolute inset-0 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
          </div>
          <span className="text-sm text-[var(--text-secondary)]">Generating suggestions…</span>
        </div>
      )}

      {/* Content */}
      {streamedText && (
        <div className="mt-1">
          {renderContent(streamedText)}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-[var(--primary)] animate-pulse ml-0.5 rounded-sm" />
          )}
          {!isStreaming && trip.aiSuggestions?.generatedAt && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-orange-100 flex-wrap gap-2">
              <p className="text-xs text-[var(--text-secondary)] opacity-60">
                Generated {formatDate(trip.aiSuggestions.generatedAt)}
              </p>
              {trip.aiSuggestions.groundedWithPlaces && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <MapPin size={9} />
                  Based on real nearby places
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 py-2">
          <AlertTriangle size={16} className="text-[var(--danger)] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[var(--danger)]">{error}</p>
            <button
              onClick={fetchSuggestions}
              className="text-xs font-semibold text-[var(--primary)] hover:underline mt-1"
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
