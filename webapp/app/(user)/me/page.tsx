"use client";
import { useEffect, useState } from "react";
import {
  getUserByUserSub,
  updateUserProfileName,
} from "@/Components/actions/userActions";
import { User } from "@/types";
import toast from "react-hot-toast";
import Heading from "@/UI/heading";

export default function Me() {
  const [userInfo, setUserInfo] = useState<User>();
  const [profileName, setProfileName] = useState("");
  useEffect(() => {
    getUserByUserSub()
      .then((r) => {
        if (r.error) throw r.error;
        setUserInfo(r);
        setProfileName(r.profileName);
      })
      .catch();
  }, []);

  function handleUpdateProfileName() {
    if (userInfo && userInfo.id) {
      updateUserProfileName(userInfo.id, profileName)
        .then((r) => {
          if (r.error) throw r.error;
          toast.success("Profile updated successfully");
        })
        .catch(() => {
          toast.error("Something went wrong, please try again");
        });
    }
  }

  return (
    <>
      {userInfo && (
        <div className="flex flex-col gap-2">
          <Heading
            title={"Profile"}
            subTitle={"Update your profile details below."}
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              disabled
              placeholder={userInfo.email}
              type="text"
              className="input input-bordered w-full max-w-xs focus:outline-none"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Name</span>
            </label>
            <input
              value={profileName}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs focus:outline-none"
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleUpdateProfileName()}
            className={`btn btn-sm max-w-xs ${!profileName && "btn-disabled"}`}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
