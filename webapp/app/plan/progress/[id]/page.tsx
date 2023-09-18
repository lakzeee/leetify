import Container from "@/UI/container";

export default function ProgressPage({ params }: { params: { id: string } }) {
  return <Container>{params.id}</Container>;
}
