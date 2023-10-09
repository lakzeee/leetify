"use client";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  data: number[];
};
export default function Chart({ data }: Props) {
  const option = {
    chart: {
      height: 400,
      width: "100%",
    },
    colors: ["#2EC48D", "#FCE96A", "#F05252"],
    grid: {
      padding: {
        top: -2,
      },
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    labels: ["Easy", "Medium", "Difficult"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Completed Total",
              formatter: function (w: any) {
                const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
                return `${sum}`;
              },
            },
            value: {
              show: true,
              offsetY: -20,
            },
          },
          size: "80%",
        },
      },
    },
  };

  return (
    <>
      <ApexChart
        type="donut"
        // @ts-ignore
        options={option}
        series={data}
        height={320}
        width={340}
      />
    </>
  );
}
