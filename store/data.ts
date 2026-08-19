import { create } from "zustand";
import type { Network } from "../constants/networks";

export type DataPlan = {
  id: string;
  label: string; // e.g. "1GB"
  validity: string; // e.g. "30 days"
  price: number; // in naira
  popular?: boolean;
};

// A single reusable catalogue keeps the prototype simple; swap for a
// per-network lookup once real plan data is wired in.
export const DATA_PLANS: DataPlan[] = [
  { id: "d1", label: "500MB", validity: "7 days", price: 500 },
  { id: "d2", label: "1GB", validity: "30 days", price: 1000, popular: true },
  { id: "d3", label: "2GB", validity: "30 days", price: 2000 },
  { id: "d4", label: "3GB", validity: "30 days", price: 2500 },
  { id: "d5", label: "5GB", validity: "30 days", price: 3500 },
  { id: "d6", label: "10GB", validity: "30 days", price: 5000 },
];

type DataStore = {
  network: Network | null;
  phoneNumber: string;
  selectedPlan: DataPlan | null;
  setNetwork: (network: Network | null) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSelectedPlan: (plan: DataPlan | null) => void;
  reset: () => void;
};

export const useDataStore = create<DataStore>((set) => ({
  network: null,
  phoneNumber: "",
  selectedPlan: null,
  setNetwork: (network) => set({ network }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  reset: () =>
    set({
      network: null,
      phoneNumber: "",
      selectedPlan: null,
    }),
}));
