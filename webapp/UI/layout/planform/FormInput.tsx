type Props = {
  placeholder: string;
  value?: string;
  handleChange?: (value: string) => void;
};
export default function FormInput({ placeholder, value, handleChange }: Props) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange?.(e.target.value)}
        className="input input-primary focus:ring-0 focus:border-none w-full max-w-xs"
      />
    </>
  );
}
