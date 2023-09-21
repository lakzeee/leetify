"use server";
import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}

const secret = process.env.NEXTAUTH_SECRET;

export async function getTokenWorkAround(raw: boolean) {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  } as NextApiRequest;
  return await getToken({ req, secret, raw: true });
}