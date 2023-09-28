"use client";
import FormInput from "@/UI/planform/FormInput";
import FormToggle from "@/UI/planform/FormToggle";
import { useCreatePlanStore } from "@/Components/hooks/useCreatePlanStore";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import {
  CreateNewPlan,
  UpdatePlanDetailById,
} from "@/Components/actions/planActions";
import { useRouter } from "next/navigation";
import { PlanQuestion, PlanQuestionRes } from "@/types";
import ActionQuestionTable from "@/UI/table/ActionQuestionTable";

type Props = {
  planDetail?: PlanQuestionRes;
  planId?: string;
  handleAdd: (question: PlanQuestion, groupName: string) => void;
  handleRemove: (leetCodeNo: number) => void;
  addedQuestions?: PlanQuestion[];
};
export default function CreatePlanForm({
  planDetail,
  planId,
  handleRemove,
  handleAdd,
  addedQuestions,
}: Props) {
  // manage state of the form
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const resetAddQuestions = useCreatePlanStore(
    (state) => state.resetAddQuestions,
  );
  const setAddedQuestionsFromList = useCreatePlanStore(
    (state) => state.setAddedQuestionsFromList,
  );
  const cacheAddedQuestions = useMemo(() => addedQuestions, [addedQuestions]);
  const dummyState = useCreatePlanStore((state) => state.dummyState);

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
    }
    setFocus("planName");
  }, [planDetail, reset, setAddedQuestionsFromList, setFocus]);

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
        {cacheAddedQuestions && cacheAddedQuestions.length > 0 && (
          <ActionQuestionTable
            key={dummyState}
            data={cacheAddedQuestions}
            isAdded={true}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
        )}

        <div>
          <button
            className={`btn ${
              (!isValid ||
                !cacheAddedQuestions ||
                cacheAddedQuestions.length == 0) &&
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
