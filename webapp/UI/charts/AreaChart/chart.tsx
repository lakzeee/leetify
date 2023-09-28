"use client"; // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
import { DayCountsData } from "@/Components/utils/DateTimeHelper";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  dayCountsData?: DayCountsData;
};

export function Chart({ dayCountsData }: Props) {
  const dates = dayCountsData?.dates || [
    "01 February",
    "02 February",
    "03 February",
    "04 February",
    "05 February",
    "06 February",
    "07 February",
  ];
  const data = dayCountsData?.counts || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const option = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      id: "apexchart-example",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: dates,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
  };

  const series = [
    {
      name: "",
      data: data,
    },
  ];

  return (
    <>
      <ApexChart
        type="area"
        options={option}
        series={series}
        height={200}
        width={340}
      />
    </>
  );
}
