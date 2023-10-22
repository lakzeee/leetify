"use client";
import PieChart from "@/UI/charts/PieChart";
import RecentVisit from "@/UI/charts/RecentlyVisited";
import AreaChart from "@/UI/charts/AreaChart";
import { useEffect, useState } from "react";
import {
  getDayCount,
  getDifficultiesCount,
  getRecentVisitQuestions,
  getTopicsCount,
} from "@/Components/actions/progressActions";
import {
  DayCountsData,
  generateDateCounts,
} from "@/Components/utils/DateTimeHelper";
import { PlanQuestion, TreeMapDataPoint } from "@/types";
import TreeMap from "@/UI/charts/TreeMap";
import Container from "@/UI/container";
import MessageCard from "@/UI/homepage/MessageCard";
import { getCurrentUser } from "@/app/(user)/session/authUtils";

export default function Home() {
  const [loadingDayCount, setLoadingDayCount] = useState(false);
  const [loadingDiffCount, setLoadingDiffCount] = useState(false);
  const [loadingTopicsCount, setLoadingTopicsCount] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [timeoutFlag, setTimeoutFlag] = useState(false);
  const [userName, setUserName] = useState("");

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
  const [recentVisitQuestions, setRecentVisitQuestions] =
    useState<PlanQuestion[]>();

  useEffect(() => {
    setLoadingDayCount(true);
    setLoadingDiffCount(true);
    setLoadingRecent(true);
    setLoadingTopicsCount(true);
    setTimeoutFlag(true);
    getDayCount()
      .then((r) => {
        if (r.error) throw r.error;
        setDayCounts(generateDateCounts(r));
        setLoadingDayCount(false);
      })
      .catch(() => {});
    getDifficultiesCount()
      .then((r) => {
        if (r.error) throw r.error;
        setDifficultiesCount(r);
        setLoadingDiffCount(false);
      })
      .catch(() => {});
    getTopicsCount()
      .then((r) => {
        if (r.error) throw r.error;
        setTopicsCount(r);
        setLoadingTopicsCount(false);
      })
      .catch(() => {});
    getRecentVisitQuestions()
      .then((r) => {
        if (r.error) throw r.error;
        setRecentVisitQuestions(r);
        setLoadingRecent(false);
      })
      .catch(() => {});
    getCurrentUser().then((r) => setUserName(r?.name || ""));
    const fetchingTimeOut = () => {
      setTimeoutFlag(false);
    };
    const timeoutId = setTimeout(fetchingTimeOut, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Container
      isLoading={
        loadingDayCount &&
        loadingDiffCount &&
        loadingTopicsCount &&
        loadingRecent &&
        timeoutFlag
      }
    >
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
          <AreaChart dayCountsData={dayCounts} />
          <PieChart data={difficultiesCount} />
          <div className="lg:col-span-2">
            <TreeMap data={topicsCount} />
          </div>
          <div className="lg:col-span-2">
            <RecentVisit data={recentVisitQuestions} />
          </div>
          <div className="lg:col-span-2">
            <MessageCard userName={userName} />
          </div>
        </div>
      </div>
    </Container>
  );
}
