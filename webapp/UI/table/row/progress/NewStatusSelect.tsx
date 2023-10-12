import { generateRandomKey } from "@/Components/utils/helpers";
import { HiCheck } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import StatusBadge from "@/UI/badge/StatusBadge";
import { DndItem } from "@/types";
import { IoIosArrowDropdownCircle } from "react-icons/io";

type Props = {
  value: DndItem;
  onChange: (value: DndItem) => void;
  statusItems?: DndItem[];
};
export default function NewStatusSelect({
  value,
  onChange,
  statusItems,
}: Props) {
  function handleItemClick(item: any) {
    const elem = document.activeElement;
    if (elem) {
      // @ts-ignore
      elem?.blur();
    }
    onChange(item);
  }

  let badgeColor =
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  if (value.columnId === "b")
    badgeColor =
      "bg-orange-100 text-orange-600 dark:bg-yellow-800 dark:text-yellow-300";
  if (value.columnId === "c")
    badgeColor =
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";

  return (
    <>
      <div className="dropdown dropdown-end cursor-pointer">
        <label
          tabIndex={0}
          className={`badge ${badgeColor} gap-[4px] flex justify-center item-center border-none cursor-pointer hover:scale-105 transition-transform duration-300 m-1`}
        >
          {value.columnId === "c" ? <HiCheck /> : <GoDotFill size={10} />}{" "}
          {value.content}
        </label>
        {statusItems && statusItems.length > 0 && (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box max-w-xs gap-2"
          >
            {statusItems.map((item) => (
              <div
                key={generateRandomKey()}
                onClick={() => handleItemClick(item)}
                className="hover:scale-105 transition-transform duration-300 flex"
              >
                <StatusBadge
                  columnId={item.columnId as string}
                  statusName={item.content}
                />
              </div>
            ))}
          </ul>
        )}
        {!statusItems ||
          (statusItems.length === 0 && (
            <div
              tabIndex={0}
              className="dropdown-content z-[1] card card-compact w-64 py-1 shadow bg-base-100 text-primary-content"
            >
              <div className="card-body">
                <p className="text-neutral-content flex flex-row items-center gap-1">
                  Click STATUS
                  <IoIosArrowDropdownCircle size={18} />
                  from above to
                </p>
                <p className="text-neutral-content">
                  add status name to get started
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
