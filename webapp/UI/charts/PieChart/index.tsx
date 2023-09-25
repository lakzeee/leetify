import Chart from "@/UI/charts/PieChart/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";

export default function PieChart() {
  return (
    <DashboardChartBase title={"Overall"}>
      <Chart />
    </DashboardChartBase>
  );
}
