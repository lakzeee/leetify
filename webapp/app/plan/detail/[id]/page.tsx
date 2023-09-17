import Container from "@/UI/container";
import CreatePlanForm from "@/app/plan/create/CreatePlanForm";
import EditQuestionDialog from "@/app/plan/create/AddQuestionDialog";
import { GetPlanDetailById } from "@/Components/actions/planActions";
import { generateRandomKey } from "@/Components/utils/helpers";

export default async function PlanDetail({
  params,
}: {
  params: { id: string };
}) {
  const planDetail = await GetPlanDetailById(params.id);
  return (
    <Container>
      <CreatePlanForm
        key={generateRandomKey()}
        planDetail={planDetail}
        planId={params.id}
      />
      <EditQuestionDialog />
    </Container>
  );
}
