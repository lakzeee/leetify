import { PlanQuestionRes } from "@/types";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import React from "react";
import UserPlanRow from "@/UI/table/row/UserPlanRow";
type Props = {
  userPlans: PlanQuestionRes[];
};
export default function UserPlansTable({ userPlans }: Props) {
  const columTitles = [
    "Name",
    "isPublic",
    "tags",
    "createdAt",
    "updatedAt",
    "",
  ];

  return (
    <TableWrapper>
      <TableHeader columTitles={columTitles} />
      <tbody>
        {userPlans &&
          userPlans.length > 0 &&
          userPlans.map((userPlan) => (
            <UserPlanRow key={userPlan.id} userPlan={userPlan} />
          ))}
      </tbody>
    </TableWrapper>
  );
}
