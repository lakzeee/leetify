"use client";
import Container from "@/UI/container";
import { useEffect, useMemo, useState } from "react";
import {
  GetPlanAndProgressDetailById,
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
import {
  countDifficulty,
  countStatus,
  getTopFrequentTopicsAndDifficulties,
} from "@/Components/utils/helpers";
import ProgressQuestionTable from "@/UI/table/ProgressQuestionTable";
import { useProgressStore } from "@/Components/hooks/useProgressStore";
import RadarChart from "@/UI/charts/RadarChart";

export default function PlanProgress({
  params,
}: {
  params: {
    planId: string;
  };
}) {
  // Table data
  const planDetailData = useProgressStore(
    (state) => state.progressQuestionDetails,
  );
  const setPlanDetailData = useProgressStore(
    (state) => state.setProgressQuestionDetails,
  );
  const dummyState = useProgressStore((state) => state.dummyState);
  const incDummy = useProgressStore((state) => state.incDummy);
  // pass it to heart component
  const setSavedPlans = useSavedPlansStore((state) => state.setSavedPlans);
  // managing state of status edit dialog
  const setItems = useStatusStore((state) => state.setItems);
  const items = useStatusStore((state) => state.items);
  const statusDummy = useStatusStore((state) => state.dummyState);
  const dialogFlag = useStatusStore((state) => state.dialogFlag);

  // dummy state for force rerender data vis
  const [dataVisDummyState, setDataVisDummyState] = useState(0);
  //loading flags
  const [loadingPlanDetail, setLoadingPlanDetail] = useState(false);

  // fetch user status items
  useEffect(() => {
    async function fetchUserStatusItems() {
      const statusItems = await GetUserStatusItems();
      if (statusItems.length > 0) setItems(statusItems);
    }

    fetchUserStatusItems();
  }, [setItems]);

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
      const timeoutId = setTimeout(saveStatusItemsChange, delay);
      // Return a cleanup function
      return () => clearTimeout(timeoutId);
    }
  }, [dialogFlag, items]);

  useEffect(() => {
    const delay = 1000;

    function inc() {
      incDummy();
      setDataVisDummyState(dataVisDummyState + 1);
      setLoadingPlanDetail(false);
    }

    const timeoutId = setTimeout(inc, delay);
    // Return a cleanup function
    return () => clearTimeout(timeoutId);
  }, [incDummy]);

  useEffect(() => {
    async function fetchUserSavedPlan() {
      const userSavedPlans = await GetSavedPlanRecordByUserId();
      if (userSavedPlans?.planIds?.length > 0) {
        setSavedPlans(userSavedPlans.planIds);
      }
    }

    fetchUserSavedPlan();
  }, [setSavedPlans]);

  // fetching info for displaying basic table
  useEffect(() => {
    async function fetchPublicPlanDetail() {
      setLoadingPlanDetail(true);
      let progress = await GetPlanAndProgressDetailById(params.planId);
      if (progress) {
        setPlanDetailData(progress);
      }
    }

    fetchPublicPlanDetail();
  }, [params.planId, setPlanDetailData]);

  const statusCount = useMemo(() => {
    if (
      dummyState > 2 &&
      planDetailData?.questionList &&
      planDetailData.questionList?.length > 0
    ) {
      return countStatus(planDetailData.questionList);
    }
    return {
      todo: 0,
      inProgress: 0,
      complete: 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planDetailData, dummyState]);

  const difficultyCount = useMemo(() => {
    if (
      dummyState > 2 &&
      planDetailData?.questionList &&
      planDetailData.questionList?.length > 0
    ) {
      return countDifficulty(
        planDetailData.questionList.filter((q) => q.columnId == "c"),
      );
    }
    return {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planDetailData, dummyState]);

  const frequencyCount = useMemo(() => {
    if (
      dummyState > 2 &&
      planDetailData?.questionList &&
      planDetailData.questionList?.length > 0
    ) {
      return getTopFrequentTopicsAndDifficulties(
        planDetailData.questionList.filter((q) => q.columnId == "c"),
      );
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planDetailData, dummyState]);

  return (
    <Container isLoading={loadingPlanDetail}>
      <div
        key={dataVisDummyState}
        className="w-full grid md:grid-cols-2 mb-4 gap-4"
      >
        <ProgressChart statusCount={statusCount} />
        <RadarChart
          difficultyCount={difficultyCount}
          frequencyCount={frequencyCount}
        />
      </div>
      <div className="w-full">
        {planDetailData?.questionList &&
          planDetailData?.questionList?.length > 0 && (
            <ProgressQuestionTable
              key={dummyState}
              statusItems={items}
              data={planDetailData.questionList}
              enableProgress={true}
            >
              {/*Table Caption*/}
              <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row gap-4">
                  <h1 className="uppercase">{planDetailData.planName}</h1>
                  {planDetailData.tags && (
                    <TopicBadges topics={planDetailData.tags} />
                  )}
                </div>

                <p className="text-base-content font-light pb-2">
                  {planDetailData.description}
                </p>
                <Heart
                  showCount={false}
                  showWhenNotSaved={true}
                  planId={params.planId}
                  count={planDetailData.savesCount || 0}
                  isLogIn={true}
                />
              </div>
            </ProgressQuestionTable>
          )}
        <StatusEditDialog items={items} />
      </div>
    </Container>
  );
}
