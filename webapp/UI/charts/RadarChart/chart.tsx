import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart() {
  const series = [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20, 100],
    },
    {
      name: "Series 2",
      data: [90, 33, 45, 67, 2, 1, 190],
    },
    {
      name: "Series 3",
      data: [40, 7, 70, 60, 70, 90, 90],
    },
  ];
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
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
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
