"use client";
import Container from "@/UI/container";
import { useEffect, useState } from "react";
import {
  getUserByUserSub,
  updateUserProfileName,
} from "@/Components/actions/userActions";
import { User } from "@/types";
import toast from "react-hot-toast";

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
          toast.success("Update profile name success");
        })
        .catch(() => {
          toast.error("Something went wrong, please try again");
        });
    }
  }

  return (
    <Container>
      {userInfo && (
        <div className="flex flex-col gap-2">
          LogIn with {userInfo.authProvider}
          <span>{userInfo.email}</span>
          <input
            value={profileName}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs focus:outline-none"
            onChange={(e) => setProfileName(e.target.value)}
          />
          <button
            onClick={() => handleUpdateProfileName()}
            className="btn max-w-xs"
          >
            Submit
          </button>
        </div>
      )}
    </Container>
  );
}
