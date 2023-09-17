import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;
export default function FormToggle(props: Props) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });

  return (
    <>
      <div className="w-52 flex flex-row justify-start items-center gap-2 z-0">
        {/*TODO: Fix the bug of relative prop make ths toggle display on top of drawer*/}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...props}
            {...field}
            type="checkbox"
            className="sr-only peer"
            checked={field.value}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {props.label}
          </span>
        </label>
      </div>
    </>
  );
}
