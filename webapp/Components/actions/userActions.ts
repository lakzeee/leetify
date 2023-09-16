import { UserRes } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getUserByEmail(email: string): Promise<UserRes> {
  return await fetchWrapper.get(`/user/${email}`);
}

export async function createUser(data: any): Promise<any> {
  return await fetchWrapper.post(`/user`, data);
}
