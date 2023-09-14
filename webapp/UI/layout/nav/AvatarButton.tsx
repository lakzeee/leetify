import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import NavLogin from "@/UI/layout/nav/NavLogin";

export default function AvatarButton() {
  const [avatarChar, setAvatarChar] = useState(null);
  return (
    <>
      <div className="dropdown dropdown-left">
        <div
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar placeholder"
        >
          <div
            className={`${
              avatarChar ? "bg-accent" : "bg-neutral-content"
            } rounded-full w-9`}
          >
            {avatarChar ? (
              <span className="text-accent-content">{avatarChar}</span>
            ) : (
              <AiOutlineUser className="text-accent-content" size={24} />
            )}
          </div>
        </div>
        <NavLogin user={""} />
      </div>
    </>
  );
}
