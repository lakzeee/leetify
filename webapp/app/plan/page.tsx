"use client";
import Container from "@/UI/container";
import UserPlansTable from "@/app/plan/UserPlansTable";
import { generateRandomKey } from "@/Components/utils/helpers";
import { useEffect, useState } from "react";
import { GetUserPlans } from "@/Components/actions/planActions";
import { PlanQuestionRes } from "@/types";

export default function MyPlans() {
  const [userPlans, setUserPlans] = useState<PlanQuestionRes[]>();
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    async function fetchUserPlans(userId: string) {
      const userPlans = await GetUserPlans(userId);
      setUserPlans(userPlans);
    }
    if (userId) {
      fetchUserPlans(userId);
    }
  }, []);
  return (
    <Container>
      <div className="flex w-full flex-row justify-start mb-4">
        <div>
          <a href={"/plan/create"} className="btn btn-primary">
            Create a plan
          </a>
        </div>
      </div>
      {userPlans && userPlans.length > 0 && (
        <UserPlansTable key={generateRandomKey()} userPlans={userPlans} />
      )}
    </Container>
  );
}
