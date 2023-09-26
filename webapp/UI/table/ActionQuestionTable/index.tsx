import { PlanQuestion } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import {
  generateRandomKey,
  groupPlanQuestionsByGroupName,
} from "@/Components/utils/helpers";
import React, { useMemo } from "react";

import Row from "@/UI/table/ActionQuestionTable/Row";
import GroupRow from "@/UI/table/ActionQuestionTable/GroupRow";

type Props = {
  data: PlanQuestion[];
  isAdded?: boolean;
  handleAdd: (question: PlanQuestion, groupName: string) => void;
  handleRemove: (leetCodeNo: number) => void;
};
export default function ActionQuestionTable({
  data,
  isAdded,
  handleRemove,
  handleAdd,
}: Props) {
  const columTitles = ["no", "title", "topics", "difficulty", "action"];
  const groupByGroupName = useMemo(
    () => groupPlanQuestionsByGroupName(data),
    [data],
  );

  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
      <tbody>
        {Object.entries(groupByGroupName).map(
          ([groupName, groupQuestions], idx) => (
            <React.Fragment
              key={`groupHeader_${groupName}_${idx}_${generateRandomKey()}`}
            >
              <GroupRow key={groupName} groupName={groupName} />
              {groupQuestions.map((question) => (
                <Row
                  key={question.title}
                  question={question}
                  existedGroupName={groupName}
                  isAdded={isAdded}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                />
              ))}
            </React.Fragment>
          ),
        )}
      </tbody>
    </TableWrapper>
  );
}
