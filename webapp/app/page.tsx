"use client";
import Container from "../UI/container";
import StatusDnd from "@/UI/dnd/StatusDnd";

export default function Home() {
  return (
    <Container>
      <div className="modal-box max-w-sm h-auto">
        <h3 className="font-bold text-lg pb-4">Edit Status</h3>
        <StatusDnd />
      </div>
    </Container>
  );
}
