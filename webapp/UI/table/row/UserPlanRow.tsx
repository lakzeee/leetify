"use client";
import { PlanQuestionRes } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import { DateTimeHelper } from "@/Components/utils/DateTimeHelper";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import Heading from "@/UI/heading";
import { DeletePlanById } from "@/Components/actions/planActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  userPlan: PlanQuestionRes;
};
export default function UserPlanRow({ userPlan }: Props) {
  const router = useRouter();
  function handleDelete() {
    DeletePlanById(userPlan.id)
      .then((res) => {
        if (res.error) throw res.error();
        toast.success("Plan has been removed!");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Something went wrong", error.message);
      });
  }

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">{userPlan.planName}</td>
        <td className="px-6 py-4">
          {userPlan.isPublic ? (
            <div className="badge badge-primary">Public</div>
          ) : (
            <div className="badge">Private</div>
          )}
        </td>
        <td className="px-6 py-4">
          {userPlan.tags && <TopicBadges topics={userPlan.tags} />}
        </td>
        <td className="px-6 py-4">{DateTimeHelper(userPlan.createdAt)}</td>
        <td className="px-6 py-4">{DateTimeHelper(userPlan.updatedAt)}</td>
        <td className="px-6 py-4">
          <div className="flex flex-row gap-1">
            <a
              href={`/plan/detail/${userPlan.id}`}
              className="btn btn-circle btn-sm btn-accent"
            >
              <AiFillEdit />
            </a>
            <button
              className="btn btn-circle btn-sm"
              onClick={() =>
                // @ts-ignore
                document.getElementById("delete_modal").showModal()
              }
            >
              <AiTwotoneDelete />
            </button>
          </div>
          <dialog id="delete_modal" className="modal modal-middle">
            <form method="dialog" className="modal-box max-w-sm">
              <Heading
                title={"Confirm Delete"}
                subTitle={`Are you sure to you want to delete plan: ${userPlan.planName} ? \n You can't undo this action`}
              />
              <div className="modal-action flex flex-row gap-2 mt-4 justify-start">
                <button className="btn btn-sm btn-outline">Cancel</button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </td>
      </tr>
    </>
  );
}
