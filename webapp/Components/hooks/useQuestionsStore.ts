import { Question, PageResult } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  questions: Question[];
  totalCount: number;
  pageCount: number;
};

type Actions = {
  setData: (data: PageResult<Question>) => void;
};

const initialState: State = {
  questions: [],
  pageCount: 0,
  totalCount: 0,
};

export const useQuestionsStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,

    setData: (data: PageResult<Question>) => {
      set(() => ({
        questions: data.results,
        totalCount: data.totalCount,
        pageCount: data.pageCount,
      }));
    },
  }),
  shallow,
);
