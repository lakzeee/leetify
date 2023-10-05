import { PlanQuestionRes } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import { useRouter } from "next/navigation";

type Props = {
  plan: PlanQuestionRes;
  userId?: string;
  heartClickable?: boolean;
};
export default function PlanCard({ plan, heartClickable = true }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/plan/public/${plan.id}`)}
      className="card w-80 relative min-w-90 shadow-xl cursor-pointer dark:bg-gray-800"
    >
      <div className="-z-0 min-w-md">
        <div className="absolute right-0 mr-8 mt-8">
          <Heart
            planId={plan.id}
            showWhenNotSaved={true}
            isClickable={heartClickable}
            count={plan.savesCount || 0}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{plan.planName}</h2>
          <p>{plan.description}</p>
          <div className="card-actions justify-end">
            {plan.tags && <TopicBadges topics={plan.tags} />}
          </div>
        </div>
      </div>
    </div>
  );
}
