import { PlanQuestionRes } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import { useRouter } from "next/navigation";

type Props = {
  plan: PlanQuestionRes;
  userId?: string;
  heartClickable?: boolean;
};
export default function PlanCard({
  plan,
  userId,
  heartClickable = true,
}: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/plan/public/${plan.id}`)}
      className="relative card w-90 h-30 shadow-xl cursor-pointer"
    >
      <div className="-z-0">
        <div className="absolute right-0 mr-8">
          <Heart
            planId={plan.id}
            showWhenNotSaved={false}
            userId={userId}
            isClickable={heartClickable}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {plan.planName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{plan.description}</p>
          <div className="card-actions justify-end">
            {plan.tags && <TopicBadges topics={plan.tags} />}
          </div>
        </div>
      </div>
    </div>
  );
}
