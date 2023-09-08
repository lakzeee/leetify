import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  filterBy?: string;
  sortBy?: string;
  sortOrder?: string;
  difficulty?: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
};

const initialState: State = {
  pageNumber: 2,
  pageSize: 12,
  pageCount: 1,
  filterBy: undefined,
  sortBy: undefined,
  sortOrder: undefined,
  difficulty: undefined,
};

export const useQuestionsSearchParamsStore = createWithEqualityFn<
  State & Actions
>()(
  (set) => ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
      set((state) => {
        if (newParams.pageNumber) {
          return { ...state, pageNumber: newParams.pageNumber };
        } else {
          return { ...state, ...newParams, pageNumber: 1 };
        }
      });
    },

    reset: () => set(initialState),
  }),
  shallow,
);
