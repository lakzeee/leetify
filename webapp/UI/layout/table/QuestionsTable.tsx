import { Question, QuestionKey } from "@/types";
import QuestionRow from "@/UI/layout/table/QuestionRow";

type Props = {
  columTitles: string[];
  data: Question[];
};
export default function QuestionsTable({ columTitles, data }: Props) {
  return (
    <>
      <div className="overflow-x-auto shadow-md dark:shadow-none rounded-lg">
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columTitles.map((title) => (
                <th key={title} scope="col" className="px-6 py-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => (
              <QuestionRow key={idx} question={d} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
