import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { revalidateSecret } from "@/env";

const urls = {
  development: "http://localhost:3000",
  preview: "https://dev--tedduschampband.netlify.app",
  production: "https://tedduchamp.com",
};

const allowedOrigins = [urls.development, urls.preview, urls.production];

function addCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, x-revalidate-secret, x-revalidate-tag"
  );

  return response;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== revalidateSecret) {
    const response = NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
    return addCorsHeaders(response, origin);
  }

  const tag = req.headers.get("x-revalidate-tag");
  if (!tag) {
    const response = NextResponse.json(
      { message: "Missing revalidation tag" },
      { status: 400 }
    );
    return addCorsHeaders(response, origin);
  }

  revalidateTag(tag);

  const response = NextResponse.json({ revalidated: true, tag });
  return addCorsHeaders(response, origin);
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, origin);
}
