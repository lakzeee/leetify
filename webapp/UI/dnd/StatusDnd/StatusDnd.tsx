import StatusGroupContainer from "@/UI/dnd/StatusDnd/StatusGroupContainer";
import { DndItem } from "@/types";

type Props = {
  items: DndItem[];
};
export default function StatusDnd({ items }: Props) {
  const groupsData = [
    { id: "a", title: "TO-DO" },
    { id: "b", title: "In Progress" },
    { id: "c", title: "Complete" },
  ];
  
  return (
    <>
      {groupsData.map((group) => (
        <StatusGroupContainer
          key={group.id}
          column={group}
          items={items.filter((item) => item.columnId === group.id)}
        />
      ))}
    </>
  );
}
