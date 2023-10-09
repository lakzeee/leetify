"use client";
import Chart from "@/UI/charts/ProgressChart/chart";
import ProgressChartBase, { BadgeData } from "@/UI/charts/ProgressChartBase";
import { StatusCount } from "@/types";

type Props = {
  statusCount: StatusCount;
};
export default function ProgressChart({ statusCount }: Props) {
  const badgeData: BadgeData[] = [
    { count: statusCount.todo, name: "TO-DO", color: "blue" },
    { count: statusCount.inProgress, name: "In Progress", color: "yellow" },
    { count: statusCount.complete, name: "Complete", color: "green" },
  ];

  const allCount =
    statusCount.todo + statusCount.complete + statusCount.inProgress;
  let completeRate = 0;
  let progressRate = 0;
  let todoRate = 0;
  if (allCount > 0) {
    completeRate = (statusCount.complete / allCount) * 100;
    progressRate =
      (1 - (statusCount.inProgress + statusCount.todo) / allCount) * 100;
    todoRate = (1 - statusCount.todo / allCount) * 100;
  }
  return (
    <ProgressChartBase title={"Your Progress"} badgeData={badgeData}>
      <Chart series={[completeRate || 0, progressRate || 0, todoRate || 0]} />
    </ProgressChartBase>
  );
}
