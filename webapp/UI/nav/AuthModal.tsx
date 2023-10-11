import { signIn } from "next-auth/react";
import Heading from "@/UI/heading";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";

export default function AuthModal() {
  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box">
        <Heading
          title={"Log In"}
          subTitle={
            "If you don't have an account, log in to create one for you.\n"
          }
        />
        <span className="font-light">
          By logging in, you agree to Leetify's
          <a className="text-primary" href={"/consent/privacypolicy"}>
            {" "}
            Privacy Policy,{" "}
          </a>
          <a className="text-primary" href={"/consent/termsofservice"}>
            {" "}
            Terms of Service.{" "}
          </a>
          And the use of strictly necessary{" "}
          <a className="text-primary" href={"/consent/cookies"}>
            cookies.
          </a>
        </span>
        <div className="flex flex-row gap-4 mt-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/consent/github" })}
            className="btn btn-md bg-blue-600 rounded-full text-white border-none hover:bg-blue-500"
          >
            <AiFillGithub />
            GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/consent/google" })}
            className="btn bg-blue-600 rounded-full text-white border-none hover:bg-blue-500 "
          >
            <AiFillGoogleCircle />
            Google
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
