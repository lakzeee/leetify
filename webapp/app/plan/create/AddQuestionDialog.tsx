"use client";
import { useState } from "react";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import {
  getQuestionsByQuestionNumbers,
  getQuestionsByQuestionTitle,
} from "@/Components/actions/questionActions";
import { Tooltip } from "react-tooltip";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";
import Row from "@/UI/table/ActionQuestionTable/Row";
import { PlanQuestion } from "@/types";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {
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

  function isNumberWithCommas(str: string) {
    const regex = /^\d{1,4}(,\d{1,4})*$|^\d{1,4}$/;
    return regex.test(str);
  }

  function isValidSearchTerm(term: string) {
    const regex = /^[\s]*[A-Za-z]+[A-Za-z\s]*$/;
    return regex.test(term);
  }

  function handleSearch() {
    if (isNumberWithCommas(questionNumbers)) {
      getQuestionsByQuestionNumbers(questionNumbers)
        .then((data: any) => {
          if (data.error) throw data.error;
          setQuestions(data);
        })
        .catch(() => {
          console.log("Failed getQuestionsByQuestionNumbers");
        });
    } else if (isValidSearchTerm(questionNumbers)) {
      getQuestionsByQuestionTitle(questionNumbers)
        .then((data: any) => {
          if (data.error) throw data.error;
          setQuestions(data);
        })
        .catch(() => {
          console.log("Failed getQuestionsByQuestionTitle");
        });
    } else {
      toast.error("Search term is not valid");
    }
  }

  const columTitles = ["no", "title", "topics", "difficulty", "Action"];

  return (
    <>
      <dialog id="edit_question_dialog" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-3">Add Some Question</h3>
          <div className="relative">
            <input
              data-tooltip-id="search-tooltip"
              data-tooltip-content="Search by pressing enter"
              type="text"
              value={questionNumbers}
              onChange={(e) => handleOnChange(e.target.value)}
              placeholder="Enter question number, seperate by comma or Enter title of question"
              className="input input-primary focus:ring-0 focus:border-none w-full mb-3 rounded-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent the default form submission behavior
                  handleSearch();
                }
              }}
            />
            <button
              className="absolute right-2 top-2 btn btn-sm btn-primary btn-circle"
              onClick={handleSearch}
            >
              <AiOutlineSearch />
            </button>
          </div>
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
        <Tooltip id="search-tooltip" />
      </dialog>
    </>
  );
}
