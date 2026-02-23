import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, isPreview } from "@/env";
import type { Intro, Event, Section } from "@/sanity/types";

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

export const getIntro = async (): Promise<Intro[]> => {
  return client.fetch(
    `*[_type == "intro"]{
      imageLarge,
      imageMedium,
      imageSmall
    }`,
    {},
    { next: { tags: ["intro"] } }
  );
};

export const getEvents = async (): Promise<Event[]> => {
  return client.fetch(
    `*[_type == "events"] | order(date asc){
      date,
      location,
      venue,
      url
    }`,
    {},
    { next: { tags: ["events"] } }
  );
};

export const getSections = async (): Promise<Section[]> => {
  return client.fetch(
    `*[_type == "sections"]{
          title,
          heading,
          slug,
          textContent,
          images,
          _id
          }`,
    {},
    { next: { tags: ["sections"] } }
  );
};
