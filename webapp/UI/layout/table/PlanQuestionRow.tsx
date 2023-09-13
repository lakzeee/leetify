import { PlanQuestion } from "@/types";
import TopicBadges from "@/UI/layout/table/TopicBadges";
import { IoIosAddCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";

type Props = {
  question: PlanQuestion;
};
export default function PlanQuestionRow({ question }: Props) {
  const [groupName, setGroupName] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const addToAddedQuestion = useCreatePlanStore(
    (state) => state.addToAddedQuestions,
  );
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);

  // Check if current row is added in the plan
  useEffect(() => {
    const existingQuestionIndex = addedQuestions?.findIndex(
      (q) => q.leetCodeNo == question.leetCodeNo,
    );
    if (!addedQuestions || existingQuestionIndex === -1) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  }, [question]);
  const handleButtonClick = () => {
    addToAddedQuestion(question, groupName);
    setIsAdded(true);
  };

  return (
    <>
      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
        <td className="px-3 py-4">{question.leetCodeNo}</td>
        <td className="px-3 py-4">{question.title}</td>
        <td className="px-3 py-4">
          <TopicBadges topics={question.topics} maxBadge={3} />
        </td>
        <td className="px-3 py-4">{question.difficulty}</td>
        <td className="px-3 py-4">
          <div className="relative flex flex-row items-center">
            <input
              key={question.leetCodeNo}
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
              className="input min-w-1/2 rounded-full input-bordered w-full"
            />
            <button
              onClick={handleButtonClick}
              className="absolute right-0 p-2"
            >
              {isAdded ? (
                <IoIosCheckmarkCircle color="#2DD4BE" size={30} />
              ) : (
                <IoIosAddCircle size={30} />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
