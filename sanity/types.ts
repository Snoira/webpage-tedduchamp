import { PortableTextBlock } from "sanity";

export type Event = {
    date: string;
    venue: string;
    location: string;
    url: string;
};
export type Intro = {
    text: string;
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
type Image = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
};
