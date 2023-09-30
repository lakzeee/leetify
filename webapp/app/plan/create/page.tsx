"use client";
import EditQuestionDialog from "@/app/plan/create/AddQuestionDialog";
import CreatePlanForm from "@/app/plan/create/CreatePlanForm";
import Container from "../../../UI/container";
import { getCurrentUser } from "@/app/session/authUtils";
import Heading from "@/UI/heading";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import { PlanQuestion } from "@/types";
import { useEffect, useState } from "react";

export default function CreatePlan() {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      if (user) setUser(user);
    }

    fetchUser();
  }, []);

  const addToAddedQuestion = useCreatePlanStore(
    (state) => state.addToAddedQuestions,
  );
  const removeFromAddedQuestions = useCreatePlanStore(
    (state) => state.removeFromAddedQuestions,
  );
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const searchResultQuestions = useCreatePlanStore((state) => state.questions);
  const handleAdd = (question: PlanQuestion, groupName: string) => {
    addToAddedQuestion(question, groupName);
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
      {!user ? (
        <Heading
          title={"You Need Log In to Create Plan"}
          subTitle={"Click the avatar button to sign up or log in"}
        />
      ) : (
        <div className="min-w-full">
          <CreatePlanForm
            addedQuestions={addedQuestions}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
          <EditQuestionDialog
            searchResultQuestions={searchResultQuestions}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            checkSearchResAdded={checkSearchResAdded}
          />
        </div>
      )}
    </Container>
  );
}
