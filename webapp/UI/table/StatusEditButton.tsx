import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useStatusStore } from "@/Components/hooks/useStatusStore";

export default function StatusEditButton() {
  const toggleDialog = useStatusStore((state) => state.toggleDialog);
  return (
    <button
      onClick={() => {
        // @ts-ignore
        document.getElementById("status-modal").showModal();
        toggleDialog();
      }}
    >
      <IoIosArrowDropdownCircle size={20} />
    </button>
  );
}
