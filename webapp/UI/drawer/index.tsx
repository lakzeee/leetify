import React from "react";

export default function Drawer() {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content pt-20">
            {/* Sidebar content here */}
            <li>
              <a href="/question">All Question</a>
            </li>
            <li>
              <a href="/plan">My Plans</a>
            </li>
            <li>
              <a href="/session">Session(Dev Only)</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
