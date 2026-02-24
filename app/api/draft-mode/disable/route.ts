import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { siteUrl } from "@/env";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL(`${siteUrl}/`));
}