import { DndId, DndColumn, DndItem } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { BiChevronDown, BiTrashAlt } from "react-icons/bi";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiAddCircleLine } from "react-icons/ri";
import ItemCard from "@/UI/dnd/ItemCard";

type Props = {
  column: DndColumn;
  deleteColumn: (id: DndId) => void;
  updateColumn: (id: DndId, value: string) => void;
  createNewItem: (columnId: DndId) => void;
  items: DndItem[];
  deleteItem: (itemId: DndId) => void;
  updateItem: (itemId: DndId, content: string) => void;
};
export default function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createNewItem,
  deleteItem,
  items,
  updateItem,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const itemsIds = useMemo(() => {
    return items.map((item) => item.id);
  }, [items]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  useEffect(() => {
    if (isDragging) setIsOpen(false);
  }, [isDragging]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        tabIndex={0}
        ref={setNodeRef}
        style={style}
        className="collapse bg-base-100 mb-1 opacity-60"
      >
        <div className="collapse-title h-6 p-4"></div>
        <div className="collapse-content"></div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      tabIndex={0}
      className={`collapse bg-base-200 mb-1 ${isOpen && "collapse-open"}`}
    >
      <input type="checkbox" />
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="collapse-title h-6 text-md font-medium flex flex-row justify-between items-center p-4"
      >
        {/*Colum Title*/}
        <div className="flex flex-row gap-1 justify-center items-center">
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-base-200 focus:border-none focus:outline-none w-18"
              onChange={(e) => updateColumn(column.id, e.target.value)}
              value={column.title}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <div>
          <button
            className="btn btn-sm"
            onClick={() => deleteColumn(column.id)}
          >
            <BiTrashAlt />
          </button>
          <button className="btn btn-sm" onClick={() => setIsOpen(!isOpen)}>
            <BiChevronDown />
          </button>
        </div>
      </div>
      {/*Colum Content*/}
      <div className="collapse-content">
        <div className="min-h-12 flex flex-col">
          {/*Item List*/}
          <div className="flex flex-grow flex-col overflow-y-auto">
            <SortableContext items={itemsIds}>
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  updateItem={updateItem}
                />
              ))}
            </SortableContext>
          </div>
          {/*Add Item Button*/}
          <div>
            <button
              className="btn btn-sm w-full bg-base-100"
              onClick={() => createNewItem(column.id)}
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
