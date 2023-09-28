import Chart from "@/UI/charts/PieChart/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";

type Props = {
  data: number[];
};
export default function PieChart({ data }: Props) {
  return (
    <DashboardChartBase title={"Overall"}>
      <Chart data={data} />
    </DashboardChartBase>
  );
}
