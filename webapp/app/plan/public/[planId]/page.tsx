"use client";
import Container from "@/UI/container";
import AddedQuestionTable from "@/UI/table/AddedQuestionTable";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import {
  GetAllPublicPlans,
  GetPublicPlanById,
} from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";

export default function PublicPlanDetail({
  params,
}: {
  params: { planId: string };
}) {
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();
  useEffect(() => {
    async function fetchPublicPlanDetail() {
      const planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        setPlanDetailData(planDetail);
      }
    }
    fetchPublicPlanDetail();
  }, []);
  return (
    <Container>
      <div className="w-full">
        {planDetailData?.questionList && (
          <AddedQuestionTable
            data={planDetailData.questionList}
            enableAction={false}
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="uppercase">{planDetailData.planName}</h1>
              {planDetailData.tags && (
                <TopicBadges topics={planDetailData.tags} />
              )}
            </div>
            <p className="text-base-content font-light">
              {planDetailData.description}
            </p>
          </AddedQuestionTable>
        )}
      </div>
    </Container>
  );
}
