import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type Props = {
  icon: string;
  iconText: string;
  title: string;
  subTitle: string;
  buttonText: string;
};
export default function TextCard({
  icon,
  iconText,
  buttonText,
  title,
  subTitle,
}: Props) {
  let IconElm;
  switch (icon) {
    case "fire":
      IconElm = FaFireAlt;
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
      <div className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2 gap-2">
        <IconElm />
        {iconText}
      </div>
      <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
        {title}
      </h1>
      <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
        {subTitle}
      </p>
      <button className="btn bg-blue-600 rounded-full text-white border-none hover:bg-blue-500">
        {buttonText}
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
  );
}
