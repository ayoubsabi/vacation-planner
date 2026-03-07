import { create } from "zustand";
import { Settings } from "@/lib/types";
import { getSetting, setSetting } from "@/lib/db";

interface SettingsStore extends Settings {
  loaded: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
}

const DEFAULT_SETTINGS: Settings = {
  baseCurrency: "USD",
  dateFormat: "MM/DD/YYYY",
  theme: "auto",
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_SETTINGS,
  loaded: false,

  loadSettings: async () => {
    const saved = await getSetting<Settings>("preferences");
    set({ ...(saved ?? DEFAULT_SETTINGS), loaded: true });
  },

  updateSettings: async (updates) => {
    const current: Settings = {
      baseCurrency: get().baseCurrency,
      dateFormat: get().dateFormat,
      theme: get().theme,
    };
    const updated = { ...current, ...updates };
    set(updated);
    await setSetting("preferences", updated);
  },
}));
