import { Question } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";

type Props = {
  question: Question;
};
export default function QuestionRow({ question }: Props) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{question.leetCodeNo}</td>
      <td className="px-6 py-4">{question.title}</td>
      <td className="px-6 py-4">
        <TopicBadges topics={question.topics} />
      </td>
      <td className="px-6 py-4">{question.difficulty}</td>
      <td className="px-6 py-4">{question.slug}</td>
    </tr>
  );
}
