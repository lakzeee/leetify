import { signIn } from "next-auth/react";
import Heading from "@/UI/heading";

export default function AuthModal() {
  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box">
        <Heading
          title={"Welcome"}
          subTitle={
            "If you don't have an account, log in will create one for you"
          }
        />
        <div className="flex flex-row gap-4 mt-6">
          <button
            onClick={() => signIn("github", { callbackUrl: "/consent/github" })}
            className="btn btn-primary"
          >
            Log In with GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/consent/google" })}
            className="btn btn-primary"
          >
            Log In with Google
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
