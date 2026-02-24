import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Enabling draft mode");

  (await draftMode()).enable();

  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";

  return NextResponse.redirect(new URL(redirectUrl, req.url));
}