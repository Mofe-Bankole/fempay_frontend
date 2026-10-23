import { create } from "zustand";

export type BillCategory = "electricity" | "cable" | "internet" | "water";

export type BillProvider = {
  id: string;
  name: string;
};

export type CablePlan = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
};

type BillsStore = {
  category: BillCategory | null;
  selectedProvider: BillProvider | null;
  meterNumber: string;
  phoneNumber: string;
  smartcardNumber: string;
  customerReference: string;
  accountId: string;
  amount: string;
  selectedPlan: CablePlan | null;
  setCategory: (category: BillCategory | null) => void;
  setSelectedProvider: (provider: BillProvider | null) => void;
  setMeterNumber: (meterNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSmartcardNumber: (smartcardNumber: string) => void;
  setCustomerReference: (customerReference: string) => void;
  setAccountId: (accountId: string) => void;
  setAmount: (amount: string) => void;
  setSelectedPlan: (plan: CablePlan | null) => void;
  reset: () => void;
};

export const useBillsStore = create<BillsStore>((set) => ({
  category: "electricity",
  selectedProvider: { id: "ei", name: "Ikeja Electricity" },
  meterNumber: "08012345678",
  phoneNumber: "08012345678",
  smartcardNumber: "08012345678",
  customerReference: "",
  accountId: "",
  amount: "1000",
  selectedPlan: null,
  setCategory: (category) => set({ category }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setMeterNumber: (meterNumber) => set({ meterNumber }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setSmartcardNumber: (smartcardNumber) => set({ smartcardNumber }),
  setCustomerReference: (customerReference) => set({ customerReference }),
  setAccountId: (accountId) => set({ accountId }),
  setAmount: (amount) => set({ amount }),
  setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
  reset: () =>
    set({
      category: null,
      selectedProvider: null,
      meterNumber: "",
      phoneNumber: "",
      smartcardNumber: "",
      customerReference: "",
      accountId: "",
      amount: "",
      selectedPlan: null,
    }),
}));
