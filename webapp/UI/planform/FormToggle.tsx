import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;
export default function FormToggle(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: false,
  });

  return (
    <>
      <div className="w-52 flex flex-row justify-start items-center gap-2">
        <label className="cursor-pointer label">
          <span className="label-text">{props.label}</span>
        </label>
        <input
          {...props}
          {...field}
          type="checkbox"
          placeholder={props.label}
          className="toggle"
        />
      </div>
    </>
  );
}
