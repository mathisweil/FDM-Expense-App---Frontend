"use server";

import { createClaim } from "@/lib/claimsAPI";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/utils/encryption";
import { NextRequest, NextResponse } from "next/server";

export async function sendClaim(formData: FormData) {
  if (!formData.get("acknowledgement")) {
    return { message: "Please acknowledge the claim" };
  } else {
    createClaim(formData);
  }
  return { message: `Added` };
}

export async function login(formData: FormData) {
  // verify credentials && get user
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // create session
  const expires = new Date(Date.now() + 60 * 10000); // 10 minutes
  const session = await encrypt({ user, expires });

  // store session
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // clear session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // refresh session
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 10000); // 10 minutes
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return NextResponse.next();
}
