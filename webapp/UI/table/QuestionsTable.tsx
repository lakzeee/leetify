import { Question } from "@/types";
import QuestionRow from "@/UI/table/row/QuestionRow";
import TableWrapper from "@/UI/table/tablebase/TableWrapper";
import TableHeader from "@/UI/table/tablebase/TableHeader";

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
