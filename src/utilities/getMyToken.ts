"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookieStore = cookies();

  const rawToken =
    (await cookieStore).get("next-auth.session-token")?.value ||
    (await cookieStore).get("__Secure-next-auth.session-token")?.value;

  if (!rawToken) return null;

  const token = await decode({
    token: rawToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token as string;
}
