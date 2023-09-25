import DashboardChartBase from "@/UI/charts/DashboardChartBase";
import Table from "@/UI/charts/RecentlyVisited/table";

export default function RecentlyVisited() {
  return (
    <DashboardChartBase title={"Recently visited"} large>
      <Table />
    </DashboardChartBase>
  );
}
