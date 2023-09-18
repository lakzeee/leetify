"use client";
// @ts-ignore
import Container from "@/UI/container";
import { GetAllPublicPlans } from "@/Components/actions/planActions";
import PlanCard from "@/UI/card/PlanCard";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";

export default function PublicPlan() {
  const [publicPlansData, setPublicPlansData] = useState<PlanQuestionRes[]>();
  useEffect(() => {
    async function fetchPublicPlan() {
      const publicPlans = await GetAllPublicPlans();
      if (publicPlans && publicPlans.length > 0) {
        setPublicPlansData(publicPlans);
      }
    }
    fetchPublicPlan();
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 -z-0">
        {publicPlansData &&
          publicPlansData.length > 0 &&
          publicPlansData.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </Container>
  );
}
