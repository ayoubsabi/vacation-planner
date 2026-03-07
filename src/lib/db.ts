import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Trip, Settings } from "./types";

interface VacationPlannerDB extends DBSchema {
  trips: {
    key: string;
    value: Trip;
    indexes: { "by-createdAt": string };
  };
  settings: {
    key: string;
    value: { key: string; value: unknown };
  };
}

const DB_NAME = "vacation-planner";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<VacationPlannerDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<VacationPlannerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("trips")) {
          const store = db.createObjectStore("trips", { keyPath: "id" });
          store.createIndex("by-createdAt", "createdAt");
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllTrips(): Promise<Trip[]> {
  try {
    const db = await getDB();
    return db.getAll("trips");
  } catch {
    return getTripsFromLocalStorage();
  }
}

export async function saveTrip(trip: Trip): Promise<void> {
  try {
    const db = await getDB();
    await db.put("trips", trip);
  } catch {
    saveTripToLocalStorage(trip);
  }
}

export async function deleteTrip(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete("trips", id);
  } catch {
    deleteTripFromLocalStorage(id);
  }
}

export async function getSetting<T>(key: string): Promise<T | undefined> {
  try {
    const db = await getDB();
    const record = await db.get("settings", key);
    return record?.value as T;
  } catch {
    try {
      const raw = localStorage.getItem(`setting_${key}`);
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  }
}

export async function setSetting(key: string, value: unknown): Promise<void> {
  try {
    const db = await getDB();
    await db.put("settings", { key, value });
  } catch {
    try {
      localStorage.setItem(`setting_${key}`, JSON.stringify(value));
    } catch {
      // ignore
    }
  }
}

// LocalStorage fallback
function getTripsFromLocalStorage(): Trip[] {
  try {
    const raw = localStorage.getItem("trips");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTripToLocalStorage(trip: Trip): void {
  try {
    const trips = getTripsFromLocalStorage();
    const idx = trips.findIndex((t) => t.id === trip.id);
    if (idx >= 0) trips[idx] = trip;
    else trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));
  } catch {
    // ignore
  }
}

function deleteTripFromLocalStorage(id: string): void {
  try {
    const trips = getTripsFromLocalStorage().filter((t) => t.id !== id);
    localStorage.setItem("trips", JSON.stringify(trips));
  } catch {
    // ignore
  }
}

export async function exportAllData(): Promise<{ trips: Trip[]; settings: Settings }> {
  const trips = await getAllTrips();
  const settings = (await getSetting<Settings>("preferences")) ?? {
    baseCurrency: "USD",
    dateFormat: "MM/DD/YYYY" as const,
    theme: "auto" as const,
  };
  return { trips, settings };
}

export async function importAllData(data: { trips: Trip[]; settings?: Settings }): Promise<void> {
  for (const trip of data.trips) {
    await saveTrip(trip);
  }
  if (data.settings) {
    await setSetting("preferences", data.settings);
  }
}

export async function clearAllData(): Promise<void> {
  try {
    const db = await getDB();
    await db.clear("trips");
    await db.clear("settings");
  } catch {
    localStorage.removeItem("trips");
    localStorage.removeItem("setting_preferences");
  }
}
