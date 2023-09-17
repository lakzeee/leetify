import { fetchWrapper } from "@/Components/utils/fetchWrapper";
import { CreatePlanReq, ErrorRes, PlanQuestionRes } from "@/types";

export async function CreateNewPlan(data: CreatePlanReq): Promise<any> {
  return await fetchWrapper.post(`/plan`, data);
}

export async function GetUserPlans(userId: string): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/user/${userId}`);
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
