import { PlanQuestionRes } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import React from "react";
import UserPlanRow from "@/UI/table/row/UserPlanRow";

type Props = {
  userPlans: PlanQuestionRes[];
  enableAction?: boolean;
  enableProgress?: boolean;
};
export default function UserPlansTable({
  userPlans,
  enableAction = true,
  enableProgress = false,
}: Props) {
  const columTitles = ["Name", "isPublic", "tags", "createdAt", "updatedAt"];
  if (enableAction) columTitles.push(" ");

  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
      <tbody>
        {userPlans &&
          userPlans.length > 0 &&
          userPlans.map((userPlan) => (
            <UserPlanRow
              key={userPlan.id}
              userPlan={userPlan}
              enableAction={enableAction}
              enableProgress={enableProgress}
            />
          ))}
      </tbody>
    </TableWrapper>
  );
}
