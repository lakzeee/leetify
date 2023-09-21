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
import { getCurrentUser } from "@/app/session/authUtils";

export default function PublicPlan() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [publicPlansData, setPublicPlansData] = useState<PlanQuestionRes[]>();
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);

  useEffect(() => {
    async function isLogIn(){
      const user = await getCurrentUser();
      if(user != null) setIsLogIn(true)
    }
    async function fetchPublicPlan() {
      const publicPlans = await GetAllPublicPlans();
      if (publicPlans && publicPlans.length > 0) {
        setPublicPlansData(publicPlans);
      }
    }
    isLogIn();
    fetchPublicPlan();
  }, []);

  useEffect(() => {
    async function fetchUserSavedPlan() {
      const userSavedPlans = await GetSavedPlanRecordByUserId();
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }
    if(isLogIn){
      fetchUserSavedPlan();
    }
  }, [isLogIn, setSavedPlans]);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {publicPlansData &&
          publicPlansData.length > 0 &&
          publicPlansData.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              heartClickable={false}
            />
          ))}
      </div>
    </Container>
  );
}
