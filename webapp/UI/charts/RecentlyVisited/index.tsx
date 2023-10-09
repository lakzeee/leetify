import DashboardChartBase from "@/UI/charts/DashboardChartBase";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import React from "react";
import { PlanQuestion } from "@/types";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import RecentRow from "@/UI/charts/RecentlyVisited/RecentRow";

type Props = {
  data?: PlanQuestion[];
  xl?: boolean;
};
export default function RecentVisit({ data, xl }: Props) {
  const columTitles = [
    "Title",
    "LastVisit",
    "LastStatus",
    "Difficulties",
    "Topics",
  ];
  return (
    <DashboardChartBase title={"Recently visited"} large xl>
      <TableWrapper>
        <TableHeader columTitles={columTitles} />
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((q) => <RecentRow key={q.title} question={q} />)}
        </tbody>
      </TableWrapper>
    </DashboardChartBase>
  );
}
