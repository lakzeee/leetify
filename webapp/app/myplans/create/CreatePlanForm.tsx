"use client";
import FormInput from "@/UI/planform/FormInput";
import FormToggle from "@/UI/planform/FormToggle";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import AddedQuestionTable from "@/UI/table/AddedQuestionTable";
import { useTablekeyStore } from "@/Components/hooks/useTablekeyStore";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function CreatePlanForm() {
  // manage state of the form
  const [loading, setLoading] = useState(false);
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const { tableKey } = useTablekeyStore();

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    setFocus("planName");
  }, []);

  function onSubmit(formData: FieldValues) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Unable to submit, please log in and try again");
      return;
    }
    const data = {
      userId: userId,
      description: formData.description,
      isPublic: formData.isPublic,
      planName: formData.planName,
      questionList: addedQuestions,
    };
    console.log(data);
  }

  return (
    <>
      <form
        className="form-control flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          label="Plan Name"
          name="planName"
          control={control}
          rules={{ required: "Plan Name is required" }}
        />
        <FormInput
          label="Description"
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
        />
        <FormInput label="Tags" name="tags" control={control} />
        <FormToggle
          label="IsPublic"
          name="isPublic"
          type="checkbox"
          control={control}
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
          <button
            type="submit"
            className={`btn ${
              (!isValid || !addedQuestions || addedQuestions.length == 0) &&
              "btn-disabled"
            }`}
          >
            Submit
          </button>
        </div>
        <Tooltip id="remove-tooltip" />
        <Tooltip id="add-tooltip" />
      </form>
    </>
  );
}
