import { useEffect, useState } from "react";
import { useQuestionsSearchParamsStore } from "@/Components/hooks/useQuestionsSearchParamsStore";
import { useQuestionsStore } from "@/Components/hooks/useQuestionsStore";
import { getQuestionData } from "@/Components/actions/questionActions";
import qs from "query-string";
import QuestionsTable from "@/UI/layout/table/QuestionsTable";
import { Pagination } from "flowbite-react";
import Filters from "@/app/questions/Filters";

export default function QuestionsList() {
  const [loading, setLoading] = useState(true);
  const params = useQuestionsSearchParamsStore((state) => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    filterBy: state.filterBy,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    difficulty: state.difficulty,
  }));
  const data = useQuestionsStore((state) => ({
    questions: state.questions,
    totalCount: state.totalCount,
    pageCount: state.pageCount,
  }));

  const queryUrl = qs.stringifyUrl({ url: "", query: params });
  const setParams = useQuestionsSearchParamsStore((state) => state.setParams);
  const setData = useQuestionsStore((state) => state.setData);

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  const columTitles = ["No", "title", "topics", "difficulty", "slug"];
  useEffect(() => {
    getQuestionData(queryUrl).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [queryUrl, setData]);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      <Filters />
      <QuestionsTable data={data.questions} columTitles={columTitles} />
      <Pagination
        currentPage={params.pageNumber}
        totalPages={data.pageCount}
        onPageChange={setPageNumber}
        showIcons
        nextLabel=""
        previousLabel=""
      />
    </>
  );
}
