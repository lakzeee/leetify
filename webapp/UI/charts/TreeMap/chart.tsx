import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart() {
  const series = [
    {
      data: [
        {
          x: "Linked List",
          y: 218,
        },
        {
          x: "Array",
          y: 149,
        },
        {
          x: "Tree",
          y: 184,
        },
        {
          x: "Graph",
          y: 55,
        },
        {
          x: "Dynamic programming",
          y: 84,
        },
        {
          x: "Greedy",
          y: 31,
        },
        {
          x: "Prefix Sum",
          y: 70,
        },
        {
          x: "Binary Search",
          y: 30,
        },
        {
          x: "DFS",
          y: 44,
        },
        {
          x: "BFD",
          y: 68,
        },
      ],
    },
  ];

  // TODO: change stoke color base on color mode
  const options = {
    stroke: {
      colors: ["#1F2937"],
    },
    legend: {
      show: false,
    },
    chart: {
      type: "treemap",
      height: "100%",
      maxWidth: "100%",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 20,
        right: 0,
        top: 0,
      },
    },
  };
  return (
    <>
      <ApexChart
        type="treemap"
        // @ts-ignore
        options={options}
        series={series}
        height={320}
        width={720}
        colors={["#16BDCA", "#FDBA8C", "#E74694"]}
      />
    </>
  );
}
