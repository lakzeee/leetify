import React from "react";
import {
  BiListUl,
  BiLogIn,
  BiSolidBookBookmark,
  BiSolidDashboard,
} from "react-icons/bi";
import { TbWorldHeart } from "react-icons/tb";

type Props = {
  user: any;
};
export default function Drawer({ user }: Props) {
  return (
    <>
      <div className="drawer z-40">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          {!user && (
            <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content pt-20">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard">
                  <BiLogIn />
                  Log In
                </a>
              </li>
            </ul>
          )}
          {user && (
            <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content pt-20">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard">
                  <BiSolidDashboard />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/plan">
                  <BiSolidBookBookmark />
                  My Plans
                </a>
              </li>
              <div className="divider" />
              <li>
                <a href="/question">
                  <BiListUl />
                  All Question
                </a>
              </li>
              <li>
                <a href="/plan/public">
                  <TbWorldHeart />
                  Explore Plans
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
