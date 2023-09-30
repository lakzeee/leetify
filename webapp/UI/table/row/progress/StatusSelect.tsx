import { useState } from "react";
import Select from "react-tailwindcss-select";
import {
  badgeColor,
  convertDndItemsToOptions,
} from "@/Components/utils/helpers";

type Props = {
  value: any;
  onChange: (value: any) => void;
  statusItems: any;
};

export default function StatusSelect({ value, onChange, statusItems }: Props) {
  const [activeColumn, setActiveColumn] = useState(value.columnId);
  const handleChange = (selectedValue: any) => {
    setActiveColumn(selectedValue.columnId);
    onChange(selectedValue);
  };

  const options = convertDndItemsToOptions(statusItems);

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      primaryColor={"indigo"}
      classNames={{
        // @ts-ignore
        menuButton: ({ data }) =>
          `item-center flex w-[130px] justify-between text-sm text-white text-gray-500 border-none rounded-full transition-all duration-300 focus:outline-none ${badgeColor(
            activeColumn,
          )}`,
        menu: "absolute py-1 z-10 w-full bg-base-100 shadow-lg border-none rounded-lg text-sm text-gray-700 shadow-lg",
      }}
      formatOptionLabel={(data) => (
        <li
          className={`block transition duration-200 px-3 py-2 mt-2 mb-2 cursor-pointer select-none truncate text-white text-sm rounded-full ${badgeColor(
            // @ts-ignore
            data.columnId,
          )}`}
        >
          {data.label}
        </li>
      )}
    />
  );
}
