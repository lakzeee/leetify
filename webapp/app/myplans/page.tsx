import Container from "@/UI/container";

export default function MyPlans() {
  return (
    <Container>
      <a href={"/myplans/create"} className="btn btn-primary">
        Create a plan
      </a>
    </Container>
  );
}
