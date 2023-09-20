import StatusDnd from "@/UI/dnd/StatusDnd";

export default function StatusEditDialog() {
  return (
    <dialog id="status-modal" className="modal">
      <div className="modal-box max-w-xs h-auto">
        <h3 className="font-bold text-lg pb-4">Edit Status</h3>
        <StatusDnd />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
