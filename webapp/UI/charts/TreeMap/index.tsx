import Chart from "@/UI/charts/TreeMap/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";

export default function TreeMap() {
  return (
    <DashboardChartBase title={"Topics Map"} large>
      <Chart />
    </DashboardChartBase>
  );
}
