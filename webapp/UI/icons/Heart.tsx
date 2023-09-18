import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSavedPlansStore } from "@/Components/hooks/useSavedPlansStore";
import toast from "react-hot-toast";
import {
  RemovePlanFromUser,
  SavePlanToUser,
} from "@/Components/actions/planActions";

type Props = {
  userId?: string;
  planId: string;
  showWhenNotSaved?: boolean;
  isClickable?: boolean;
};

export default function Heart({
  userId,
  planId,
  showWhenNotSaved = false,
  isClickable = true,
}: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const savedPlans = useSavedPlansStore((state) => state.savedPlans);
  const addToSavedPlans = useSavedPlansStore((state) => state.addToSavedPlans);
  const removeFromSavedPlan = useSavedPlansStore(
    (state) => state.removeFromSavedPlans,
  );

  function handleSaveButton() {
    if (!isClickable) return;
    if (!userId) {
      toast("Please log in to do that");
      return;
    }
    if (isSaved) {
      RemovePlanFromUser({ planId, userId })
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          toast.success("Plan Removed");
        })
        .catch();
      removeFromSavedPlan(planId);
    } else {
      SavePlanToUser({ planId, userId })
        .then((r) => {
          if (r.error) {
            throw r.error;
          }
          toast.success("Plan Saved");
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
    <button onClick={handleSaveButton}>
      {isSaved && userId ? (
        <BsBookmarkHeartFill size={28} color="#F250A3" />
      ) : showWhenNotSaved ? (
        <BsBookmarkHeart size={28} />
      ) : (
        <></>
      )}
    </button>
  );
}
