import { NextRequest } from "next/server";
import { updateSession } from "@/app/actions";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
  source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
