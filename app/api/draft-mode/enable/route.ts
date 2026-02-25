import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { siteUrl } from "@/env";

export async function GET(req: NextRequest) {
  (await draftMode()).enable();

  const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";

  return NextResponse.redirect(new URL(redirectUrl, siteUrl));
}
