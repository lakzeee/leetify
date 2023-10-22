"use client";
// @ts-ignore
import Container from "@/UI/container";
import {
  GetAllPublicPlans,
  GetSavedPlanRecordByUserId,
} from "@/Components/actions/planActions";
import PlanCard from "@/UI/card/PlanCard";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";
import { getCurrentUser } from "@/app/(user)/session/authUtils";
import qs from "query-string";
import PublicPlanFilter from "@/UI/table/filter/PublicPlanFilter";
import { Pagination } from "flowbite-react";

export default function PublicPlan() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [publicPlansData, setPublicPlansData] = useState<PlanQuestionRes[]>();
  const [pageCount, setPageCount] = useState(0);
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);
  const [params, setParams] = useState({
    orderByNewest: false,
    orderByMostSaved: true,
    pageSize: 6,
    pageNumber: 1,
  });
  const [activeButton, setActiveButton] = useState("saved");
  const queryString = qs.stringifyUrl({ url: "", query: params });
  const [isLoading, setIsLoading] = useState(false);

  function handleFilterOnClick(value: string) {
    if (value === "new") {
      setParams({ ...params, orderByMostSaved: false, orderByNewest: true });
      setActiveButton("new");
    } else if (value === "saved") {
      setParams({ ...params, orderByMostSaved: true, orderByNewest: false });
      setActiveButton("saved");
    }
  }

  function setCurrentPage(value: number) {
    setParams({ ...params, pageNumber: value });
  }

  useEffect(() => {
    setIsLoading(true);

    async function fetchPublicPlan() {
      const publicPlans = await GetAllPublicPlans(queryString);
      if (publicPlans && publicPlans.results.length > 0) {
        setPublicPlansData(publicPlans.results);
        setPageCount(publicPlans.pageCount);
        setIsLoading(false);
      }
    }

    fetchPublicPlan();
  }, [queryString]);

  useEffect(() => {
    async function checkIfLogIn() {
      const user = await getCurrentUser();
      if (user != null) setIsLogIn(true);
    }

    async function fetchUserSavedPlan() {
      const userSavedPlans = await GetSavedPlanRecordByUserId();
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }

    checkIfLogIn();
    if (isLogIn) {
      fetchUserSavedPlan();
    }
  }, [isLogIn, setSavedPlans]);

  return (
    <Container isLoading={isLoading}>
      <div className="w-full flex justify-center items-center">
        <PublicPlanFilter
          handleFilterOnClick={handleFilterOnClick}
          activeButton={activeButton}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center items-center">
        {publicPlansData &&
          publicPlansData.length > 0 &&
          publicPlansData.map((plan) => (
            <PlanCard key={plan.id} plan={plan} heartClickable={false} />
          ))}
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <Pagination
          showIcons
          nextLabel=""
          previousLabel=""
          currentPage={params.pageNumber}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalPages={pageCount}
        />
      </div>
    </Container>
  );
}
