import { DndId, DndItem } from "@/types";
import { BiTrashAlt } from "react-icons/bi";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  item: DndItem;
  deleteItem: (itemId: DndId) => void;
  updateItem: (itemId: DndId, content: string) => void;
};
export default function ItemCard({ item, deleteItem, updateItem }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "Item",
      item,
    },
    disabled: editMode,
  });
  function toggleEditMode() {
    setEditMode(!editMode);
    setMouseIsOver(false);
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`opacity-50 bg-base-100 h-10 mb-2 py-2 px-3 rounded-lg`}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className={`bg-base-100 h-10 mb-2 py-2 px-3 rounded-lg flex flex-row items-center justify-between cursor-pointer hover:ring-2 hover:ring-inset hover:ring-primary`}
    >
      {!editMode && item.content}
      {editMode && (
        <input
          className="bg-base-100 focus:border-none focus:outline-none w-18"
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
