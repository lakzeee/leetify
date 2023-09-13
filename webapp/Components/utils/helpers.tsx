import { PlanQuestion } from "@/types";

export function groupPlanQuestionsByGroupName(
  questions: PlanQuestion[],
): Record<string, PlanQuestion[]> {
  return questions.reduce(
    (groups, question) => {
      const groupName = question.groupName || "Ungrouped"; // Use 'Ungrouped' if groupName is undefined
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(question);
      return groups;
    },
    {} as Record<string, PlanQuestion[]>,
  );
}
