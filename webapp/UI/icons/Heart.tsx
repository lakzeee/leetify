import { useEffect, useState } from "react";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";
import toast from "react-hot-toast";
import {
  RemovePlanFromUser,
  SavePlanToUser,
} from "@/Components/actions/planActions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  isLogIn?: boolean;
  count: number;
  planId: string;
  showWhenNotSaved?: boolean;
  isClickable?: boolean;
};

export default function Heart({
  isLogIn,
  planId,
  showWhenNotSaved = false,
  isClickable = true,
  count,
}: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(count);
  const savedPlans = useSavedPlansStore((state) => state.savedPlans);
  const addToSavedPlans = useSavedPlansStore((state) => state.addToSavedPlans);
  const removeFromSavedPlan = useSavedPlansStore(
    (state) => state.removeFromSavedPlans,
  );

  function handleSaveButton() {
    if (!isLogIn) {
      toast.error("Please Log In To Do this.");
      return;
    }
    if (!isClickable) return;
    if (isSaved) {
      RemovePlanFromUser(planId)
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          toast.success("Plan Removed");
          setSavesCount(savesCount - 1);
        })
        .catch();
      removeFromSavedPlan(planId);
    } else {
      SavePlanToUser(planId)
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          toast.success("Plan Saved");
          setSavesCount(savesCount + 1);
        })
        .catch();
      addToSavedPlans(planId);
    }
  }

  useEffect(() => {
    if (savedPlans.has(planId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [planId, savedPlans, addToSavedPlans, removeFromSavedPlan]);

  return (
    <>
      <button onClick={handleSaveButton}>
        {isSaved ? (
          <AiFillHeart size={20} color="#F250A3" />
        ) : showWhenNotSaved ? (
          <AiOutlineHeart size={20} />
        ) : (
          <></>
        )}
      </button>
      <span>{savesCount}</span>
    </>
  );
}
