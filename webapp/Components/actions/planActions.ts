import { fetchWrapper } from "@/Components/utils/fetchWrapper";
import { CreatePlanReq, PlanQuestionRes } from "@/types";

export async function CreateNewPlan(data: CreatePlanReq): Promise<any> {
  return await fetchWrapper.post(`/plan`, data);
}

export async function GetUserPlans(userId: string): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/user/${userId}`);
}

export async function GetAllPublicPlans(): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/public`);
}

export async function GetPublicPlanById(
  userId: string,
): Promise<PlanQuestionRes> {
  return await fetchWrapper.get(`/plan/public/${userId}`);
}

export async function GetPlanDetailById(
  planId: string,
): Promise<PlanQuestionRes> {
  return await fetchWrapper.get(`/plan/${planId}`);
}

export async function UpdatePlanDetailById(
  planId: string,
  data: CreatePlanReq,
): Promise<any> {
  return await fetchWrapper.put(`/plan/${planId}`, data);
}

export async function DeletePlanById(planId: string): Promise<any> {
  return await fetchWrapper.del(`/plan/${planId}`);
}

export async function GetSavedPlanRecordByUserId(userId: string) {
  return await fetchWrapper.get(`/plan/saved/${userId}`);
}

export async function SavePlanToUser(data: { userId: string; planId: string }) {
  return await fetchWrapper.post(`/plan/save`, data);
}

export async function RemovePlanFromUser(data: {
  userId: string;
  planId: string;
}) {
  return await fetchWrapper.post(`/plan/remove`, data);
}

export async function GetUserSavedPlans(
  userId: string,
): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/public/user/${userId}`);
}
