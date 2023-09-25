import { Chart } from "@/UI/charts/AreaChart/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";

type Data = {
  date: string;
  count: number;
};
type Props = {
  Data: Data[];
};
export default function AreaChart() {
  return (
    <DashboardChartBase
      title={"40"}
      subTitle={"Progress this week"}
      percentage={"10%"}
    >
      <Chart />
    </DashboardChartBase>
  );
}
