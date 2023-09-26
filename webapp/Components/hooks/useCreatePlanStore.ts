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
  dummyState: number;
};

type Actions = {
  setPlanName: (name: string) => void;
  setDescription: (description: string) => void;
  setTags: (tags: string) => void;
  setIsPublic: (isPublic: boolean) => void;
  setQuestions: (data: PlanQuestion[]) => void;
  resetQuestions: () => void;
  resetAddQuestions: () => void;
  addToAddedQuestions: (
    data: PlanQuestion,
    groupName: string | undefined,
  ) => void;
  // updateGroupRank: (questionNo: number, increase: boolean) => void;
  removeFromAddedQuestions: (questionNo: number) => void;
  setAddedQuestionsFromList: (data: PlanQuestion[]) => void;
};

const initialState: State = {
  planName: "",
  description: "",
  tags: "",
  isPublic: false,
  questions: [],
  addedQuestions: [],
  questionsString: "",
  dummyState: 0,
};

export const useCreatePlanStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,
    setPlanName: (name) => set({ planName: name }),
    setDescription: (description) => set({ description: description }),
    setTags: (tags) => set({ tags: tags }),
    setIsPublic: (isPublic) => set({ isPublic: isPublic }),
    resetQuestions: () => set({ questions: [] }),
    resetAddQuestions: () => set({ addedQuestions: [] }),
    setQuestions: (questions) => set({ questions: questions }),
    setAddedQuestionsFromList: (questionList) =>
      set({ addedQuestions: questionList }),
    addToAddedQuestions: (question, groupName) => {
      set((state) => {
        const addedQuestions = Array.isArray(state.addedQuestions)
          ? state.addedQuestions
          : [];
        if (!groupName) groupName = "Ungrouped";
        let isNewGroupName = true;
        if (addedQuestions.some((q) => q.groupName == groupName)) {
          isNewGroupName = false;
        }

        let maxGroupRank = 0;
        let maxGroupOrder = 0;
        let existingGroupOrder;
        // loop through question to find current max groupRank and max groupOrder
        if (addedQuestions && addedQuestions.length > 0) {
          maxGroupRank = (
            addedQuestions.filter(
              (q) => q.groupName === groupName,
            ) as PlanQuestion[]
          ).reduce((maxRank: number, q: PlanQuestion) => {
            return q.groupRank && q.groupRank > maxRank ? q.groupRank : maxRank;
          }, 0);
          maxGroupOrder = Math.max(
            ...addedQuestions.map((q) => q.groupOrder || 0),
          );
          const existingGroupQuestion = addedQuestions.findLast(
            (q) => q.groupName === groupName,
          );
          if (existingGroupQuestion) {
            existingGroupOrder = existingGroupQuestion.groupOrder;
          }
        }

        // check if question exist in list
        const existingQuestionIndex = addedQuestions.findIndex(
          (q) => q.leetCodeNo == question.leetCodeNo,
        );

        if (existingQuestionIndex !== -1) {
          // update properties of existing questions
          const existingQuestion = addedQuestions[existingQuestionIndex];

          existingQuestion.groupName = groupName;
          existingQuestion.groupRank = maxGroupRank + 1;
          existingQuestion.groupOrder = isNewGroupName
            ? maxGroupOrder + 1
            : existingGroupOrder;
        } else {
          // add new question
          question.groupName = groupName;
          question.groupOrder = isNewGroupName
            ? maxGroupOrder + 1
            : existingGroupOrder;

          question.groupRank = maxGroupRank + 1;
          addedQuestions.push(question);
        }
        return { addedQuestions };
      });
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
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
