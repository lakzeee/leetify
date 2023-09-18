import PlanQuestionRow from "@/UI/table/row/PlanQuestionRow";
import { PlanQuestion } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import {
  generateRandomKey,
  groupPlanQuestionsByGroupName,
} from "@/Components/utils/helpers";
import React from "react";
import TableGroupRow from "@/UI/table/tablebase/TableGroupRow";
import TableCaption from "@/UI/table/tablebase/TableCaption";

type Props = {
  data: PlanQuestion[];
  enableAction?: boolean;
  children?: React.ReactNode;
};
export default function AddedQuestionTable({
  data,
  enableAction = true,
  children,
}: Props) {
  const groupByGroupName = groupPlanQuestionsByGroupName(data);
  const columTitles = ["no", "title", "topics", "difficulty"];
  if (enableAction) columTitles.push("action");

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
              <TableGroupRow key={groupName} groupName={groupName} />
              {groupQuestions.map((question) => (
                <PlanQuestionRow
                  key={question.title}
                  question={question}
                  existedGroupName={groupName}
                  enableAction={enableAction}
                />
              ))}
            </React.Fragment>
          ),
        )}
      </tbody>
    </TableWrapper>
  );
}
