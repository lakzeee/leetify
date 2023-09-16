import { PlanQuestion, Question, QuestionKey } from "@/types";
import PlanQuestionRow from "@/UI/table/PlanQuestionRow";

type Props = {
  columTitles: string[];
  data: PlanQuestion[];
};
export default function PlanQuestionsTable({ columTitles, data }: Props) {
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
            {data.map((d, idx) => (
              <PlanQuestionRow key={d.title} question={d} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
