import { create } from "zustand";

export type BillCategory = "electricity" | "cable" | "internet" | "water";

export type BillProvider = {
  id: string;
  name: string;
};

type BillsStore = {
  category: BillCategory | null;
  selectedProvider: BillProvider | null;
  setCategory: (category: BillCategory | null) => void;
  setSelectedProvider: (provider: BillProvider | null) => void;
  reset: () => void;
};

export const useBillsStore = create<BillsStore>((set) => ({
  category: null,
  selectedProvider: null,
  setCategory: (category) => set({ category }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  reset: () =>
    set({
      category: null,
      selectedProvider: null,
    }),
}));
