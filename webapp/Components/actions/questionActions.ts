import { PageResult, PlanQuestion, Question } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getQuestionData(
  query: string,
): Promise<PageResult<Question>> {
  return await fetchWrapper.get(`api/question${query}`);
}

export async function getAllTopics(): Promise<string[]> {
  return await fetchWrapper.get(`api/question/topicList`);
}

export async function getQuestionsByQuestionNumbers(
  nums: string,
): Promise<PlanQuestion[]> {
  return await fetchWrapper.get(`api/question/byqn?questionNumbers=${nums}`);
}
