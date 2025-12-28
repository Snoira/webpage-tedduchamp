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
