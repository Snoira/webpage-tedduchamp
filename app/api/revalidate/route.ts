import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/env";


type WebhookPayload = {
  _type: string;
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
    } else if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    revalidateTag(body._type);
    return NextResponse.json({ revalidated: true, body });
  } catch (error: Any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
}
