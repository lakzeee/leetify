import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
type Props = {
  series: number[];
};
export default function Chart({ series }: Props) {
  const option = {
    chart: {
      height: "380px",
      width: "100%",
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#2EC48D", "#FF8A4C", "#1C64F2"],
    plotOptions: {
      radialBar: {
        track: {
          background: "#E5E7EB",
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "32%",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Complete", "In Progress", "TO-DO"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value: any) {
          return Math.floor(value) + "%";
        },
      },
    },
  };
  return (
    <>
      <ApexChart
        type="radialBar"
        // @ts-ignore
        options={option}
        series={series}
        height={320}
        width={340}
      />
    </>
  );
}
