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

export default function PublicPlan() {
  const [userId, setUserId] = useState<string>();
  const [publicPlansData, setPublicPlansData] = useState<PlanQuestionRes[]>();
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    async function fetchPublicPlan() {
      const publicPlans = await GetAllPublicPlans();
      if (publicPlans && publicPlans.length > 0) {
        setPublicPlansData(publicPlans);
      }
    }

    async function fetchUserSavedPlan(userId: string) {
      const userSavedPlans = await GetSavedPlanRecordByUserId(userId);
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }
    fetchPublicPlan();

    if (userId) {
      setUserId(userId);
      fetchUserSavedPlan(userId);
    }
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {publicPlansData &&
          publicPlansData.length > 0 &&
          publicPlansData.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              userId={userId}
              heartClickable={false}
            />
          ))}
      </div>
    </Container>
  );
}
