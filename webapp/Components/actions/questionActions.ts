import { PageResult, Question } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getQuestionData(
  query: string,
): Promise<PageResult<Question>> {
  return await fetchWrapper.get(`api/question${query}`);
}
