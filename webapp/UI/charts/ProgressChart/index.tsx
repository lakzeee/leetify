import Chart from "@/UI/charts/ProgressChart/chart";
import ProgressChartBase, { BadgeData } from "@/UI/charts/ProgressChartBase";

export default function ProgressChart() {
  const badgeData: BadgeData[] = [
    { count: 10, name: "TO-DO", color: "blue" },
    { count: 30, name: "In Progress", color: "orange" },
    { count: 50, name: "Complete", color: "green" },
  ];

  return (
    <ProgressChartBase title={"Your Progress"} badgeData={badgeData}>
      <Chart />
    </ProgressChartBase>
  );
}
