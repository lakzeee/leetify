"use client";
import { useEffect, useMemo, useState } from "react";
import { DndColumn, DndId, DndItem } from "@/types";
import { generateRandomKey } from "@/Components/utils/helpers";
import ColumnContainer from "@/UI/dnd/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ItemCard from "@/UI/dnd/ItemCard";

export default function DndDemo() {
  const [columns, setColumns] = useState<DndColumn[]>([]);
  const [items, setItems] = useState<DndItem[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<DndColumn | null>();
  const [activeItem, setActiveItem] = useState<DndItem | null>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  useEffect(() => {
    console.log(items);
    console.log(columns);
  }, [items]);

  function createNewColum() {
    const columnToAdd: DndColumn = {
      id: generateRandomKey(),
      title: `Column ${columns?.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColum(id: DndId) {
    setColumns(columns.filter((c) => c.id != id));
    setItems(items.filter((item) => item.columnId !== id));
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Item") {
      setActiveItem(event.active.data.current.item);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    setActiveColumn(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId == overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId == overId) return;
    const isActiveItem = active.data.current?.type === "Item";
    const isOverItem = active.data.current?.type === "Item";
    if (!isActiveItem) return;
    // dragging a task over another task
    if (isActiveItem && isOverItem) {
      setItems((item) => {
        const activeIndex = items.findIndex((t) => t.id === activeId);
        const overIndex = items.findIndex((t) => t.id === overId);
        if (items[activeIndex] && items[overIndex])
          items[activeIndex].columnId = items[overIndex].columnId;
        return arrayMove(items, activeIndex, overIndex);
      });
    }
    // dragging a task over a column
    const isOverColumn = active.data.current?.type === "Column";
    if (isActiveItem && isOverColumn) {
      setItems((item) => {
        const activeIndex = items.findIndex((t) => t.id === activeId);
        if (items[activeIndex]) items[activeIndex].columnId = overId;
        return arrayMove(items, activeIndex, activeIndex);
      });
    }
  }

  function updateColumn(id: DndId, value: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title: value };
    });
    setColumns(newColumns);
  }

  function createNewItem(columnId: DndId) {
    const newItem: DndItem = {
      id: generateRandomKey(),
      columnId,
      content: `Task ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  }

  function deleteItem(itemId: DndId) {
    setItems(items.filter((item) => item.id != itemId));
  }

  function updateItem(itemId: DndId, content: string) {
    const newItems: DndItem[] = items.map((item) => {
      if (item.id !== itemId) return item;
      return { ...item, content };
    });
    setItems(newItems);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <button className="btn btn-sm mb-2 w-full" onClick={createNewColum}>
        + Add Group
      </button>
      <SortableContext items={columnsId}>
        {columns.length > 0 &&
          columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              deleteColumn={deleteColum}
              updateColumn={updateColumn}
              createNewItem={createNewItem}
              items={items.filter((item) => item.columnId === column.id)}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          ))}
      </SortableContext>
      {typeof window === "object" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColum}
                updateColumn={updateColumn}
                createNewItem={createNewItem}
                items={items.filter(
                  (item) => item.columnId === activeColumn.id,
                )}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            )}
            {activeItem && (
              <ItemCard
                item={activeItem}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}
