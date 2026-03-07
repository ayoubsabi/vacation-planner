import { create } from "zustand";

type ActiveTab = "dashboard" | "charts" | "split" | "settings";

interface UIStore {
  isAddExpenseOpen: boolean;
  editingExpenseId: string | null;
  isShareOpen: boolean;
  activeTab: ActiveTab;
  openAddExpense: (expenseId?: string) => void;
  closeAddExpense: () => void;
  openShare: () => void;
  closeShare: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAddExpenseOpen: false,
  editingExpenseId: null,
  isShareOpen: false,
  activeTab: "dashboard",

  openAddExpense: (expenseId?: string) =>
    set({ isAddExpenseOpen: true, editingExpenseId: expenseId ?? null }),
  closeAddExpense: () => set({ isAddExpenseOpen: false, editingExpenseId: null }),
  openShare: () => set({ isShareOpen: true }),
  closeShare: () => set({ isShareOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
