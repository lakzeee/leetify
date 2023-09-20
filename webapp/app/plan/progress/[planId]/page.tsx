"use client";
import Container from "@/UI/container";
import AddedQuestionTable from "@/UI/table/AddedQuestionTable";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import {
  GetPublicPlanById,
  GetSavedPlanRecordByUserId,
} from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";
import StatusEditDialog from "@/app/plan/progress/[planId]/StatusEditDialog";
export default function PlanProgress({
  params,
}: {
  params: { planId: string };
}) {
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();
  const [userId, setUserId] = useState<string>();
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    async function fetchUserSavedPlan(userId: string) {
      const userSavedPlans = await GetSavedPlanRecordByUserId(userId);
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }
    async function fetchPublicPlanDetail() {
      const planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        setPlanDetailData(planDetail);
      }
    }
    fetchPublicPlanDetail();
    if (userId) setUserId(userId);
  }, [params.planId, setSavedPlans]);

  return (
    <Container>
      <div className="w-full">
        {planDetailData?.questionList && (
          <AddedQuestionTable
            data={planDetailData.questionList}
            enableAction={false}
            enableProgress={true}
          >
            <Heart
              showWhenNotSaved={true}
              planId={params.planId}
              userId={userId}
            />
            <div className="flex flex-row justify-between items-center">
              <h1 className="uppercase">{planDetailData.planName}</h1>
              {planDetailData.tags && (
                <TopicBadges topics={planDetailData.tags} />
              )}
            </div>
            <p className="text-base-content font-light pb-2">
              {planDetailData.description}
            </p>
          </AddedQuestionTable>
        )}
        <StatusEditDialog />
      </div>
    </Container>
  );
}
