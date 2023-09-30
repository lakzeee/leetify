import { fetchWrapper } from "@/Components/utils/fetchWrapper";
import { ProgressRecord } from "@/types";

export async function GetRecordList(questionNumbers: string): Promise<any> {
  return await fetchWrapper.get(
    `/progress/record?questionNumbers=${questionNumbers}`,
  );
}

export async function CreateRecord(data: ProgressRecord): Promise<any> {
  return await fetchWrapper.post(`/progress/record`, data);
}

export async function UpdateRecord(
  id: string,
  data: ProgressRecord,
): Promise<any> {
  return await fetchWrapper.put(`/progress/record/${id}`, data);
}

export async function getDayCount() {
  return await fetchWrapper.get("/progress/stat/daycount");
}

export async function getDifficultiesCount() {
  return await fetchWrapper.get("/progress/stat/difficulties");
}

export async function getTopicsCount() {
  return await fetchWrapper.get("/progress/stat/topics");
}

export async function getRecentVisitQuestions() {
  return await fetchWrapper.get("/progress/stat/questions");
}
