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
};

const initialState: State = {
  planName: "",
  description: "",
  tags: "",
  isPublic: false,
  questions: undefined,
  addedQuestions: undefined,
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
        const existingQuestionIndex = addedQuestions.findIndex(
          (q) => q.leetCodeNo == question.leetCodeNo,
        );
        if (existingQuestionIndex !== -1) {
          addedQuestions[existingQuestionIndex].groupName = groupName;
        } else {
          question.groupName = groupName;
          addedQuestions.push(question);
        }
        return { addedQuestions };
      }),
  }),
  shallow,
);
