"use client";
import QuestionsList from "@/app/question/QuestionsList";
import Container from "../../UI/container";
import DeletePlanConfirmModal from "@/app/plan/DeletePlanConfirmModal";

export default function My() {
  return (
    <Container>
      <QuestionsList />
    </Container>
  );
}
