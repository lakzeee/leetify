import StatusDnd from "@/UI/dnd/StatusDnd/StatusDnd";
import { DndItem } from "@/types";
import { useStatusStore } from "@/Components/hooks/useStatusStore";

type Props = {
  items: DndItem[];
};
export default function StatusEditDialog({ items }: Props) {
  const toggleDialog = useStatusStore((state) => state.toggleDialog);
  return (
    <dialog id="status-modal" className="modal">
      <div className="modal-box max-w-xs h-auto">
        <h3 className="font-bold text-lg pb-4">Edit Status</h3>
        <StatusDnd items={items} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => toggleDialog()}>close</button>
      </form>
    </dialog>
  );
}
