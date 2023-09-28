import ProgressChartBase, { BadgeData } from "@/UI/charts/ProgressChartBase";
import Chart from "@/UI/charts/RadarChart/chart";
import { TopicsFrequency } from "@/types";

type Props = {
  difficultyCount: Record<string, number>;
  frequencyCount?: TopicsFrequency;
};
export default function RadarChart({ difficultyCount, frequencyCount }: Props) {
  const badgeData: BadgeData[] = [
    { count: difficultyCount.Easy || 0, name: "Easy", color: "green" },
    { count: difficultyCount.Medium || 0, name: "Medium", color: "yellow" },
    { count: difficultyCount.Hard || 0, name: "Hard", color: "pink" },
  ];
  return (
    <ProgressChartBase
      title={"Completed Frequent Topics"}
      badgeData={badgeData}
    >
      {frequencyCount && frequencyCount?.topics.length > 0 && (
        <Chart frequencyCount={frequencyCount} />
      )}
      {frequencyCount?.topics.length == 0 && (
        <h1 className="mt-28">No Completed Question Yet</h1>
      )}
    </ProgressChartBase>
  );
}
