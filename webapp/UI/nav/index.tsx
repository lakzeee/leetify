"use client";
import AvatarButton from "@/UI/nav/AvatarButton";
import { BiMenuAltLeft } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/session/authUtils";
import ThemeButton from "@/UI/nav/ThemeButton";

type Props = {
  displayAvatar?: boolean;
};
export default function Nav({ displayAvatar = true }: Props) {
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
  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-md flex justify-between gap-2 fixed top-0 z-50">
        {/*Title Button*/}
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost btn-sm drawer-button"
        >
          <BiMenuAltLeft size="20" />
        </label>
        <div className="flex-1">
          <a
            href="/"
            className="normal-case text-xl font-medium hover:cursor-pointer "
          >
            Leetify
          </a>
        </div>

        <ThemeButton />
        {displayAvatar && <AvatarButton user={user} alt={avatarChar} />}
      </div>
    </>
  );
}
