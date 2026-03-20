import { safeFetch } from "@/sanity/lib/client";
import type { Intro, Event, Section, SiteSettings } from "@/sanity/types";

export const getIntro = async (): Promise<Intro> => {
  return safeFetch({
    query: `*[_type == "intro"][0]{
      imageLarge,
      imageMedium,
      imageSmall
      }`,
    tags: ["intro"],
    label: "getIntro",
  });
};

export const getEvents = async (): Promise<Event[]> => {
  return safeFetch({
    query: `*[_type == "events"] | order(date asc){
      date,
      location,
      venue,
      url
    }`,
    tags: ["events"],
    label: "getEvents",
  });
};

export const getSections = async (): Promise<Section[]> => {
  return safeFetch({
    query: `*[_type == "sections"]{
          title,
          heading,
          slug,
          textContent,
          images,
          _id
          }`,
    tags: ["sections"],
    label: "getSections",
  });
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  return safeFetch({
    query: `*[_type == "siteSettings"][0]{
      title,
      description,
      seo,
    }`,
    tags: ["siteSettings"],
    label: "getSiteSettings",
  });
};
