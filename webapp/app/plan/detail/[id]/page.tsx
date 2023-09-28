"use client";
import Container from "@/UI/container";
import CreatePlanForm from "@/app/plan/create/CreatePlanForm";
import EditQuestionDialog from "@/app/plan/create/AddQuestionDialog";
import { generateRandomKey } from "@/Components/utils/helpers";
import { PlanQuestion } from "@/types";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import { useEffect, useState } from "react";
import { GetPlanDetailById } from "@/Components/actions/planActions";

export default function PlanDetail({ params }: { params: { id: string } }) {
  const [planDetail, setPlanDetail] = useState<any>();

  useEffect(() => {
    async function fetchPlanDetail() {
      const planDetail = await GetPlanDetailById(params.id);
      if (planDetail) {
        setPlanDetail(planDetail);
        if (planDetail.questionList)
          setAddedQuestionsFromLis(planDetail.questionList);
      }
    }

    fetchPlanDetail();
  }, [params.id]);

  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const addToAddedQuestion = useCreatePlanStore(
    (state) => state.addToAddedQuestions,
  );
  const setAddedQuestionsFromLis = useCreatePlanStore(
    (state) => state.setAddedQuestionsFromList,
  );
  const removeFromAddedQuestions = useCreatePlanStore(
    (state) => state.removeFromAddedQuestions,
  );
  const searchResultQuestions = useCreatePlanStore((state) => state.questions);
  const handleAdd = (question: PlanQuestion, groupName: string) => {
    addToAddedQuestion(question, groupName);
    console.log(addedQuestions);
  };
  const handleRemove = (leetCodeNo: number) => {
    removeFromAddedQuestions(leetCodeNo);
  };

  function checkSearchResAdded(leetCodeNo: number): [boolean, string] {
    const added = addedQuestions?.findLast((q) => q.leetCodeNo == leetCodeNo);
    let groupName = "ungroup";
    if (added) {
      if (added.groupName) groupName = added.groupName;
      return [true, groupName];
    }
    return [false, groupName];
  }

  return (
    <Container>
      {planDetail && planDetail.questionList.length > 0 && (
        <CreatePlanForm
          key={generateRandomKey()}
          planDetail={planDetail}
          planId={params.id}
          addedQuestions={addedQuestions}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
      )}
      <EditQuestionDialog
        searchResultQuestions={searchResultQuestions}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        checkSearchResAdded={checkSearchResAdded}
      />
    </Container>
  );
}
