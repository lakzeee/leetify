"use client";
import FormInput from "@/UI/layout/planform/FormInput";
import FormToggle from "@/UI/layout/planform/FormToggle";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import AddedQuestionTable from "@/UI/layout/table/AddedQuestionTable";
import { useTablekeyStore } from "@/Components/hooks/useTablekeyStore";
import { Tooltip } from "react-tooltip";

export default function CreatePlanForm() {
  // manage state of the form
  const planName = useCreatePlanStore((state) => state.planName);
  const setPlanName = useCreatePlanStore((state) => state.setPlanName);
  const description = useCreatePlanStore((state) => state.description);
  const setDescription = useCreatePlanStore((state) => state.setDescription);
  const tags = useCreatePlanStore((state) => state.tags);
  const setTags = useCreatePlanStore((state) => state.setTags);
  const isPublic = useCreatePlanStore((state) => state.isPublic);
  const setIsPublic = useCreatePlanStore((state) => state.setIsPublic);
  // manage state of added question
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);

  const { tableKey } = useTablekeyStore();

  function handleSubmit() {
    const data = {
      planName,
      description,
      tags,
      isPublic,
      questionList: addedQuestions,
    };
    console.log(data);
  }

  return (
    <>
      <div className="form-control flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormInput
          placeholder="Plan Name"
          value={planName}
          handleChange={(value) => setPlanName(value)}
        />
        <FormInput
          placeholder="Description"
          value={description}
          handleChange={(value) => setDescription(value)}
        />
        <FormInput
          placeholder="Tags, Sperated by comma"
          value={tags}
          handleChange={(values) => setTags(values)}
        />
        <FormToggle
          placeholder="Can Everyone See?"
          value={isPublic}
          handleChange={(value) => setIsPublic(value)}
        />
        <div>
          <button
            className="btn btn-md"
            onClick={() =>
              // @ts-ignore
              document.getElementById("edit_question_dialog").showModal()
            }
          >
            Add a question
          </button>
        </div>

        {addedQuestions && addedQuestions.length > 0 && (
          <AddedQuestionTable key={tableKey} data={addedQuestions} />
        )}

        <div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <Tooltip id="remove-tooltip" />
        <Tooltip id="add-tooltip" />
      </div>
    </>
  );
}
