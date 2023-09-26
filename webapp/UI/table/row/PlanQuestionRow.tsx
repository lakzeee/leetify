import { PlanQuestion, ProgressRecord } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import {
  IoIosAddCircle,
  IoIosCheckmarkCircle,
  IoIosRemoveCircle,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import "react-tooltip/dist/react-tooltip.css";

import LeetCodeLink from "@/UI/link/LeetCodeLink";
import StatusSelect from "@/UI/table/row/progress/StatusSelect";
import TagsBox from "@/UI/table/row/progress/TagsBox";
import { useStatusStore } from "@/Components/hooks/useStatusStore";
import { CreateRecord } from "@/Components/actions/progressActions";

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
  // managing state for creating or updating plan
  const [groupName, setGroupName] = useState(existedGroupName);
  const [isAdded, setIsAdded] = useState(false);
  const addToAddedQuestion = useCreatePlanStore(
    (state) => state.addToAddedQuestions,
  );
  const removeFromAddedQuestions = useCreatePlanStore(
    (state) => state.removeFromAddedQuestions,
  );
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const dummyState = useCreatePlanStore((state) => state.dummyState);

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
    console.log("Check if current row is added in the plan");
  }, [addedQuestions, existedGroupName, question]);

  const handleAdd = () => {
    addToAddedQuestion(question, groupName);
    setGroupName(groupName);
    setIsAdded(true);
  };

  const handleRemove = () => {
    removeFromAddedQuestions(question.leetCodeNo);
    setIsAdded(false);
  };

  // Progress Section
  // const [isCreateRecord, setIsCreateRecord] = useState(true);
  // const statusItems = useStatusStore((state) => state.items);
  // set initial value for status select box
  // const [selectedStatus, setSelectedStatus] = useState({
  //   value: "TO-DO",
  //   columnId: "a",
  //   label: "TO-DO",
  // });
  //
  // if (question.progressRecord) {
  //   const existedStatus = {
  //     value: question.progressRecord.statusName,
  //     columnId: question.progressRecord.columnId,
  //     label: question.progressRecord.statusName,
  //   };
  //   setSelectedStatus(existedStatus);
  //   setIsCreateRecord(false);
  // }

  //handle user select a new status
  // const handleStatusChange = (newValue: any) => {
  //   setSelectedStatus(newValue);
  //   const data: ProgressRecord = {
  //     leetCodeNo: question.leetCodeNo,
  //     statusName: newValue.value,
  //     columnId: newValue.columnId,
  //     tags: "default",
  //   };
  //   if (isCreateRecord) {
  //     CreateRecord(data)
  //       .then((r) => {
  //         if (r.error) throw r.error;
  //       })
  //       .catch();
  //   }
  // };

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
        {/*{enableProgress && (*/}
        {/*  <>*/}
        {/*    <td className="px-6 py-4">*/}
        {/*      <StatusSelect*/}
        {/*        value={selectedStatus}*/}
        {/*        onChange={handleStatusChange}*/}
        {/*        statusItems={statusItems}*/}
        {/*      />*/}
        {/*    </td>*/}
        {/*    <td className="px-6 py-4">*/}
        {/*      <TagsBox />*/}
        {/*    </td>*/}
        {/*    <td className="px-6 py-4">Never</td>*/}
        {/*  </>*/}
        {/*)}*/}
      </tr>
    </>
  );
}
