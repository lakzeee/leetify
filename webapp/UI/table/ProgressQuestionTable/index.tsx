"use client";
import { DndItem, PlanQuestion } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import {
  generateRandomKey,
  groupPlanQuestionsByGroupName,
} from "@/Components/utils/helpers";
import React, { useState } from "react";
import TableCaption from "@/UI/table/tablebase/TableCaption";
import Row from "@/UI/table/ProgressQuestionTable/Row";
import GroupRow from "@/UI/table/ProgressQuestionTable/GroupRow";

type Props = {
  data: PlanQuestion[];
  children?: React.ReactNode;
  enableProgress: boolean;
  statusItems?: DndItem[];
  handleStatusChange?: any;
};
export default function ProgressQuestionTable({
  data,
  children,
  enableProgress,
  statusItems,
}: Props) {
  const columTitles = ["no", "title", "topics", "difficulty"];
  if (enableProgress) columTitles.push("Status", "Tags", "Last Visit");

  const groupByGroupName = groupPlanQuestionsByGroupName(data);

  // Function to toggle the collapse state of a group
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const toggleCollapse = (groupName: string) => {
    if (!enableProgress) return;
    if (collapsedGroups.includes(groupName)) {
      setCollapsedGroups(
        collapsedGroups.filter((group) => group !== groupName),
      );
    } else {
      setCollapsedGroups([...collapsedGroups, groupName]);
    }
  };

  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
      <TableCaption>{children}</TableCaption>
      <tbody>
        {Object.entries(groupByGroupName).map(
          ([groupName, groupQuestions], idx) => (
            <React.Fragment
              key={`groupHeader_${groupName}_${idx}_${generateRandomKey()}`}
            >
              <GroupRow
                key={groupName}
                enableProgress={enableProgress}
                groupName={groupName}
                questionCount={groupQuestions.length || 0}
                completedQuestionCount={
                  groupQuestions.filter((q) => q.columnId === "c").length || 0
                }
                onClick={() => toggleCollapse(groupName)} // Add click event handler to toggle collapse
              />
              {!collapsedGroups.includes(groupName) && // Check if the group is not collapsed
                groupQuestions.map((question) => (
                  <Row
                    key={generateRandomKey()}
                    question={question}
                    enableProgress={enableProgress}
                    statusItems={statusItems}
                  />
                ))}
            </React.Fragment>
          ),
        )}
      </tbody>
    </TableWrapper>
  );
}
