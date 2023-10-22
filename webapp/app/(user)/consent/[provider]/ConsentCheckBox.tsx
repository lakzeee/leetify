import CheckBox from "@/app/(user)/consent/[provider]/CheckBox";

type Props = {
  value: boolean;
  handleChange: (value: boolean) => void;
};
export default function ConsentCheckBox({
  value = false,
  handleChange,
}: Props) {
  return (
    <CheckBox value={value} handleChange={(value) => handleChange(value)}>
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        I accept the
        <a className="text-primary" href={"/consent/privacypolicy"}>
          {" "}
          Privacy Policy{" "}
        </a>
        and the
        <a className="text-primary" href={"/consent/termsofservice"}>
          {" "}
          Terms of Service.
        </a>
      </label>
    </CheckBox>
  );
}
