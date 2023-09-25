import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { DndColumn, DndItem } from "@/types";
import { RiAddCircleLine } from "react-icons/ri";
import StatusItemCard from "@/UI/dnd/StatusDnd/StatusItemCard";
import { useStatusStore } from "@/Components/hooks/useStatusStore";

type Props = {
  column: DndColumn;
  items?: DndItem[];
};
export default function StatusGroupContainer({ column, items }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const createNewItem = useStatusStore((state) => state.createNewItem);
  return (
    <div
      tabIndex={0}
      className={`collapse bg-base-200 mb-1 ${isOpen && "collapse-open"}`}
    >
      <input type="checkbox" />
      <div className="collapse-title text-md font-medium flex flex-row justify-between items-center px-4 py-0">
        {/*Colum Title*/}
        <div className="flex flex-row gap-1 justify-center items-center">
          {column.title}
        </div>
        <div>
          <button className="btn btn-sm" onClick={() => setIsOpen(!isOpen)}>
            <BiChevronDown />
          </button>
        </div>
      </div>
      {/*Colum Content*/}
      <div className="collapse-content">
        <div className="min-h-[100px] flex flex-col">
          {/*Item List*/}
          <div className="flex flex-grow flex-col overflow-y-auto">
            {items &&
              items.map((item) => <StatusItemCard key={item.id} item={item} />)}
          </div>
          {/*Add Item Button*/}
          <div>
            <button
              className="btn btn-sm w-full bg-base-100 mt-2"
              onClick={() => {
                createNewItem(column.id);
              }}
            >
              <RiAddCircleLine />
              Add Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
