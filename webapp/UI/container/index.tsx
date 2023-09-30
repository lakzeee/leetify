"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/UI/nav";
import Drawer from "@/UI/drawer";

type Props = {
  isLoading?: boolean;
  displayAvatar?: boolean;
  children: React.ReactNode;
};
export default function Container({
  displayAvatar,
  children,
  isLoading,
}: Props) {
  const [isChildrenLoaded, setIsChildrenLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Use a timeout to simulate a delay (you can adjust the duration)
      const delay = 1000; // 1 second
      setTimeout(() => {
        setIsChildrenLoaded(true);
      }, delay);
    }
  }, [isLoading]);
  return (
    <>
      <Nav displayAvatar={displayAvatar} />
      <Drawer />
      <div className="container mx-auto min-h-full px-4 pt-24 z-0 flex flex-col items-center">
        {/* Toggle button */}
        {isLoading && (
          <div className="h-screen w-full flex justify-center items-center fixed top-0 left-0">
            <progress className="progress w-80" />
          </div>
        )}
        <div
          className={`${
            isChildrenLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-in-out max-w-6xl w-full`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
