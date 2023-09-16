"use client";
import React from "react";
import Nav from "@/UI/nav";
import Drawer from "@/UI/drawer";

type Props = {
  displayAvatar?: boolean;
  children: React.ReactNode;
};
export default function Container({ displayAvatar, children }: Props) {
  return (
    <>
      <Nav displayAvatar={displayAvatar} />
      <Drawer />
      <div className="container mx-auto min-h-full px-4 pt-24 z-0 flex flex-col items-center">
        {/* Toggle button */}
        {children}
      </div>
    </>
  );
}
