import { PlanQuestion } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import LeetCodeLink from "@/UI/link/LeetCodeLink";
import { DateTimeHelper } from "@/Components/utils/DateTimeHelper";
import StatusBadge from "@/UI/badge/StatusBadge";
import DifficultyBadge from "@/UI/badge/DifficultyBadge";
import TimeBadge from "@/UI/badge/TimeBadge";

type Props = {
  question: PlanQuestion;
};
export default function RecentRow({ question }: Props) {
  return (
    <>
      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4 text-gray-900 lg:whitespace-nowrap dark:text-white">
          <LeetCodeLink title={question.title}>{question.title}</LeetCodeLink>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <TimeBadge name={DateTimeHelper(question.updatedAt)} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge
            columnId={question.columnId || ""}
            statusName={question.statusName || ""}
          />
        </td>
        <td className="px-6 py-4">
          <DifficultyBadge name={question.difficulty} />
        </td>
        <td className="px-6 py-4 text-gray-900 lg:whitespace-nowrap dark:text-white">
          <TopicBadges topics={question.topics} maxBadge={3} xs={true} />
        </td>
      </tr>
    </>
  );
}
