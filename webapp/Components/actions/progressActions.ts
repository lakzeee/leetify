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

export async function getDayCounts() {
  return await fetchWrapper.get("/progress/daycount");
}
