"use client";
import Container from "@/UI/container";
import AddedQuestionTable from "@/UI/table/AddedQuestionTable";
import { useEffect, useState } from "react";
import { PlanQuestionRes, ProgressRecord } from "@/types";
import {
  GetPublicPlanById,
  GetSavedPlanRecordByUserId,
} from "@/Components/actions/planActions";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";
import StatusEditDialog from "@/app/plan/progress/[planId]/StatusEditDialog";
import { useStatusStore } from "@/Components/hooks/useStatusStore";
import {
  GetUserStatusItems,
  UpdateUserStatusItems,
} from "@/Components/actions/statusActions";
import ProgressChart from "@/UI/charts/ProgressChart";
import RadarChart from "@/UI/charts/RadarChart";
import { GetRecordList } from "@/Components/actions/progressActions";
import { ConcatPlanDetailWithProgressData } from "@/Components/utils/helpers";

export default function PlanProgress({
  params,
}: {
  params: {
    planId: string;
  };
}) {
  // Table data
  const [planDetailData, setPlanDetailData] = useState<PlanQuestionRes>();
  // pass it to heart component
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);
  // managing state of status edit dialog
  const setItems = useStatusStore((state) => state.setItems);
  const items = useStatusStore((state) => state.items);
  const dummyState = useStatusStore((state) => state.dummyState);
  const dialogFlag = useStatusStore((state) => state.dialogFlag);

  // save changes of status edit dialog
  useEffect(() => {
    function saveStatusItemsChange() {
      UpdateUserStatusItems(items)
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
        })
        .catch();
    }

    if (!dialogFlag && items) {
      const delay = 1000;
      setTimeout(saveStatusItemsChange, delay);
    }
  }, [dialogFlag, items]);

  // fetching info for displaying basic table
  useEffect(() => {
    async function fetchUserStatusItems() {
      const statusItems = await GetUserStatusItems();
      if (statusItems.length > 0) setItems(statusItems);
    }

    async function fetchUserSavedPlan() {
      const userSavedPlans = await GetSavedPlanRecordByUserId();
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }

    async function fetchPublicPlanDetail() {
      let planDetail = await GetPublicPlanById(params.planId);
      if (planDetail) {
        if (planDetail.questionList && planDetail.questionList.length > 0) {
          const nums = planDetail.questionList
            .map((item) => item.leetCodeNo)
            .join(",");
          GetRecordList(nums)
            .then((r) => {
              if (r.error) throw r.error;
              if (r.length > 0)
                planDetail = ConcatPlanDetailWithProgressData(planDetail, r);
            })
            .catch();
        }
        setPlanDetailData(planDetail);
      }
    }

    fetchUserSavedPlan();
    fetchPublicPlanDetail();
    fetchUserStatusItems();
  }, [params.planId, setItems, setSavedPlans]);

  return (
    <Container>
      <div className="w-full grid md:grid-cols-2 mb-4 gap-4">
        <ProgressChart />
        <RadarChart />
      </div>
      <div className="w-full">
        {planDetailData?.questionList && (
          <AddedQuestionTable
            data={planDetailData.questionList}
            enableAction={false}
            enableProgress={true}
          >
            {/*Table Caption*/}
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
          </AddedQuestionTable>
        )}
        <StatusEditDialog items={items} />
      </div>
    </Container>
  );
}
