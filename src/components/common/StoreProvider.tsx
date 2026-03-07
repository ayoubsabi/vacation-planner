"use client";
import { useEffect } from "react";
import { useTripStore } from "@/store/tripStore";
import { useSettingsStore } from "@/store/settingsStore";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const loadTrips = useTripStore((s) => s.loadTrips);
  const loadSettings = useSettingsStore((s) => s.loadSettings);

  useEffect(() => {
    loadTrips();
    loadSettings();
  }, [loadTrips, loadSettings]);

  return <>{children}</>;
}
