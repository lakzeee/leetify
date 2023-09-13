"use client";
import ThemeButton from "@/UI/layout/nav/ThemeButton";
import AvatarButton from "@/UI/layout/nav/AvatarButton";
import { BiMenuAltLeft } from "react-icons/bi";

export default function Nav() {
  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-md flex justify-between gap-2 fixed top-0 z-50">
        {/*Title Button*/}
        <label
          htmlFor="my-drawer"
          className="hover:cursor-pointer drawer-button mx-4"
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
        <div className="flex-none">
          <ThemeButton />
          <AvatarButton />
        </div>
      </div>
    </>
  );
}
