import PlanQuestionRow from "@/UI/table/row/PlanQuestionRow";
import { PlanQuestion, ProgressRecord } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import {
  generateRandomKey,
  groupPlanQuestionsByGroupName,
} from "@/Components/utils/helpers";
import React, { useEffect, useMemo, useState } from "react";
import TableGroupRow from "@/UI/table/tablebase/TableGroupRow";
import TableCaption from "@/UI/table/tablebase/TableCaption";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";

type Props = {
  data: PlanQuestion[];
  enableAction?: boolean;
  children?: React.ReactNode;
  enableProgress?: boolean;
};
export default function AddedQuestionTable({
  data,
  enableAction = true,
  children,
  enableProgress = false,
}: Props) {
  console.log(data);
  // Initialize a state variable to keep track of collapsed groups
  const columTitles = ["no", "title", "topics", "difficulty"];
  if (enableAction) columTitles.push("action");
  if (enableProgress) columTitles.push("Status", "Tags", "Last Visit");

  // const groupByGroupName = groupPlanQuestionsByGroupName(data);
  const groupByGroupName = useMemo(
    () => groupPlanQuestionsByGroupName(data),
    [data],
  );

  // Function to toggle the collapse state of a group
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const toggleCollapse = (groupName: string) => {
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
      {!enableAction && <TableCaption>{children}</TableCaption>}
      <tbody>
        {Object.entries(groupByGroupName).map(
          ([groupName, groupQuestions], idx) => (
            <React.Fragment
              key={`groupHeader_${groupName}_${idx}_${generateRandomKey()}`}
            >
              <TableGroupRow
                key={groupName}
                groupName={groupName}
                onClick={() => toggleCollapse(groupName)} // Add click event handler to toggle collapse
              />
              {!collapsedGroups.includes(groupName) && // Check if the group is not collapsed
                groupQuestions.map((question) => (
                  <PlanQuestionRow
                    key={question.title}
                    question={question}
                    existedGroupName={groupName}
                    enableAction={enableAction}
                    enableProgress={enableProgress}
                  />
                ))}
            </React.Fragment>
          ),
        )}
      </tbody>
    </TableWrapper>
  );
}
