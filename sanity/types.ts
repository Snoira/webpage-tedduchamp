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

type Image = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
};

