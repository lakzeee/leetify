type Props = {
  value: string;
  onChange: (value: string) => void;
  setEditMode: (value: boolean) => void;
};
export default function TagsInput({ value, onChange, setEditMode }: Props) {
  function handleInputChange(e: any) {
    onChange(e.target.value);
  }

  return (
    <input
      className="bg-base-100 focus:border-none focus:outline-none p-2 dark:bg-gray-800"
      onChange={handleInputChange}
      value={value}
      autoFocus
      onBlur={() => setEditMode(false)}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        setEditMode(false);
      }}
    />
  );
}
