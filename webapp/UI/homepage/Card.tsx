import React from "react";

type Props = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  reverse?: boolean;
  stack?: boolean;
};
export default function Card({
  title,
  subTitle,
  children,
  reverse,
  stack,
}: Props) {
  if (stack) {
    return (
      <div
        className={`flex gap-6 min-h-80 h-auto mt-8 justify-items-center flex-col`}
      >
        <div
          className={`flex flex-col items-center justify-center pl-8 gap-2 basis-2/3`}
        >
          <h2 className="font-bold text-gray-900 text-2xl lg:text-4xl dark:text-white text-center">
            {title}
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-200">
            {subTitle}
          </p>
        </div>
        <div className="flex justify-center basis-1/3">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-6 min-h-80 h-auto mt-8 justify-items-center flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center pl-8 gap-2 basis-2/3 ${
          reverse ? "md:items-end" : "md:items-start"
        }`}
      >
        <h2 className="font-bold text-gray-900 text-2xl lg:text-4xl dark:text-white ">
          {title}
        </h2>
        <p className="font-light text-gray-500 dark:text-gray-200">
          {subTitle}
        </p>
      </div>
      <div className="flex justify-center basis-1/3">{children}</div>
    </div>
  );
}
