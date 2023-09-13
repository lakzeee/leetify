import PlanQuestionRow from "@/UI/layout/table/PlanQuestionRow";
import { PlanQuestion } from "@/types";

type Props = {
  data: PlanQuestion[];
};
export default function AddedQuestionTable({ data }: Props) {
  const columTitles = ["no", "title", "topics", "difficulty"];

  return (
    <>
      <div className="overflow-x-auto shadow-md dark:shadow-none rounded-lg">
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columTitles.map((title) => (
                <th key={title} scope="col" className="px-3 py-4">
                  {title}
                </th>
              ))}
              <th className="text-center min-w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, idx) => (
                <PlanQuestionRow key={d.title} question={d} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
