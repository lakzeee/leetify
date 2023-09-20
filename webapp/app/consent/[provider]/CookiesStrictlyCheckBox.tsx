import CheckBox from "@/app/consent/[provider]/CheckBox";

type Props = {
  value: boolean;
  handleChange: (value: boolean) => void;
};
export default function CookiesStrictlyCheckBox({
  value = false,
  handleChange,
}: Props) {
  return (
    <CheckBox value={true} handleChange={(value)=>handleChange(value)}>
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 max-w-md"
      >
        Accept: Use of Strictly necessary cookies
        <a className="text-primary" href={"/consent/privacypolicy"}>
          {" "}See List of strictly necessary cookies
        </a>
      </label>
    </CheckBox>

  );
}
