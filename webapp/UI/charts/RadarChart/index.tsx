import ProgressChartBase, { BadgeData } from "@/UI/charts/ProgressChartBase";
import Chart from "@/UI/charts/RadarChart/chart";

export default function RadarChart() {
  const badgeData: BadgeData[] = [
    { count: 80, name: "Easy", color: "green" },
    { count: 20, name: "Medium", color: "yellow" },
    { count: 30, name: "Hard", color: "pink" },
  ];
  return (
    <ProgressChartBase title={"Frequent Topics"} badgeData={badgeData}>
      <Chart />
    </ProgressChartBase>
  );
}
