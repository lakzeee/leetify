import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { PlanQuestionRes } from "@/types";

type State = {
  progressQuestionDetails?: PlanQuestionRes;
  dummyState: number;
};

type Actions = {
  setProgressQuestionDetails: (data: PlanQuestionRes) => void;
  incDummy: () => void;
  updateProgressStatus: (
    leetCodeNo: number,
    statusName: string,
    columnId: string,
    tags: string,
  ) => void;
};

const initialState: State = {
  progressQuestionDetails: undefined,
  dummyState: 0,
};

export const useProgressStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,
    setProgressQuestionDetails: (data) => {
      set((state) => ({
        progressQuestionDetails: data,
      }));
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
    incDummy: () => {
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
    updateProgressStatus: (leetCodeNo, statusName, columnId, tags) => {
      set((state) => {
        if (
          state.progressQuestionDetails &&
          state.progressQuestionDetails.questionList
        ) {
          const updatedQuestionList =
            state.progressQuestionDetails.questionList.map((question) => {
              if (question.leetCodeNo === leetCodeNo) {
                // Update the statusName and columnId for the matching question
                return {
                  ...question,
                  statusName: statusName,
                  columnId: columnId,
                  tags: tags,
                };
              }
              return question;
            });

          // Update the progressQuestionDetails with the updated question list
          return {
            progressQuestionDetails: {
              ...state.progressQuestionDetails,
              questionList: updatedQuestionList,
            },
          };
        }
        // Return the state as is if progressQuestionDetails or questionList is undefined
        return state;
      });
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
  }),
  shallow,
);
