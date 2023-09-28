import Chart from "@/UI/charts/TreeMap/chart";
import DashboardChartBase from "@/UI/charts/DashboardChartBase";
import { TreeMapDataPoint } from "@/types";

type Props = {
  data: TreeMapDataPoint[];
};
export default function TreeMap({ data }: Props) {
  return (
    <DashboardChartBase title={"Topics Map"} large>
      <Chart data={data} />
    </DashboardChartBase>
  );
}
