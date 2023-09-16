import EditQuestionDialog from "@/app/myplans/create/AddQuestionDialog";
import CreatePlanForm from "@/app/myplans/create/CreatePlanForm";
import Container from "../../../UI/container";
import { getCurrentUser } from "@/app/session/authUtils";
import Heading from "@/UI/heading";

export default async function CreatePlan() {
  const user = await getCurrentUser();

  return (
    <Container>
      {!user ? (
        <Heading
          title={"You Need Log In to Create Plan"}
          subTitle={"Click the avatar button to sign up or log in"}
        />
      ) : (
        <>
          <CreatePlanForm />
          <EditQuestionDialog />
        </>
      )}
    </Container>
  );
}
