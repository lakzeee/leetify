import { generateRandomKey } from "@/Components/utils/helpers";

type Props = {
  columTitles: string[];
};
export default function TableHeader({ columTitles }: Props) {
  return (
    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columTitles.map((title) => (
          <th
            key={`${columTitles}_${generateRandomKey()}`}
            scope="col"
            className="px-6 py-3"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
