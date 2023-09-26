import { PlanQuestion } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import {
  IoIosAddCircle,
  IoIosCheckmarkCircle,
  IoIosRemoveCircle,
} from "react-icons/io";
import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import LeetCodeLink from "@/UI/link/LeetCodeLink";

type Props = {
  question: PlanQuestion;
  existedGroupName: string;
  isAdded?: boolean;
  handleAdd: (question: PlanQuestion, groupName: string) => void;
  handleRemove: (leetCodeNo: number) => void;
};
export default function Row({
  isAdded = false,
  question,
  existedGroupName,
  handleAdd,
  handleRemove,
}: Props) {
  const [localGroupName, setLocalGroupName] = useState(existedGroupName);
  const [isAddedLocal, setIsAddedLocal] = useState(isAdded);
  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalGroupName(e.target.value);
  };
  const handleAddClick = () => {
    handleAdd(question, localGroupName);
    setIsAddedLocal(true);
  };
  const handleRemoveClick = () => {
    handleRemove(question.leetCodeNo);
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
        <td className="px-6 py-4 min-w-[10rem]">
          <div className="relative flex flex-row items-center w-full min-w-[15rem]">
            <input
              key={question.leetCodeNo}
              type="text"
              value={localGroupName}
              onChange={handleChangeGroupName}
              placeholder="Group Name"
              className="input rounded-full input-bordered w-full"
            />
            <div className="absolute flex flex-row right-0 p-2">
              <button
                onClick={handleRemoveClick}
                data-tooltip-id="remove-tooltip"
                data-tooltip-content="Remove From List"
              >
                {isAddedLocal && (
                  <IoIosRemoveCircle color="#F5C254" size={30} />
                )}
              </button>
              <button
                onClick={handleAddClick}
                data-tooltip-id="add-tooltip"
                data-tooltip-content="Confirm Group Name"
              >
                {isAddedLocal ? (
                  <IoIosCheckmarkCircle color="#2DD4BE" size={30} />
                ) : (
                  <IoIosAddCircle size={30} />
                )}
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
