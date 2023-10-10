import { fetchWrapper } from "@/Components/utils/fetchWrapper";
import { CreatePlanReq, PageResult, PlanQuestionRes } from "@/types";

// CRUD of Plan
export async function CreateNewPlan(data: CreatePlanReq): Promise<any> {
  return await fetchWrapper.post(`/plan`, data);
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

// Get users created plans
export async function GetUserPlans(): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/user`);
}

// Public Plan Routes
export async function GetAllPublicPlans(
  query: string,
): Promise<PageResult<PlanQuestionRes>> {
  return await fetchWrapper.get(`/plan/public${query}`);
}

export async function GetPublicPlanById(
  planId: string,
): Promise<PlanQuestionRes> {
  return await fetchWrapper.get(`/plan/public/${planId}`);
}

export async function GetPlanAndProgressDetailById(
  planId: string,
): Promise<PlanQuestionRes> {
  return await fetchWrapper.get(`/plan/progress/${planId}`);
}

// User Saved Plan Routes
export async function GetUserSavedPlans(): Promise<PlanQuestionRes[]> {
  return await fetchWrapper.get(`/plan/saved/full`);
}

export async function GetSavedPlanRecordByUserId() {
  return await fetchWrapper.get(`/plan/saved/list`);
}

export async function SavePlanToUser(planId: string) {
  return await fetchWrapper.put(`/plan/saved/${planId}`, {});
}

export async function RemovePlanFromUser(planId: string) {
  return await fetchWrapper.del(`/plan/saved/${planId}`);
}

export async function GetUserCreatedPlanCount() {
  return await fetchWrapper.get(`/plan/count`);
}
