"use client";
import Heading from "@/UI/heading";
import { signIn } from "next-auth/react";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";

export default function AuthPage() {
  return (
    <>
      <Heading
        center
        title="Log in to contiune"
        subTitle="If you don't have an account, log in to create one"
      />
      <div className="w-full flex justify-center">
        <div className="font-light max-w-lg text-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          By logging in, you agree to Leetify's
          <a className="text-primary" href={"/privacypolicy.html"}>
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
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center">
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
    </>
  );
}
