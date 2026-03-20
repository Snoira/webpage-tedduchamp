import { PortableTextBlock } from "sanity";

export type Event = {
  date: string;
  venue: string;
  location: string;
  url: string;
};
export type Intro = {
  imageLarge: Image;
  imageMedium: Image;
  imageSmall: Image;
};
export type Section = {
  title: string;
  heading?: string;
  slug: string;
  textContent?: PortableTextBlock[];
  images?: Image[];
  _id: string;
};

export type Image = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

type SeoSettings = {
  title?: "string";
  description?: "string";
  ogTitle?: "string";
  ogDescription?: "string";
  ogImage?: Image;
};

export type SiteSettings = {
  title?: "string";
  description?: "string";
  seo?: SeoSettings;
};
