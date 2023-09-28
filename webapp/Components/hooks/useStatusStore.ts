import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { DndId, DndItem } from "@/types";
import { generateRandomKey } from "@/Components/utils/helpers";

type State = {
  items: DndItem[];
  dummyState: number;
  dialogFlag: boolean;
};

type Actions = {
  setItems: (items: DndItem[]) => void;
  createNewItem: (columnId: DndId, columnName: string) => void;
  deleteItem: (itemId: DndId) => void;
  updateItem: (itemId: DndId, content: string) => void;
  toggleDialog: () => void;
  incDummy: () => void;
};

const initialState: State = {
  items: [],
  dummyState: 0,
  dialogFlag: false,
};

export const useStatusStore = createWithEqualityFn<State & Actions>(
  (set) => ({
    ...initialState,
    toggleDialog: () => {
      set((state) => ({ dialogFlag: !state.dialogFlag }));
    },
    incDummy: () => {
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
    setItems: (items) => {
      set((state) => ({ items: items }));
    },
    createNewItem: (columnId, columnName) => {
      set((state) => {
        const items = state.items;
        const newItem: DndItem = {
          id: generateRandomKey(),
          columnId,
          content: columnName,
        };
        items.push(newItem);
        return { items: items };
      });
      set((state) => ({ dummyState: state.dummyState + 1 }));
    },
    deleteItem: (itemId) => {
      set((state) => {
        return { items: state.items.filter((item) => item.id !== itemId) };
      });
    },
    updateItem: (itemId, content) => {
      set((state) => {
        const newItems = state.items.map((item) => {
          if (item.id !== itemId) return item;
          return { ...item, content };
        });
        return { items: newItems };
      });
    },
  }),
  shallow,
);
