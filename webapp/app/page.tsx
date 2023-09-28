"use client";
import Container from "../UI/container";
import PieChart from "@/UI/charts/PieChart";
import RecentlyVisited from "@/UI/charts/RecentlyVisited";
import AreaChart from "@/UI/charts/AreaChart";
import { useEffect, useState } from "react";
import {
  getDayCount,
  getDifficultiesCount,
  getTopicsCount,
} from "@/Components/actions/progressActions";
import {
  DayCountsData,
  generateDateCounts,
} from "@/Components/utils/DateTimeHelper";
import { TreeMapDataPoint } from "@/types";
import TreeMap from "@/UI/charts/TreeMap";

export default function Home() {
  const [dayCounts, setDayCounts] = useState<DayCountsData>();
  const [difficultiesCount, setDifficultiesCount] = useState<number[]>([
    0, 0, 0,
  ]);
  const [topicsCount, setTopicsCount] = useState<TreeMapDataPoint[]>([
    {
      x: "",
      y: 0,
    },
  ]);

  useEffect(() => {
    getDayCount()
      .then((r) => {
        if (r.error) throw r.error;
        setDayCounts(generateDateCounts(r));
      })
      .catch(() => {});
    getDifficultiesCount().then((r) => {
      if (r.error) throw r.error;
      setDifficultiesCount(r);
    });
    getTopicsCount().then((r) => {
      if (r.error) throw r.error;
      setTopicsCount(r);
    });
  }, []);
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChart dayCountsData={dayCounts} />
        <PieChart data={difficultiesCount} />
        <div className="lg:col-span-2">
          <TreeMap data={topicsCount} />
        </div>
        <div className="lg:col-span-2">
          <RecentlyVisited />
        </div>
      </div>
    </Container>
  );
}
