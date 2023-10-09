"use client";
import AvatarButton from "@/UI/nav/AvatarButton";
import { BiMenuAltLeft } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/session/authUtils";
import ThemeButton from "@/UI/nav/ThemeButton";

type Props = {
  scrollThreshold?: number;
  displayAvatar?: boolean;
};
export default function Nav({
  displayAvatar = true,
  scrollThreshold = 50,
}: Props) {
  const [user, setUser] = useState(undefined); // State to hold user data
  const [avatarChar, setAvatarChar] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const userData: any = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setAvatarChar(userData.name.slice(0, 2));
      }
    }

    fetchUserData();

    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  return (
    <>
      <div
        className={`navbar transition duration-300 ease-in-out ${
          scrolled ? "bg-base-100" : "bg-transparent"
        } drop-shadow-md flex justify-between gap-2 fixed top-0 z-50`}
      >
        {/*Title Button*/}
        {user && (
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-sm drawer-button"
          >
            <BiMenuAltLeft size="20" />
          </label>
        )}
        <div className="flex-1 ml-4">
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
