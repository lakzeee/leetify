import { PlanQuestion } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  planName: string;
  description: string;
  tags: string;
  isPublic: boolean;
  questions?: PlanQuestion[];
  addedQuestions?: PlanQuestion[];
  questionsString: string;
};

type Actions = {
  setPlanName: (name: string) => void;
  setDescription: (description: string) => void;
  setTags: (tags: string) => void;
  setIsPublic: (isPublic: boolean) => void;
  setQuestions: (data: PlanQuestion[]) => void;
  resetQuestions: () => void;
  addToAddedQuestions: (
    data: PlanQuestion,
    groupName: string | undefined,
  ) => void;
  // updateGroupRank: (questionNo: number, increase: boolean) => void;
  removeFromAddedQuestions: (questionNo: number) => void;
};

const initialState: State = {
  planName: "",
  description: "",
  tags: "",
  isPublic: false,
  questions: undefined,
  addedQuestions: [],
  questionsString: "",
};

export const useCreatePlanStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,
    setPlanName: (name) => set({ planName: name }),
    setDescription: (description) => set({ description: description }),
    setTags: (tags) => set({ tags: tags }),
    setIsPublic: (isPublic) => set({ isPublic: isPublic }),
    resetQuestions: () => set({ questions: undefined }),
    setQuestions: (questions) => set({ questions: questions }),
    addToAddedQuestions: (question, groupName) =>
      set((state) => {
        const addedQuestions = Array.isArray(state.addedQuestions)
          ? state.addedQuestions
          : [];

        let maxGroupRank = 0;
        if (addedQuestions && addedQuestions.length > 0) {
          maxGroupRank = (
            addedQuestions.filter(
              (q) => q.groupName === groupName,
            ) as PlanQuestion[]
          ).reduce((maxRank: number, q: PlanQuestion) => {
            return q.groupRank && q.groupRank > maxRank ? q.groupRank : maxRank;
          }, 0);
        }
        const newGroupRank = maxGroupRank + 1;

        const existingQuestionIndex = addedQuestions.findIndex(
          (q) => q.leetCodeNo == question.leetCodeNo,
        );
        if (existingQuestionIndex !== -1) {
          addedQuestions[existingQuestionIndex].groupName = groupName;
          addedQuestions[existingQuestionIndex].groupRank = newGroupRank;
        } else {
          question.groupName = groupName;
          question.groupRank = newGroupRank;
          addedQuestions.push(question);
        }
        return { addedQuestions };
      }),
    removeFromAddedQuestions: (questionNo) =>
      set((state) => {
        const addedQuestions = Array.isArray(state.addedQuestions)
          ? state.addedQuestions
          : [];
        const updatedAddedQuestions = addedQuestions.filter(
          (q) => q.leetCodeNo !== questionNo,
        );
        return { addedQuestions: updatedAddedQuestions };
      }),
  }),
  shallow,
);
