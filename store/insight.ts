import { create } from "zustand";

type InsightStore = {
  balance: number;
  dailyLimit: string;
  weeklyBudget: number;
  totalSpent: number;
  savings: number;
  setDailyLimit: (limit: string) => void;
  setWeeklyBudget: (budget: number) => void;
  setTotalSpent: (spent: number) => void;
  setSavings: (savings: number) => void;
  reset: () => void;
};

export const useInsightStore = create<InsightStore>((set) => ({
  balance: 100000,
  dailyLimit: "",
  weeklyBudget: 25000,
  totalSpent: 0,
  savings: 0,
  setDailyLimit: (limit) => set({ dailyLimit: limit }),
  setWeeklyBudget: (budget) => set({ weeklyBudget: budget }),
  setTotalSpent: (spent) => set({ totalSpent: spent }),
  setSavings: (savings) => set({ savings }),
  reset: () =>
    set({
      balance: 100000,
      dailyLimit: "",
      weeklyBudget: 25000,
      totalSpent: 0,
      savings: 0,
    }),
}));
