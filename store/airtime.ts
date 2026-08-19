import { create } from "zustand";
import type { Network } from "../constants/networks";

type AirtimeStore = {
  network: Network | null;
  phoneNumber: string;
  amount: string;
  setNetwork: (network: Network | null) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setAmount: (amount: string) => void;
  reset: () => void;
};

export const useAirtimeStore = create<AirtimeStore>((set) => ({
  network: null,
  phoneNumber: "",
  amount: "",
  setNetwork: (network) => set({ network }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setAmount: (amount) => set({ amount }),
  reset: () =>
    set({
      network: null,
      phoneNumber: "",
      amount: "",
    }),
}));
