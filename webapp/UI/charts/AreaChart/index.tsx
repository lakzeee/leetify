import { Chart } from "@/UI/charts/AreaChart/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";
import { DayCountsData } from "@/Components/utils/DateTimeHelper";

type Props = {
  dayCountsData?: DayCountsData;
};
export default function AreaChart({ dayCountsData }: Props) {
  return (
    <DashboardChartBase
      large
      title={
        dayCountsData?.counts
          .reduce((total, count) => total + count)
          .toString() || "0"
      }
      subTitle={"Progress of last 30 days"}
      // percentage={"10%"}
    >
      <Chart dayCountsData={dayCountsData} />
    </DashboardChartBase>
  );
}
