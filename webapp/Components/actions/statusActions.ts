import { fetchWrapper } from "@/Components/utils/fetchWrapper";
import { DndItem } from "@/types";

export async function GetUserStatusItems(): Promise<any> {
  return await fetchWrapper.get(`/plan/status`);
}

export async function UpdateUserStatusItems(
  statusItems: DndItem[],
): Promise<boolean | any> {
  return await fetchWrapper.put(`/plan/status`, statusItems);
}
