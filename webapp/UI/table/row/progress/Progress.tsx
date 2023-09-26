import StatusSelect from "@/UI/table/row/progress/StatusSelect";
import TagsBox from "@/UI/table/row/progress/TagsBox";
import { DndItem, ProgressRecord } from "@/types";
import { useStatusStore } from "@/Components/hooks/useStatusStore";
import { useState } from "react";
import { CreateRecord } from "@/Components/actions/progressActions";

type Props = {
  leetCodeNo: number;
  progressRecord?: ProgressRecord;
};
export default function Progress({ progressRecord, leetCodeNo }: Props) {
  const [isCreateRecord, setIsCreateRecord] = useState(true);
  // set initial value for status select box
  const defaultStatus = {
    value: "TO-DO",
    columnId: "a",
    label: "TO-DO",
  };

  if (progressRecord) {
    defaultStatus.columnId = progressRecord.columnId;
    defaultStatus.label = progressRecord.statusName;
    defaultStatus.value = progressRecord.statusName;
    setIsCreateRecord(false);
  }

  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const statusItems = useStatusStore((state) => state.items);

  //handle user select a new status
  const handleStatusChange = (newValue: any) => {
    setSelectedStatus(newValue);
    const data: ProgressRecord = {
      leetCodeNo,
      statusName: newValue.value,
      columnId: newValue.columnId,
      tags: "default",
    };
    if (isCreateRecord) {
      CreateRecord(data)
        .then((r) => {
          if (r.error) throw r.error;
        })
        .catch();
    }
  };
  return (
    <>
      <td className="px-6 py-4">
        <StatusSelect
          value={selectedStatus}
          onChange={handleStatusChange}
          statusItems={statusItems}
        />
      </td>
      <td className="px-6 py-4">
        <TagsBox />
      </td>
      <td className="px-6 py-4">Never</td>
    </>
  );
}
