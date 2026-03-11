import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

import { apiVersion, dataset, projectId, sanityReadToken } from "@/env";

type SafeFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  label: string;
};

const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
};

const publicClient = createClient({
  ...sanityConfig,
  perspective: "published",
});

const previewClient = createClient({
  ...sanityConfig,
  token: sanityReadToken,
  perspective: "drafts",
});

export async function getClient() {
  const { isEnabled } = await draftMode();

  return isEnabled ? previewClient : publicClient;
}

export async function safeFetch<T>({
  query,
  params = {},
  tags = [],
  label,
}: SafeFetchOptions): Promise<T> {
  const client = await getClient();

  try {
    return await client.fetch<T>(query, params, {
      next: {
        tags,
        revalidate: 3600
      },
    });
  } catch (error) {
    console.error({
      message: "Sanity query failed",
      label,
      query,
      params,
      tags,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : error,
    });

    return [] as T;
  }
}
