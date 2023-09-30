import React from "react";

export type BadgeData = {
  count: number;
  name: string;
  color: string;
};

type Props = {
  children: React.ReactNode;
  title: string;
  badgeData: BadgeData[];
};
export default function ProgressChartBase({
  children,
  title,
  badgeData,
}: Props) {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pr-1">
        {title}
      </h5>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {badgeData.map((data) => (
          <dl
            key={data.name}
            className={`bg-${data.color}-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]`}
          >
            <dt
              className={`w-8 h-8 rounded-full bg-${data.color}-100 dark:bg-${data.color}-500 text-${data.color}-400 dark:text-${data.color}-800 text-sm font-medium flex items-center justify-center mb-1`}
            >
              {data.count}
            </dt>
            <dd
              className={`text-${data.color}-600 dark:text-${data.color}-500 text-sm font-medium`}
            >
              {data.name}
            </dd>
          </dl>
        ))}
      </div>

      {/*Chart*/}
      <div className="w-full flex justify-center mt-8">{children}</div>
    </div>
  );
}
