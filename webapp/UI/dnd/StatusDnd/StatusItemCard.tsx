import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { DndItem } from "@/types";
import { useStatusStore } from "@/Components/hooks/useStatusStore";
import StatusBadge from "@/UI/badge/StatusBadge";

type Props = {
  item: DndItem;
};
export default function StatusItemCard({ item }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const updateItem = useStatusStore((state) => state.updateItem);
  const deleteItem = useStatusStore((state) => state.deleteItem);

  function toggleEditMode() {
    setEditMode(!editMode);
    setMouseIsOver(false);
  }

  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className={`bg-base-200 rounded-full h-10 px-3 flex flex-row items-center justify-between cursor-pointer hover:ring-2 hover:ring-inset hover:ring-base-100`}
    >
      {!editMode && (
        <StatusBadge
          columnId={item.columnId.toString()}
          statusName={item.content}
        />
      )}

      {editMode && (
        <input
          className="bg-base-200 focus:border-none focus:outline-none w-18"
          onChange={(e) => updateItem(item.id, e.target.value)}
          value={item.content}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditMode(false);
          }}
        />
      )}
      {mouseIsOver && (
        <button onClick={() => deleteItem(item.id)}>
          <BiTrashAlt />
        </button>
      )}
    </div>
  );
}
