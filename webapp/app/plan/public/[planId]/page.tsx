"use client";
import Container from "@/UI/container";
import { useEffect, useState } from "react";
import { PlanQuestionRes } from "@/types";
import { GetPublicPlanById } from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";
import ProgressQuestionTable from "@/UI/table/ProgressQuestionTable";
import Image from "next/image";
import Heart from "@/UI/icons/Heart";
import { getCurrentUser } from "@/app/(user)/session/authUtils";

export default function PublicPlanDetail({
  params,
}: {
  params: {
    planId: string;
  };
}) {
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    async function fetchPublicPlanDetail() {
      const planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        setPlanDetailData(planDetail);
      }
    }

    async function checkIfLogin() {
      const user = await getCurrentUser();
      if (user) setIsLogIn(true);
    }

    fetchPublicPlanDetail();
    checkIfLogin();
  }, [params.planId]);

  return (
    <Container>
      <div className="w-full">
        {planDetailData?.questionList && (
          <ProgressQuestionTable
            enableProgress={false}
            data={planDetailData.questionList}
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="uppercase">{planDetailData.planName}</h1>
              {planDetailData.tags && (
                <TopicBadges topics={planDetailData.tags} />
              )}
            </div>
            <p className="text-base-content font-light pb-2">
              {planDetailData.description}
            </p>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-2">
                <div className="avatar">
                  <div className="w-6 rounded-full">
                    <Image
                      src={planDetailData.image || ""}
                      width={15}
                      height={15}
                      alt="/"
                    />
                  </div>
                </div>
                <p className="text-sm">{planDetailData.profileName} </p>
              </div>
              <div className="mr-1 flex flex-row justify-center gap-2">
                <Heart
                  isLogIn={isLogIn}
                  showWhenNotSaved={true}
                  planId={params.planId}
                  count={planDetailData.savesCount || 0}
                />
              </div>
            </div>
          </ProgressQuestionTable>
        )}
      </div>
    </Container>
  );
}
