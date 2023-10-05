"use client";
import Container from "@/UI/container";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import { GetPublicPlanById } from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import ProgressQuestionTable from "@/UI/table/ProgressQuestionTable";

export default function PublicPlanDetail({
  params,
}: {
  params: { planId: string };
}) {
  const planId = params.planId;
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();

  useEffect(() => {
    async function fetchPublicPlanDetail() {
      const planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        setPlanDetailData(planDetail);
      }
    }

    fetchPublicPlanDetail();
  }, [params.planId, planId]);

  return (
    <Container>
      <div className="w-full">
        {planDetailData?.questionList && (
          <ProgressQuestionTable
            enableProgress={false}
            data={planDetailData.questionList}
          >
            <Heart showWhenNotSaved={true} planId={params.planId} />
            <div className="flex flex-row justify-between items-center">
              <h1 className="uppercase">{planDetailData.planName}</h1>
              {planDetailData.tags && (
                <TopicBadges topics={planDetailData.tags} />
              )}
            </div>
            <p className="text-base-content font-light pb-2">
              {planDetailData.description}
            </p>
          </ProgressQuestionTable>
        )}
      </div>
    </Container>
  );
}
