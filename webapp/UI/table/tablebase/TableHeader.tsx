import { generateRandomKey } from "@/Components/utils/helpers";
import StatusEditButton from "@/UI/table/StatusEditButton";

type Props = {
  columTitles: string[];
};
export default function TableHeader({ columTitles }: Props) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columTitles.map((title) => (
          <th
            key={`${columTitles}_${generateRandomKey()}`}
            scope="col"
            className="px-6 py-3"
          >
            <div className="flex flex-row gap-1 items-center">
              {title}
              {title === "Status" && <StatusEditButton />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
