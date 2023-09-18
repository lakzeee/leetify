import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  savedPlans: Set<string>;
};

type Actions = {
  setSavedPlans: (data: string[]) => void;
  addToSavedPlans: (data: string) => void;
  removeFromSavedPlans: (data: string) => void;
};

const initialState: State = {
  savedPlans: new Set<string>(),
};

export const useSavedPlansStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,

    setSavedPlans: (data) => {
      set((state) => ({ savedPlans: new Set(data) }));
    },
    addToSavedPlans: (data) => {
      set((state) => {
        const newSavedPlans = new Set(state.savedPlans);
        newSavedPlans.add(data);
        return { savedPlans: newSavedPlans };
      });
    },
    removeFromSavedPlans: (data) => {
      set((state) => {
        const newSavedPlans = new Set(state.savedPlans);
        newSavedPlans.delete(data);
        return { savedPlans: newSavedPlans };
      });
    },
  }),
  shallow,
);
