import { DndItem, PlanQuestion, ProgressRecord } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import "react-tooltip/dist/react-tooltip.css";

import LeetCodeLink from "@/UI/link/LeetCodeLink";
import StatusSelect from "@/UI/table/row/progress/StatusSelect";
import TagsBox from "@/UI/table/row/progress/TagsBox";
import { useState } from "react";
import {
  CreateRecord,
  UpdateRecord,
} from "@/Components/actions/progressActions";
import { generateRandomKey } from "@/Components/utils/helpers";
import { DateTimeHelper } from "@/Components/utils/DateTimeHelper";
import { useProgressStore } from "@/Components/hooks/useProgressStore";

type Props = {
  question: PlanQuestion;
  enableProgress?: boolean;
  statusItems: DndItem[];
  handleStatusChange?: any;
  statusName?: string;
};
export default function Row({
  question,
  enableProgress = false,
  statusItems,
}: Props) {
  // set initial value for status select box
  const initStatus = {
    value: question.statusName || "No Started",
    columnId: question.columnId || "a",
    label: question.statusName || "TO-DO",
  };
  const [selectedStatus, setSelectedStatus] = useState(initStatus);
  const [tagsValue, setTagsValue] = useState(question.tags || "+");
  const [tagsEditMode, setTagsEditMode] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(question.updatedAt);
  const updateProgressStatus = useProgressStore(
    (state) => state.updateProgressStatus,
  );
  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
    const data: ProgressRecord = {
      statusName: value.value,
      columnId: value.columnId,
      tags: tagsValue,
    };
    if (!question.progressRecordId) {
      data.leetCodeNo = question.leetCodeNo;
      CreateRecord(data)
        .then((r) => {
          if (r.error) throw r.error;
        })
        .catch();
    } else {
      UpdateRecord(question.progressRecordId, data)
        .then((r) => {
          if (r.error) throw r.error;
        })
        .catch();
    }
    setUpdatedAt(new Date(Date.now()).toString());
    updateProgressStatus(
      question.leetCodeNo,
      value.value,
      value.columnId,
      tagsValue,
    );
  };

  function handleTagChange(value: string) {
    setTagsValue(value);
  }

  function handleConfirm() {
    setTagsEditMode(false);
    const data: ProgressRecord = {
      tags: tagsValue,
    };
    if (!question.progressRecordId) {
      data.leetCodeNo = question.leetCodeNo;
      CreateRecord(data)
        .then((r) => {
          if (r.error) throw r.error;
        })
        .catch();
    } else {
      UpdateRecord(question.progressRecordId, data)
        .then((r) => {
          if (r.error) throw r.error;
        })
        .catch();
    }
    setUpdatedAt(new Date(Date.now()).toString());
    updateProgressStatus(
      question.leetCodeNo,
      selectedStatus.value,
      selectedStatus.columnId,
      tagsValue,
    );
  }

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
        {enableProgress && (
          <>
            <td className="px-6 py-4">
              <StatusSelect
                key={generateRandomKey()}
                value={selectedStatus}
                onChange={handleStatusChange}
                statusItems={statusItems}
              />
            </td>
            <td className="px-6 py-4">
              <TagsBox
                onChange={handleTagChange}
                value={tagsValue}
                editMode={tagsEditMode}
                setEditMode={(flag) => setTagsEditMode(flag)}
                handleConfirm={handleConfirm}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {DateTimeHelper(updatedAt)}
            </td>
          </>
        )}
      </tr>
    </>
  );
}
