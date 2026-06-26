import { create } from "zustand";

type Bank = {
  id: string;
  code: string;
  name: string;
  bg: string;
  color: string;
};

type TransferStore = {
  selectedBank: Bank | null;
  accountNumber: string;
  amount: string;
  narration: string;
  setSelectedBank: (bank: Bank | null) => void;
  setAccountNumber: (accountNumber: string) => void;
  setAmount: (amount: string) => void;
  setNarration: (narration: string) => void;
  reset: () => void;
};

export const useTransferStore = create<TransferStore>((set) => ({
  selectedBank: null,
  accountNumber: "",
  amount: "",
  narration: "",
  setSelectedBank: (bank) => set({ selectedBank: bank }),
  setAccountNumber: (accountNumber) => set({ accountNumber }),
  setAmount: (amount) => set({ amount }),
  setNarration: (narration) => set({ narration }),
  reset: () =>
    set({
      selectedBank: null,
      accountNumber: "",
      amount: "",
      narration: "",
    }),
}));
