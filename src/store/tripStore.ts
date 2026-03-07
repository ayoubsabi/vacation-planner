import { create } from "zustand";
import { Trip, Expense, Traveler } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { getAllTrips, saveTrip, deleteTrip } from "@/lib/db";

interface TripStore {
  trips: Trip[];
  loaded: boolean;
  loadTrips: () => Promise<void>;
  addTrip: (trip: Omit<Trip, "id" | "createdAt" | "updatedAt" | "expenses">) => Promise<Trip>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  removeTrip: (id: string) => Promise<void>;
  getTrip: (id: string) => Trip | undefined;
  addExpense: (tripId: string, expense: Omit<Expense, "id" | "createdAt" | "tripId">) => Promise<void>;
  updateExpense: (tripId: string, expenseId: string, updates: Partial<Expense>) => Promise<void>;
  removeExpense: (tripId: string, expenseId: string) => Promise<void>;
  addTraveler: (tripId: string, traveler: Omit<Traveler, "id">) => Promise<void>;
  removeTraveler: (tripId: string, travelerId: string) => Promise<void>;
}

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  loaded: false,

  loadTrips: async () => {
    const trips = await getAllTrips();
    set({ trips, loaded: true });
  },

  addTrip: async (tripData) => {
    const now = new Date().toISOString();
    const trip: Trip = {
      ...tripData,
      id: generateId(),
      expenses: [],
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ trips: [trip, ...state.trips] }));
    await saveTrip(trip);
    return trip;
  },

  updateTrip: async (id, updates) => {
    const trips = get().trips.map((t) =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === id);
    if (updated) await saveTrip(updated);
  },

  removeTrip: async (id) => {
    set((state) => ({ trips: state.trips.filter((t) => t.id !== id) }));
    await deleteTrip(id);
  },

  getTrip: (id) => get().trips.find((t) => t.id === id),

  addExpense: async (tripId, expenseData) => {
    const now = new Date().toISOString();
    const expense: Expense = {
      ...expenseData,
      id: generateId(),
      tripId,
      createdAt: now,
    };
    const trips = get().trips.map((t) =>
      t.id === tripId
        ? { ...t, expenses: [...t.expenses, expense], updatedAt: now }
        : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === tripId);
    if (updated) await saveTrip(updated);
  },

  updateExpense: async (tripId, expenseId, updates) => {
    const now = new Date().toISOString();
    const trips = get().trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            expenses: t.expenses.map((e) => (e.id === expenseId ? { ...e, ...updates } : e)),
            updatedAt: now,
          }
        : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === tripId);
    if (updated) await saveTrip(updated);
  },

  removeExpense: async (tripId, expenseId) => {
    const now = new Date().toISOString();
    const trips = get().trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            expenses: t.expenses.filter((e) => e.id !== expenseId),
            updatedAt: now,
          }
        : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === tripId);
    if (updated) await saveTrip(updated);
  },

  addTraveler: async (tripId, travelerData) => {
    const traveler: Traveler = { ...travelerData, id: generateId() };
    const now = new Date().toISOString();
    const trips = get().trips.map((t) =>
      t.id === tripId
        ? { ...t, travelers: [...t.travelers, traveler], updatedAt: now }
        : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === tripId);
    if (updated) await saveTrip(updated);
  },

  removeTraveler: async (tripId, travelerId) => {
    const now = new Date().toISOString();
    const trips = get().trips.map((t) =>
      t.id === tripId
        ? {
            ...t,
            travelers: t.travelers.filter((tr) => tr.id !== travelerId),
            updatedAt: now,
          }
        : t
    );
    set({ trips });
    const updated = trips.find((t) => t.id === tripId);
    if (updated) await saveTrip(updated);
  },
}));
