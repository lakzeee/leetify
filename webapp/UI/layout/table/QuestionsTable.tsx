import { Question, QuestionKey } from "@/types";
import QuestionRow from "@/UI/layout/table/QuestionRow";
import TableWrapper from "@/UI/layout/table/tablebase/TableWrapper";
import TableHeader from "@/UI/layout/table/tablebase/TableHeader";

type Props = {
  columTitles: string[];
  data: Question[];
};
export default function QuestionsTable({ columTitles, data }: Props) {
  return (
    <>
      <TableWrapper>
        <TableHeader columTitles={columTitles} />
        <tbody>
          {data.map((d, idx) => (
            <QuestionRow key={idx} question={d} />
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
}
