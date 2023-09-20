import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function StatusEditButton() {
  return (
    <button
      onClick={() =>
        // @ts-ignore
        document.getElementById("status-modal").showModal()
      }
    >
      <IoIosArrowDropdownCircle size={20} />
    </button>
  );
}
