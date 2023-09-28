"use client";
import Container from "../UI/container";
import PieChart from "@/UI/charts/PieChart";
import TreeMap from "@/UI/charts/TreeMap";
import RecentlyVisited from "@/UI/charts/RecentlyVisited";
import AreaChart from "@/UI/charts/AreaChart";
import { useEffect, useState } from "react";
import { getDayCounts } from "@/Components/actions/progressActions";
import {
  DayCountsData,
  generateDateCounts,
} from "@/Components/utils/DateTimeHelper";

export default function Home() {
  const [dayCounts, setDayCounts] = useState<DayCountsData>();

  useEffect(() => {
    getDayCounts().then((r) => {
      if (r.error) throw r.error;
      setDayCounts(generateDateCounts(r));
    });
  }, []);
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChart dayCountsData={dayCounts} />
        <PieChart />
        <div className="lg:col-span-2">
          <TreeMap />
        </div>
        <div className="lg:col-span-2">
          <RecentlyVisited />
        </div>
      </div>
    </Container>
  );
}
