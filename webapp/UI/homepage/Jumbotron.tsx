"use client";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Jumbotron() {
  const { theme } = useTheme();

  const imgUrl =
    theme === "night" ? "/SCR-20231008-qzea.jpeg" : "/SCR-20231008-radj.png";
  return (
    <section className="min-h-screen flex justify-center pt-24 md:pt-64 lg:pt-24 items-start bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
            Beta
          </span>{" "}
          <span className="text-sm font-medium">
            Welcome to Leetify Public Beta
          </span>
          <MdOutlineKeyboardArrowRight size={20} />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Supercharge Your Coding Interview Preparation.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Unlock Success with Leetify for Structured LeetCode Learning Plans,
          Real-Time Progress Tracking, and Personalized Insights
        </p>

        <button
          className="btn bg-blue-600 rounded-full text-white border-none hover:bg-blue-500"
          onClick={() =>
            // @ts-ignore
            document.getElementById("auth_modal").showModal()
          }
        >
          Get Started For Free
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
        <Image
          className="rounded-lg mt-8"
          src={imgUrl}
          width={1200}
          height={300}
          alt={"/"}
        />
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 -z-0"></div>
    </section>
  );
}
