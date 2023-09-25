import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart() {
  const option = {
    chart: {
      height: 400,
      width: "100%",
    },
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
              label: "Complete Total",
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

  const series = [10, 20, 2];

  return (
    <>
      <ApexChart
        type="donut"
        // @ts-ignore
        options={option}
        series={series}
        height={320}
        width={340}
        colors={["#16BDCA", "#FDBA8C", "#E74694"]}
      />
    </>
  );
}
