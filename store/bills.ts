import { create } from "zustand";

export type BillCategory = "electricity" | "cable" | "internet" | "water";

export type BillProvider = {
  id: string;
  name: string;
};

type BillsStore = {
  category: BillCategory | null;
  selectedProvider: BillProvider | null;
  meterNumber: string;
  phoneNumber: string;
  amount: string;
  setCategory: (category: BillCategory | null) => void;
  setSelectedProvider: (provider: BillProvider | null) => void;
  setMeterNumber: (meterNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setAmount: (amount: string) => void;
  reset: () => void;
};

export const useBillsStore = create<BillsStore>((set) => ({
  category: "electricity",
  selectedProvider: { id: "ei", name: "Ikeja Electricity" },
  meterNumber: "08012345678",
  phoneNumber: "08012345678",
  amount: "1000",
  setCategory: (category) => set({ category }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setMeterNumber: (meterNumber) => set({ meterNumber }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setAmount: (amount) => set({ amount }),
  reset: () =>
    set({
      category: null,
      selectedProvider: null,
      meterNumber: "",
      phoneNumber: "",
      amount: "",
    }),
}));
