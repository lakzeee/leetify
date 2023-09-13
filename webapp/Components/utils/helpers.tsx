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

export function generateRandomKey(length = 4) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomKey = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  return randomKey;
}
