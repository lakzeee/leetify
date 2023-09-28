import TopicBadges from "@/UI/table/TopicBadges";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Props = {
  value: string;
  onChange: (value: string) => void;
  editMode: boolean;
  setEditMode: (flag: boolean) => void;
  handleConfirm: () => void;
};
export default function TagsBox({
  value,
  onChange,
  setEditMode,
  editMode,
  handleConfirm,
}: Props) {
  return (
    <div>
      {!editMode && (
        <span onClick={() => setEditMode(!editMode)}>
          <TopicBadges topics={value} color={"badge-neutral"} />
        </span>
      )}
      {editMode && (
        <div className="w-full flex flex-row justify-center items-center">
          <input
            className="bg-base-100 max-w-[100px] focus:border-none focus:outline-none p-2 dark:bg-gray-800"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            autoFocus
          />
          <button onClick={handleConfirm}>
            <IoIosCheckmarkCircle color="#2DD4BE" size={30} />
          </button>
        </div>
      )}
    </div>
  );
}
