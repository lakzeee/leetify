"use client";
import { useEffect, useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import { getQuestionsByQuestionNumbers } from "@/Components/actions/questionActions";
import PlanQuestionsTable from "@/UI/layout/table/PlanQuestionsTable";
import { useTablekeyStore } from "@/Components/hooks/useTablekeyStore";

export default function EditQuestionDialog() {
  const [questionNumbers, setQuestionNumbers] = useState("");
  const questions = useCreatePlanStore((state) => state.questions);
  const setQuestions = useCreatePlanStore((state) => state.setQuestions);
  const resetQuestion = useCreatePlanStore((state) => state.resetQuestions);
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const { inc } = useTablekeyStore();

  function resetSearch() {
    setQuestionNumbers("");
    resetQuestion();
    inc();
    console.log(addedQuestions);
  }

  function handleOnChange(value: string) {
    setQuestionNumbers(value);
  }

  useEffect(() => {
    if (questionNumbers && !questionNumbers.endsWith(",")) {
      getQuestionsByQuestionNumbers(questionNumbers).then((data) => {
        setQuestions(data);
      });
    }
  }, [questionNumbers]);

  const columTitles = ["no", "title", "topics", "difficulty"];
  return (
    <>
      <dialog id="edit_question_dialog" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-3">Add Some Question</h3>
          <input
            type="text"
            value={questionNumbers}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder="Enter question number, seperate by comma"
            className="input input-sm input-primary focus:ring-0 focus:border-none w-full"
          />
          {questions && questions.length > 0 && (
            <PlanQuestionsTable columTitles={columTitles} data={questions} />
          )}
        </div>

        <form method="dialog" className="modal-backdrop" onClick={resetSearch}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
