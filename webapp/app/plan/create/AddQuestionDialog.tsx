"use client";
import { useEffect, useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import { getQuestionsByQuestionNumbers } from "@/Components/actions/questionActions";
import { Tooltip } from "react-tooltip";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import Row from "@/UI/table/ActionQuestionTable/Row";
import { PlanQuestion } from "@/types";

type Props = {
  existedGroupName: string;
  handleAdd: (question: PlanQuestion, groupName: string) => void;
  handleRemove: (leetCodeNo: number) => void;
  searchResultQuestions?: PlanQuestion[];
  addedQuestions?: PlanQuestion[];
  checkSearchResAdded: (leetCodeNo: number) => [boolean, string];
};
export default function EditQuestionDialog({
  handleAdd,
  handleRemove,
  searchResultQuestions,
  checkSearchResAdded,
}: Props) {
  const [questionNumbers, setQuestionNumbers] = useState("");
  const setQuestions = useCreatePlanStore((state) => state.setQuestions);
  const resetQuestion = useCreatePlanStore((state) => state.resetQuestions);

  function resetSearch() {
    setQuestionNumbers("");
    resetQuestion();
  }

  function handleOnChange(value: string) {
    setQuestionNumbers(value);
  }

  useEffect(() => {
    if (questionNumbers && !questionNumbers.endsWith(",")) {
      getQuestionsByQuestionNumbers(questionNumbers)
        .then((data: any) => {
          if (data.error) throw data.error;
          setQuestions(data);
        })
        .catch(() => {
          console.log("Failed getQuestionsByQuestionNumbers");
        });
    }
    console.log("Fetch Search res once");
  }, [questionNumbers, setQuestions]);

  const columTitles = ["no", "title", "topics", "difficulty", "Action"];

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
            className="input input-primary focus:ring-0 focus:border-none w-full mb-3"
          />
          {searchResultQuestions && searchResultQuestions.length > 0 && (
            <TableWrapper>
              <TableHeader columTitles={columTitles} />
              <tbody>
                {searchResultQuestions.map((d) => (
                  <Row
                    isAdded={checkSearchResAdded(d.leetCodeNo)[0]}
                    key={d.title}
                    question={d}
                    existedGroupName={checkSearchResAdded(d.leetCodeNo)[1]}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                  />
                ))}
              </tbody>
            </TableWrapper>
          )}
        </div>

        <form method="dialog" className="modal-backdrop" onClick={resetSearch}>
          <button>close</button>
        </form>
        <Tooltip id="remove-tooltip" />
        <Tooltip id="add-tooltip" />
      </dialog>
    </>
  );
}
