import { create } from "zustand";

type Store = {
  tableKey: number;
  inc: () => void;
};

export const useTablekeyStore = create<Store>()((set) => ({
  tableKey: 1,
  inc: () => set((state) => ({ tableKey: state.tableKey + 1 })),
}));
