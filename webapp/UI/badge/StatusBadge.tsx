"use client";
import { HiCheck } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";

type Props = {
  columnId: string;
  statusName: string;
};
export default function StatusBadge({ columnId, statusName }: Props) {
  let badgeColor =
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  if (columnId === "b")
    badgeColor =
      "bg-orange-100 text-orange-600 dark:bg-yellow-800 dark:text-yellow-300";
  if (columnId === "c")
    badgeColor =
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
  return (
    <div
      className={`badge ${badgeColor} gap-[4px] flex justify-center item-center border-none`}
    >
      {columnId === "c" ? <HiCheck /> : <GoDotFill size={10} />} {statusName}
    </div>
  );
}
