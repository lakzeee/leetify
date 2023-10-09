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

export function generateRandomDateArrayAndRandomIntegers() {
  const currentDate = new Date();
  const dateArray = [];
  const randomIntegers = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}`;
    dateArray.push(formattedDate);

    // Generate random integers between 0 and 9
    randomIntegers.push(Math.floor(Math.random() * 10));
  }

  return { dateArray, randomIntegers };
}

export const mockTopicCountData = [
  {
    x: "Hash Table",
    y: 2,
  },
  {
    x: "String",
    y: 4,
  },
  {
    x: "Sliding Window",
    y: 1,
  },
  {
    x: "Dynamic Programming",
    y: 1,
  },
  {
    x: "Array",
    y: 2,
  },
  {
    x: "Binary Search",
    y: 1,
  },
  {
    x: "Divide and Conquer",
    y: 1,
  },
  {
    x: "Math",
    y: 3,
  },
  {
    x: "Linked List",
    y: 1,
  },
  {
    x: "Recursion",
    y: 1,
  },
];

export const tableData = [
  {
    leetCodeNo: 217,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-09T00:05:58.364786Z",
    title: "Contains Duplicate",
    topics: "Array,Hash Table,Sorting",
    difficulty: "Easy",
  },
  {
    leetCodeNo: 242,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-08T23:58:34.736526Z",
    title: "Valid Anagram",
    topics: "Hash Table,String,Sorting",
    difficulty: "Easy",
  },
  {
    leetCodeNo: 424,
    statusName: "In Progress",
    columnId: "b",
    updatedAt: "2023-10-08T23:58:31.68206Z",
    title: "Longest Repeating Character Replacement",
    topics: "Hash Table,String,Sliding Window",
    difficulty: "Medium",
  },
  {
    leetCodeNo: 3,
    statusName: "In Progress",
    columnId: "b",
    updatedAt: "2023-10-08T23:57:37.821679Z",
    title: "Longest Substring Without Repeating Characters",
    topics: "Hash Table,String,Sliding Window",
    difficulty: "Medium",
  },
  {
    leetCodeNo: 5,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-08T01:37:59.030466Z",
    title: "Longest Palindromic Substring",
    topics: "String,Dynamic Programming",
    difficulty: "Medium",
  },
  {
    leetCodeNo: 1,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-08T01:37:55.402832Z",
    title: "Two Sum",
    topics: "Array,Hash Table",
    difficulty: "Easy",
  },
  {
    leetCodeNo: 6,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-08T01:37:47.626865Z",
    title: "Zigzag Conversion",
    topics: "String",
    difficulty: "Medium",
  },
  {
    leetCodeNo: 4,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-08T01:37:37.895229Z",
    title: "Median of Two Sorted Arrays",
    topics: "Array,Binary Search,Divide and Conquer",
    difficulty: "Hard",
  },
  {
    leetCodeNo: 2,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-07T03:15:55.919451Z",
    title: "Add Two Numbers",
    topics: "Linked List,Math,Recursion",
    difficulty: "Medium",
  },
  {
    leetCodeNo: 9,
    statusName: "Complete",
    columnId: "c",
    updatedAt: "2023-10-07T03:15:50.246588Z",
    title: "Palindrome Number",
    topics: "Math",
    difficulty: "Easy",
  },
];

export const diffData = {
  Easy: 5,
  Medium: 4,
  Hard: 4,
};

export const progressData = {
  todo: 10,
  inProgress: 8,
  complete: 25,
};
export const freqData = {
  numbers: 8,
  topics: [
    "Array",
    "Hash Table",
    "String",
    "Sorting",
    "Two Pointers",
    "Sliding Window",
    "Dynamic Programming",
    "Greedy",
  ],
  series: [
    {
      name: "Easy",
      data: [3, 3, 2, 2, 1, 7, 4, 3],
    },
    {
      name: "Medium",
      data: [5, 6, 1, 4, 4, 3, 3, 6],
    },
    {
      name: "Hard",
      data: [4, 3, 2, 1, 4, 2, 3, 6],
    },
  ],
};
