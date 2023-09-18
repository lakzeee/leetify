"use client";
import Container from "@/UI/container";
import AddedQuestionTable from "@/UI/table/AddedQuestionTable";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import { GetPublicPlanById } from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
export default function PublicPlanDetail({
  params,
}: {
  params: { planId: string };
}) {
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    async function fetchPublicPlanDetail() {
      const planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        setPlanDetailData(planDetail);
      }
    }
    fetchPublicPlanDetail();
    if (userId) setUserId(userId);
  }, [params.planId]);

  return (
    <Container>
      <div className="w-full">
        {planDetailData?.questionList && (
          <AddedQuestionTable
            data={planDetailData.questionList}
            enableAction={false}
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
      </div>
    </Container>
  );
}
