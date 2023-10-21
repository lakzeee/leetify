import { PlanQuestionRes } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";
import Heart from "@/UI/icons/Heart";
import { useRouter } from "next/navigation";

type Props = {
  plan: PlanQuestionRes;
  userId?: string;
  heartClickable?: boolean;
};

function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    if (str.length < 32) {
      return str + "\n"; // Add a line break if the string is shorter than 32 characters
    } else {
      return str;
    }
  } else {
    return str.slice(0, maxLength - 3) + "...";
  }
}

export default function PlanCard({ plan, heartClickable = false }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/plan/public/${plan.id}`)}
      className="card max-h-40 h-40 w-80 rounded-lg relative min-w-90 shadow-xl cursor-pointer dark:bg-gray-800"
    >
      <div className="-z-0 min-w-md">
        <div className="absolute right-0 mr-8 mt-8">
          <Heart
            planId={plan.id}
            showWhenNotSaved={true}
            isClickable={false}
            count={plan.savesCount || 0}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{truncateString(plan.planName, 24)}</h2>
          <p>{truncateString(plan.description, 65)}</p>
          <div className="card-actions justify-end">
            {plan.tags && <TopicBadges topics={plan.tags} />}
          </div>
        </div>
      </div>
    </div>
  );
}
