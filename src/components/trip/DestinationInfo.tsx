"use client";
import { useState, useEffect, useRef } from "react";
import { BookOpen, RefreshCw, AlertTriangle, Info } from "lucide-react";
import { Trip } from "@/lib/types";
import { useTripStore } from "@/store/tripStore";
import { Button } from "@/components/common/Button";
import { formatDate } from "@/lib/utils";

interface DestinationInfoProps {
  trip: Trip;
  autoGenerate?: boolean;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-semibold text-[var(--text-primary)]">{part.slice(2, -2)}</strong>
      : part
  );
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h3 key={i} className="font-bold text-[var(--text-primary)] text-sm mt-5 mb-2 first:mt-0 flex items-center gap-1.5">
          <span className="w-1 h-4 rounded-full bg-blue-500 inline-block shrink-0" />
          {line.slice(3)}
        </h3>
      );
    }
    if (line.match(/^[-*]\s+/)) {
      return (
        <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed pl-3 flex gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
          <span>{renderInline(line.replace(/^[-*]\s+/, ""))}</span>
        </p>
      );
    }
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });
}

export function DestinationInfo({ trip, autoGenerate }: DestinationInfoProps) {
  const updateTrip = useTripStore((s) => s.updateTrip);
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (trip.destinationInfo?.content) {
      setStreamedText(trip.destinationInfo.content);
    } else if (autoGenerate) {
      fetchInfo();
    }
  }, [trip.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchInfo() {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsStreaming(true);
    setStreamedText("");
    setError(null);
    setNotConfigured(false);

    try {
      const res = await fetch("/api/destination-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ destination: trip.destination }),
      });

      if (res.status === 503) {
        setNotConfigured(true);
        setIsStreaming(false);
        return;
      }
      if (!res.ok) {
        setError("Failed to load destination info. Please try again.");
        setIsStreaming(false);
        return;
      }

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
        destinationInfo: {
          content: fullText,
          generatedAt: new Date().toISOString(),
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
          <p className="text-sm font-semibold text-blue-800">Destination Info not configured</p>
          <p className="text-xs text-blue-600 mt-1">
            Add <code className="bg-blue-100 px-1 rounded">NVIDIA_API_KEY</code> to{" "}
            <code className="bg-blue-100 px-1 rounded">.env.local</code> to enable destination overviews.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <BookOpen size={15} className="text-white" />
          </div>
          <span className="font-bold text-sm text-[var(--text-primary)]">Destination Info</span>
        </div>
        {streamedText && !isStreaming && (
          <button
            onClick={fetchInfo}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-blue-600 bg-white/70 hover:bg-white border border-blue-200 px-3 py-1.5 rounded-xl transition-colors"
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
            Discover the history, culture, and travel tips for{" "}
            <span className="font-semibold text-[var(--text-primary)]">{trip.destination}</span>.
          </p>
          <Button onClick={fetchInfo} className="mt-3 !bg-blue-600 hover:!bg-blue-700">
            <BookOpen size={14} className="mr-1.5" />
            Get Destination Info
          </Button>
        </div>
      )}

      {/* Streaming indicator */}
      {isStreaming && !streamedText && (
        <div className="flex items-center gap-3 py-5">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <span className="text-sm text-[var(--text-secondary)]">Loading destination info…</span>
        </div>
      )}

      {/* Content */}
      {streamedText && (
        <div className="mt-1">
          {renderContent(streamedText)}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-blue-500 animate-pulse ml-0.5 rounded-sm" />
          )}
          {!isStreaming && trip.destinationInfo?.generatedAt && (
            <p className="text-xs text-[var(--text-secondary)] opacity-60 mt-4 pt-3 border-t border-blue-100">
              Generated {formatDate(trip.destinationInfo.generatedAt)}
            </p>
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
              onClick={fetchInfo}
              className="text-xs font-semibold text-blue-600 hover:underline mt-1"
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
