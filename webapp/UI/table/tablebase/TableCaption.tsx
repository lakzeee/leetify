import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function TableCaption({ children }: Props) {
  return (
    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      {children}
    </caption>
  );
}
