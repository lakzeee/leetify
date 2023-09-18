"use client";
import Container from "@/UI/container";
import UserPlansTable from "@/app/plan/UserPlansTable";
import { generateRandomKey } from "@/Components/utils/helpers";
import { useEffect, useState } from "react";
import {
  GetUserPlans,
  GetUserSavedPlans,
} from "@/Components/actions/planActions";
import { PlanQuestionRes } from "@/types";
import Heading from "@/UI/heading";

export default function MyPlans() {
  const [userPlans, setUserPlans] = useState<PlanQuestionRes[]>();
  const [savedPlans, setSavePlans] = useState<PlanQuestionRes[]>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    async function fetchUserPlans(userId: string) {
      const userPlans = await GetUserPlans(userId);
      setUserPlans(userPlans);
    }
    async function fetchSavedPlans(userId: string) {
      const savePlans = await GetUserSavedPlans(userId);
      setSavePlans(savePlans);
    }
    if (userId) {
      fetchUserPlans(userId);
      fetchSavedPlans(userId);
    }
  }, []);
  return (
    <Container>
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
