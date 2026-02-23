import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, isPreview } from "@/env";

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
  token: process.env.SANITY_READ_TOKEN,
  perspective: "drafts",
});

export const client = isPreview ? previewClient : publicClient;

export async function safeFetch<T>({
  query,
  params = {},
  tags = [],
  label,
}: SafeFetchOptions): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        tags,
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
