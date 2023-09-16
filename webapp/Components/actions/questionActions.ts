import { PageResult, PlanQuestion, Question, UserRes } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getQuestionData(
  query: string,
): Promise<PageResult<Question>> {
  return await fetchWrapper.get(`/question${query}`);
}

export async function getAllTopics(): Promise<string[]> {
  return await fetchWrapper.get(`/question/topicList`);
}

export async function getQuestionsByQuestionNumbers(
  nums: string,
): Promise<PlanQuestion[]> {
  return await fetchWrapper.get(`/question/byqn?questionNumbers=${nums}`);
}
