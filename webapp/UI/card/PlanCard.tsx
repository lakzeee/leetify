import { PlanQuestionRes } from "@/types";
import TopicBadges from "@/UI/table/TopicBadges";

type Props = {
  plan: PlanQuestionRes;
};
export default function PlanCard({ plan }: Props) {
  return (
    <a
      href={`/plan/public/${plan.id}`}
      className="card w-90 bg-neutral-focus shadow-xl"
    >
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
    </a>
  );
}
