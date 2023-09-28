import dynamic from "next/dynamic";
import { TreeMapDataPoint } from "@/types";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/Components/hooks/useThemeStore";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  data: TreeMapDataPoint[];
};
export default function Chart({ data }: Props) {
  const { isNightMode } = useThemeStore();

  const [storkColor, setStorkColor] = useState("#1F2937");

  useEffect(() => {
    setStorkColor(isNightMode ? "#1F2937" : "#FFFFFF");
  }, [isNightMode]);
  
  const series = [
    {
      data: data,
    },
  ];

  // TODO: change stoke color base on color mode
  const options = {
    stroke: {
      colors: [storkColor],
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
