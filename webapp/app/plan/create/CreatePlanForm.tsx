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
import {
  CreateNewPlan,
  UpdatePlanDetailById,
} from "@/Components/actions/planActions";
import { useRouter } from "next/navigation";
import { PlanQuestionRes } from "@/types";

type Props = {
  planDetail?: PlanQuestionRes;
  planId?: string;
};
export default function CreatePlanForm({ planDetail, planId }: Props) {
  // manage state of the form
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const addedQuestions = useCreatePlanStore((state) => state.addedQuestions);
  const resetAddQuestions = useCreatePlanStore(
    (state) => state.resetAddQuestions,
  );
  const setAddedQuestionsFromList = useCreatePlanStore(
    (state) => state.setAddedQuestionsFromList,
  );
  const { tableKey } = useTablekeyStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (planDetail) {
      const { planName, isPublic, description, tags } = planDetail;
      reset({ planName, isPublic, description, tags });
      setIsUpdate(true);
      if (planDetail.questionList)
        setAddedQuestionsFromList(planDetail.questionList);
    }
    setFocus("planName");
  }, [setFocus]);

  function onSubmit(formData: FieldValues) {
    const data = {
      tags: formData.tags,
      description: formData.description,
      isPublic: formData.isPublic,
      planName: formData.planName,
      questionList: addedQuestions,
    };
    setLoading(true);

    if (isUpdate) {
      if (planId) {
        UpdatePlanDetailById(planId, data)
          .then((r) => {
            if (r.error) {
              throw r.error;
            }
            setLoading(false);
            toast.success("Plan Update Success");
            router.push(`/plan`);
          })
          .catch();
      } else {
        return;
      }
    } else {
      CreateNewPlan(data)
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          setLoading(true);
          resetAddQuestions();
          toast.success("Plan Create Success");
          router.push(`/plan`);
        })
        .catch();
    }
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
          <div
            className="btn btn-md"
            onClick={() =>
              // @ts-ignore
              document.getElementById("edit_question_dialog").showModal()
            }
          >
            Add a question
          </div>
        </div>
        {addedQuestions && addedQuestions.length > 0 && (
          <AddedQuestionTable key={tableKey} data={addedQuestions} />
        )}

        <div>
          <button
            className={`btn ${
              (!isValid || !addedQuestions || addedQuestions.length == 0) &&
              "btn-disabled"
            }`}
          >
            {isUpdate ? "Update" : "Create"}
          </button>
        </div>
        <Tooltip id="remove-tooltip" />
        <Tooltip id="add-tooltip" />
      </form>
    </>
  );
}
