"use client";
import Container from "@/UI/container";
import UserPlansTable from "@/app/plan/UserPlansTable";
import { generateRandomKey } from "@/Components/utils/helpers";
import { useEffect, useState } from "react";
import {
  GetSavedPlanRecordByUserId,
  GetUserPlans,
  GetUserSavedPlans,
} from "@/Components/actions/planActions";
import { PlanQuestionRes } from "@/types";
import Heading from "@/UI/heading";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";

export default function MyPlans() {
  const [userPlans, setUserPlans] = useState<PlanQuestionRes[]>();
  const [savedPlans, setSavePlans] = useState<PlanQuestionRes[]>();
  const [loadingUserPlans, setLoadingUserPlans] = useState(false);
  const [loadingSavedPlans, setLoadingSavedPlans] = useState(false);
  const setSavedPlansStore = useSavedPlansStore((state) => state.setSavedPlans);

  useEffect(() => {
    async function fetchUserSavedPlan() {
      setLoadingSavedPlans(true);
      const userSavedPlans = await GetSavedPlanRecordByUserId();
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlansStore(userSavedPlans.planIds);
      }
      setLoadingSavedPlans(false);
    }

    async function fetchUserPlans() {
      setLoadingUserPlans(true);
      const userPlans = await GetUserPlans();
      setUserPlans(userPlans);
      setLoadingUserPlans(false);
    }

    async function fetchSavedPlans() {
      setLoadingSavedPlans(true);
      const savePlans = await GetUserSavedPlans();
      setSavePlans(savePlans);
      console.log(savePlans);
      setLoadingSavedPlans(false);
    }

    fetchUserSavedPlan();
    fetchUserPlans();
    fetchSavedPlans();
  }, [setSavedPlansStore]);
  return (
    <Container isLoading={loadingUserPlans && loadingSavedPlans}>
      <div className="flex w-full flex-col justify-start mb-4">
        <div className="mb-6">
          <a href={"/plan/create"} className="btn btn-primary">
            Create a plan
          </a>
        </div>
        <Heading title={"My Plans"} />
        <div className="mb-4">
          {userPlans && userPlans.length > 0 && (
            <UserPlansTable key={generateRandomKey()} userPlans={userPlans} />
          )}
        </div>
        <Heading title={"Saved Plans"} />
        <div className="mb-4">
          {savedPlans && savedPlans.length > 0 && (
            <UserPlansTable
              key={generateRandomKey()}
              userPlans={savedPlans}
              enableAction={false}
              enableProgress={true}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
