import { AiOutlineArrowUp } from "react-icons/ai";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  percentage?: string;
  large?: boolean;
  xl?: boolean;
};
export default function DashboardChartBase({
  children,
  title,
  subTitle,
  percentage,
  large,
}: Props) {
  return (
    <div
      className={`w-full flex flex-col justify-center bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 overflow-y-scroll ${
        large ? "max-w-sm lg:max-w-3xl" : "max-w-sm"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
            {title}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {subTitle}
          </p>
        </div>
        {percentage && (
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            {percentage}
            <AiOutlineArrowUp />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
