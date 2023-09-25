"use client";
import Container from "../UI/container";
import FlowbiteChart from "@/UI/charts/AreaChart";
import PieChart from "@/UI/charts/PieChart";
import TreeMap from "@/UI/charts/TreeMap";
import RecentlyVisited from "@/UI/charts/RecentlyVisited";

export default function Home() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FlowbiteChart />
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
