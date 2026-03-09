"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  useEffect(() => {
    if (!adsEnabled || !publisherId || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [slot]);

  if (!adsEnabled) return null;

  // Dev placeholder when AdSense is not configured
  if (!publisherId || !slot) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-1 py-6 px-4 min-h-[90px]",
          className
        )}
        aria-hidden="true"
      >
        <span className="text-xs font-medium text-[var(--text-secondary)] opacity-50">
          Ad Space
        </span>
        <span className="text-[10px] text-[var(--text-secondary)] opacity-40">
          configure AdSense to activate
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] min-h-[100px]",
        className
      )}
    >
      <span className="absolute top-2 right-3 text-[10px] text-[var(--text-secondary)] uppercase tracking-widest opacity-50 pointer-events-none select-none z-10">
        Sponsored
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
