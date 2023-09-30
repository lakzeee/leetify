import { AiFillClockCircle } from "react-icons/ai";

type Props = {
  name: string;
};
export default function TimeBadge({ name }: Props) {
  return (
    <div
      className={`badge flex justify-center item-center gap-[4px] border-none`}
    >
      <AiFillClockCircle size={10} />
      {name}
    </div>
  );
}
