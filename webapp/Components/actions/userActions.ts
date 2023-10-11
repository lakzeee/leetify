import { User, UserRes } from "@/types";
import { fetchWrapper } from "@/Components/utils/fetchWrapper";

export async function getUserByEmail(provider: string): Promise<UserRes> {
  return await fetchWrapper.get(`/user/login/${provider}`);
}

export async function getUserPublicInfo(userSub: string): Promise<User> {
  return await fetchWrapper.get(`/user/public/${userSub}`);
}

export async function getUserByUserSub(): Promise<User | any> {
  return await fetchWrapper.get(`/user`);
}

export async function createUser(data: any): Promise<any> {
  return await fetchWrapper.post(`/user`, data);
}

export async function updateUserProfileName(
  id: string,
  profileName: string,
): Promise<UserRes> {
  return await fetchWrapper.put(`/user`, { id, profileName });
}

export async function GetUsersCount(): Promise<number> {
  return await fetchWrapper.get(`/user/count`);
}
