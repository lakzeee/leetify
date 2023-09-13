import PlanQuestionRow from "@/UI/layout/table/PlanQuestionRow";
import { PlanQuestion } from "@/types";
import TableWrapper from "@/UI/layout/table/tablebase/TableWrapper";
import TableHeader from "@/UI/layout/table/tablebase/TableHeader";
import {
  generateRandomKey,
  groupPlanQuestionsByGroupName,
} from "@/Components/utils/helpers";
import React from "react";
import TableGroupRow from "@/UI/layout/table/tablebase/TableGroupRow";

type Props = {
  data: PlanQuestion[];
};
export default function AddedQuestionTable({ data }: Props) {
  const groupByGroupName = groupPlanQuestionsByGroupName(data);
  const columTitles = ["no", "title", "topics", "difficulty", "actions"];

  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
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
                />
              ))}
            </React.Fragment>
          ),
        )}
      </tbody>
    </TableWrapper>
  );
}
