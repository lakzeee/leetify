import {
  DndId,
  DndItem,
  PlanQuestion,
  PlanQuestionRes,
  ProgressRecord,
  SelectOption,
  StatusCount,
  TopicsFrequency,
} from "@/types";

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

export function convertDndItemsToOptions(dndItems: DndItem[]): SelectOption[] {
  // Use the map function to convert each DndItem to an Option
  return dndItems.map((dndItem) => {
    return {
      id: dndItem.id,
      value: dndItem.content,
      label: dndItem.content,
      columnId: dndItem.columnId,
    };
  }) as SelectOption[];
}

export function badgeColor(columnId: DndId) {
  if (columnId == "a") return "bg-gray-400";
  if (columnId == "b") return "bg-orange-400";
  if (columnId == "c") return "bg-green-400";
  return "bg-gray-400";
}

export function ConcatPlanDetailWithProgressData(
  planDetail: PlanQuestionRes,
  progressData: ProgressRecord[],
): PlanQuestionRes {
  if (!planDetail.questionList || !progressData) {
    return planDetail;
  }

  // Create a mapping of leetCodeNo to ProgressRecord for efficient lookup
  const progressMap = new Map<number, ProgressRecord>();
  for (const progressRecord of progressData) {
    if (progressRecord.leetCodeNo !== undefined) {
      progressMap.set(progressRecord.leetCodeNo, progressRecord);
    }
  }

  // Update each question in the planDetail with the corresponding progress record
  for (const question of planDetail.questionList) {
    const leetCodeNo = question.leetCodeNo;
    if (leetCodeNo !== undefined && progressMap.has(leetCodeNo)) {
      question.progressRecordId = progressMap.get(leetCodeNo)?.id;
      question.statusName = progressMap.get(leetCodeNo)?.statusName;
      question.columnId = progressMap.get(leetCodeNo)?.columnId;
      question.tags = progressMap.get(leetCodeNo)?.tags;
      question.updatedAt = progressMap.get(leetCodeNo)?.updatedAt;
    }
  }

  return planDetail;
}

export function countStatus(progressData?: PlanQuestion[]): StatusCount {
  // Initialize counts for each status type to zero
  const counts: StatusCount = {
    todo: 0,
    inProgress: 0,
    complete: 0,
  };
  if (!progressData || progressData.length === 0) return counts;

  // Create a lookup table to map columnId values to status types
  const columnIdToStatusType: { [columnId: string]: keyof StatusCount } = {
    a: "todo",
    b: "inProgress",
    c: "complete",
    // Add additional mappings for other columnId values if needed
  };

  // Iterate through the progressData array and count each status type
  for (const record of progressData) {
    const statusType = columnIdToStatusType[record.columnId || "unknown"];
    if (statusType) {
      counts[statusType]++;
    }
  }

  if (
    counts.todo + counts.inProgress + counts.complete !=
    progressData.length
  ) {
    counts.todo = progressData.length - counts.inProgress - counts.complete;
  }
  return counts;
}

export function getTopFrequentTopicsAndDifficulties(
  jsonObjects: PlanQuestion[],
): TopicsFrequency {
  const topicCounts: any = {};
  const topicDifficultyCounts = {
    Easy: Array(6).fill(0),
    Medium: Array(6).fill(0),
    Hard: Array(6).fill(0),
  };

  // Count the frequency of each topic and its corresponding difficulty
  for (const jsonObject of jsonObjects) {
    const topics = jsonObject.topics.split(",");
    const difficulty = jsonObject.difficulty;

    for (const topic of topics) {
      const trimmedTopic = topic.trim();

      if (topicCounts[trimmedTopic]) {
        topicCounts[trimmedTopic].count += 1;
        topicCounts[trimmedTopic].difficulty[difficulty] += 1;
      } else {
        topicCounts[trimmedTopic] = {
          count: 1,
          difficulty: {
            Easy: 0,
            Medium: 0,
            Hard: 0,
          },
        };
        topicCounts[trimmedTopic].difficulty[difficulty] += 1;
      }
    }
  }

  // Sort topics by frequency in descending order
  const sortedTopics = Object.keys(topicCounts).sort(
    (a, b) => topicCounts[b].count - topicCounts[a].count,
  );

  // Select the top 6 topics or less if there are fewer than 6
  const top6Topics = sortedTopics.slice(0, 8);

  // Prepare the series data
  const series = [
    {
      name: "Easy",
      data: top6Topics.map((topic) => topicCounts[topic].difficulty["Easy"]),
    },
    {
      name: "Medium",
      data: top6Topics.map((topic) => topicCounts[topic].difficulty["Medium"]),
    },
    {
      name: "Hard",
      data: top6Topics.map((topic) => topicCounts[topic].difficulty["Hard"]),
    },
  ];

  return {
    numbers: top6Topics.length,
    topics: top6Topics,
    series: series,
  };
}

export function countDifficulty(jsonObjects: any[]): Record<string, number> {
  const difficultyCounts: Record<string, number> = {};

  for (const obj of jsonObjects) {
    const difficulty = obj.difficulty;

    if (difficultyCounts[difficulty]) {
      difficultyCounts[difficulty]++;
    } else {
      difficultyCounts[difficulty] = 1;
    }
  }

  return difficultyCounts;
}
