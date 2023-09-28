import { create } from "zustand";

type Store = {
  isNightMode: boolean;
  toggleNightMode: (mode: boolean) => void;
};

export const useThemeStore = create<Store>()((set) => ({
  isNightMode: false,
  toggleNightMode: (mode) => set(() => ({ isNightMode: mode })),
}));
