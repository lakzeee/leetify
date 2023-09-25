import { useState } from "react";
import Select from "react-tailwindcss-select";
import { useStatusStore } from "@/Components/hooks/useStatusStore";
import {
  badgeColor,
  convertDndItemsToOptions,
} from "@/Components/utils/helpers";

export default function StatusSelect() {
  const item = {
    value: "TO-DO",
    columnId: "a",
    label: "TO-DO",
  };
  const [statusItem, setStatusItem] = useState(item);
  const [activeColumn, setActiveColumn] = useState("");
  const handleChange = (value: any) => {
    console.log("value:", value);
    setActiveColumn(value.columnId);
    setStatusItem(value);
  };

  const statusItems = useStatusStore((state) => state.items);
  const options = convertDndItemsToOptions(statusItems);

  return (
    <div className="">
      <Select
        value={statusItem}
        onChange={handleChange}
        options={options}
        primaryColor={"indigo"}
        classNames={{
          // @ts-ignore
          menuButton: ({ data }) =>
            `flex w-[130px] py-0 flex justify-between text-sm text-white text-gray-500 border-none rounded-full transition-all duration-300 focus:outline-none ${badgeColor(
              activeColumn,
            )}`,
          menu: "absolute py-1 z-10 w-full bg-base-100 shadow-lg border-none rounded-lg text-sm text-gray-700 shadow-lg",
        }}
        formatOptionLabel={(data) => (
          <li
            className={`block transition duration-200 px-3 py-2 mt-2 cursor-pointer select-none truncate text-white text-sm rounded-full ${badgeColor(
              // @ts-ignore
              data.columnId,
            )}`}
          >
            {data.label}
          </li>
        )}
      />
    </div>
  );
}
