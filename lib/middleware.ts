// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function checkUserRole(request: NextRequest, _next: NextFetchEvent) {
  const token = await getToken({ req: request });
  console.log("tokem", token)
  if (!token) {
    return null; // No token, user is not authenticated
  }

  if (token.role !== "admin") {
    return "user"; // User is authenticated but not an admin
  }

  return "admin"; // User is authenticated and has admin role
}