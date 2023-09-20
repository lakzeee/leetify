import { PlanQuestion } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import {
  IoIosAddCircle,
  IoIosCheckmarkCircle,
  IoIosRemoveCircle,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import "react-tooltip/dist/react-tooltip.css";
import { useTablekeyStore } from "@/Components/hooks/useTablekeyStore";
import LeetCodeLink from "@/UI/link/LeetCodeLink";

type Props = {
  question: PlanQuestion;
  existedGroupName?: string;
  enableAction?: boolean;
  enableProgress?: boolean;
};
export default function PlanQuestionRow({
  question,
  existedGroupName,
  enableAction = true,
  enableProgress = false,
}: Props) {
  const [groupName, setGroupName] = useState(existedGroupName);
  const [isAdded, setIsAdded] = useState(false);

  const addToAddedQuestion = useCreatePlanStore(
    (state) => state.addToAddedQuestions,
  );
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const removeFromAddedQuestions = useCreatePlanStore(
    (state) => state.removeFromAddedQuestions,
  );
  const { inc } = useTablekeyStore();

  // Check if current row is added in the plan
  useEffect(() => {
    const existingQuestionIndex = addedQuestions?.findIndex(
      (q) => q.leetCodeNo == question.leetCodeNo,
    );
    if (!addedQuestions || existingQuestionIndex === -1) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
      if (existingQuestionIndex)
        setGroupName(
          addedQuestions[existingQuestionIndex]?.groupName ?? existedGroupName,
        );
    }
  }, [question]);

  const handleAdd = () => {
    addToAddedQuestion(question, groupName);
    setGroupName(groupName);
    setIsAdded(true);
    inc();
  };

  const handleRemove = () => {
    removeFromAddedQuestions(question.leetCodeNo);
    setIsAdded(false);
    inc();
  };

  return (
    <>
      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">
          <div className="flex flex-row justify-center items-center gap-2">
            {question.leetCodeNo}
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900 lg:whitespace-nowrap dark:text-white">
          <LeetCodeLink title={question.title}>{question.title}</LeetCodeLink>
        </td>
        <td className="px-6 py-4 text-gray-900 lg:whitespace-nowrap dark:text-white">
          <TopicBadges topics={question.topics} maxBadge={3} xs={true} />
        </td>
        <td className="px-6 py-4">{question.difficulty}</td>
        {enableAction && (
          <td className="px-6 py-4 min-w-[10rem]">
            <div className="relative flex flex-row items-center w-full min-w-[15rem]">
              <input
                key={question.leetCodeNo}
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="input rounded-full input-bordered w-full"
              />
              <div className="absolute flex flex-row right-0 p-2">
                <button
                  onClick={handleRemove}
                  data-tooltip-id="remove-tooltip"
                  data-tooltip-content="Remove From List"
                >
                  {isAdded && <IoIosRemoveCircle color="#F5C254" size={30} />}
                </button>
                <button
                  onClick={handleAdd}
                  data-tooltip-id="add-tooltip"
                  data-tooltip-content="Confirm Group Name"
                >
                  {isAdded ? (
                    <IoIosCheckmarkCircle color="#2DD4BE" size={30} />
                  ) : (
                    <IoIosAddCircle size={30} />
                  )}
                </button>
              </div>
            </div>
          </td>
        )}
        {enableProgress && (
          <>
            <td className="px-6 py-4">TO-DO</td>
            <td className="px-6 py-4">Never</td>
            <td className="px-6 py-4">Tags</td>
          </>
        )}
      </tr>
    </>
  );
}
