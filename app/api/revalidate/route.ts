import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/env";

type WebhookPayload = {
  tag: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret
    );

    if (!isValidSignature) {
      const message = "invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?.tag) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    revalidateTag(body.tag);
    return NextResponse.json({ revalidated: true, body });
  } catch (error: unknown) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(message, { status: 500 });
  }
}
