import React from "react";
import Container from "@/UI/container";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}
