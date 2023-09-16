type Props = {
  placeholder: string;
  value?: boolean;
  handleChange?: (value: boolean) => void;
};
export default function FormToggle({
  placeholder,
  value,
  handleChange,
}: Props) {
  return (
    <>
      <div className="w-52 flex flex-col">
        <label className="cursor-pointer label">
          <span className="label-text">{placeholder}</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={value}
            onChange={(event) => {
              handleChange?.(event.target.checked);
            }}
          />
        </label>
      </div>
    </>
  );
}
