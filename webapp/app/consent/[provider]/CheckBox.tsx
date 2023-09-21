import React from "react";

type Props = {
  value: boolean;
  handleChange: (value: boolean) => void;
  children: React.ReactNode
};
export default function CheckBox({value = false, handleChange, children}: Props) {
  return (
    <div className="flex items-center my-4">
      <input

        id="default-checkbox"
        type="checkbox"
        // @ts-ignore
        value={value}
        checked={value}
        onChange={(event) => {
          handleChange?.(event.target.checked);
        }}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {children}
      </label>
    </div>
  );
}
