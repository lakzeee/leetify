import { UserRes } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getUserByEmail(): Promise<UserRes> {
  return await fetchWrapper.get(`/user`);
}

export async function createUser(data: any): Promise<any> {
  return await fetchWrapper.post(`/user`, data);
}
