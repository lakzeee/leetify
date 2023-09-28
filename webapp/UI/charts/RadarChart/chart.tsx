import dynamic from "next/dynamic";
import { TopicsFrequency } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  frequencyCount?: TopicsFrequency;
};
export default function Chart({ frequencyCount }: Props) {
  let series = [
    {
      name: "Easy",
      data: [0],
    },
    {
      name: "Medium",
      data: [0],
    },
    {
      name: "Hard",
      data: [0],
    },
  ];
  let categories: string[] = [];

  if (frequencyCount) {
    series = frequencyCount.series;
    categories = frequencyCount.topics;
  }

  const option = {
    chart: {
      height: "320px",
      width: "100%",
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 2,
        right: 2,
        top: -18,
        bottom: -18,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      show: false,
    },
    markers: {
      size: 0,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: "#e8e8e8",
          connectorColors: "transparent",
        },
      },
    },
  };
  return (
    <>
      <ApexChart
        type="radar"
        // @ts-ignore
        options={option}
        series={series}
        height={280}
        width={340}
      />
    </>
  );
}
