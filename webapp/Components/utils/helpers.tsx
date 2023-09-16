import { PlanQuestion } from "@/types";

export function groupPlanQuestionsByGroupName(
  questions: PlanQuestion[],
): Record<string, PlanQuestion[]> {
  const groups: Record<string, PlanQuestion[]> = {};

  // Sort questions by groupOrder and groupRank within each group
  questions.sort((a, b) => {
    const groupNameA = a.groupName || "Ungrouped";
    const groupNameB = b.groupName || "Ungrouped";

    if (groupNameA !== groupNameB) {
      // If the group names are different, sort by group name
      return groupNameA.localeCompare(groupNameB);
    } else {
      // If the group names are the same, first sort by group order
      const groupOrderDiff = (a.groupOrder || 0) - (b.groupOrder || 0);
      if (groupOrderDiff !== 0) {
        return groupOrderDiff;
      } else {
        // If group order is the same, sort by group rank
        return (a.groupRank || 0) - (b.groupRank || 0);
      }
    }
  });

  questions.forEach((question) => {
    const groupName = question.groupName || "Ungrouped";
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(question);
  });

  return groups;
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
