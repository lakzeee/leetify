"use client";
import AvatarButton from "@/UI/nav/AvatarButton";
import { BiMenuAltLeft } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import ThemeButton from "@/UI/nav/ThemeButton";

type Props = {
  scrollThreshold?: number;
  displayAvatar?: boolean;
  user: any;
  avatarChar: string;
};
export default function Nav({
  displayAvatar = true,
  scrollThreshold = 50,
  user,
  avatarChar,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
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
        } drop-shadow-md flex justify-between fixed top-0 z-50`}
      >
        {/*Title Button*/}
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost btn-sm drawer-button"
        >
          <BiMenuAltLeft size="20" />
        </label>

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
