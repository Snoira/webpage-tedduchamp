import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const validTags = ["intro", "events", "sections"];

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log(JSON.stringify(payload, null, 2));

  const tag = payload.tag;
  if (!payload.tag) {
    return NextResponse.json(
      { message: "Missing revalidation tag" },
      { status: 400 }
    );
  }

  if (!validTags.includes(payload.tag)) {
    return NextResponse.json(
      { message: "Invalid revalidation tag" },
      { status: 400 }
    );
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tag });
}

