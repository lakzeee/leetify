import { signOut } from "next-auth/react";

export function LogOut(callbackUrl: string = "/") {
  const userId = localStorage.getItem("userId");
  if (userId) {
    localStorage.removeItem("userId");
  }
  signOut({ callbackUrl: callbackUrl });
}
