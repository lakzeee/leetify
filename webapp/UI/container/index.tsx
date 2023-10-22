"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/UI/nav";
import Drawer from "@/UI/drawer";
import Footer from "@/UI/homepage/Footer";
import { getCurrentUser } from "@/app/(user)/session/authUtils";

type Props = {
  isLoading?: boolean;
  displayAvatar?: boolean;
  children: React.ReactNode;
  scrollThreshold?: number;
};
export default function Container({
  displayAvatar,
  children,
  isLoading,
  scrollThreshold,
}: Props) {
  const [isChildrenLoaded, setIsChildrenLoaded] = useState(false);
  const [user, setUser] = useState(undefined); // State to hold user data
  const [avatarChar, setAvatarChar] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const userData: any = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setAvatarChar(userData.name.slice(0, 2));
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    let timeoutId: any;
    if (!isLoading) {
      const delay = 1000;
      timeoutId = setTimeout(() => {
        setIsChildrenLoaded(true);
      }, delay);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading]);

  return (
    <>
      <Nav
        scrollThreshold={scrollThreshold}
        displayAvatar={displayAvatar}
        user={user}
        avatarChar={avatarChar}
      />
      <Drawer user={user} />
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
          } transition-opacity duration-500 ease-in-out max-w-6xl w-full min-h-screen`}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
