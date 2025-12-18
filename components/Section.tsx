import type { Section } from "@/sanity/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Image as ImageType } from "@/sanity/types";
import { PortableTextBlock } from "sanity";
import {sectionStyle, smallTextStyle, largeTextStyle, headingStyle} from "@/app/(site)/page";

type TextProps = {
    textContent: PortableTextBlock[];
    textWithImage: boolean;
}

type ImagesProps = {
    images: ImageType[];
    textWithImage: boolean;
}

function Text({ textContent, textWithImage }: TextProps) {
    console.log()
    return (
        <div className={`${textWithImage ? smallTextStyle : largeTextStyle}`}>
            <PortableText value={textContent} />
        </div>
    );
}

function Images({ images, textWithImage }: ImagesProps) {
    const imageCount = images ? images.length : 0;
    console.log("Text has Images:", textWithImage);

    return (
        <div className={`w-full md:w-fit grid ${imageCount === 1 ? "grid-cols-1" : "md:grid-cols-2"} items-center gap-10 md:gap-8 ${textWithImage ? "md:min-w-3xs gap-2 " : "w-full md:max-w-4xl"}`}>
            {images && images.map((image, index) => (
                <div key={index} className="overflow-hidden">
                    <Image
                        src={urlFor(image).width(1000).height(1000).auto("format").url()}
                        alt={"Medium Intro Image"}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform"
                    />
                </div>
            ))}
        </div>
    );
}


export default async function Section({ content }: { content: Section }) {
    const { heading, textContent, images } = content;
    const textWithImage = (!!textContent && !!images && images.length > 0) || false;
     
    const textWImageStyle = "flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 md:max-w-6xl";

    return (
        <section className={sectionStyle}>
            {heading && (
                <h2 className={headingStyle}>{heading}</h2>
            )}
            <div className={`${textWithImage ? textWImageStyle : ""}`}>
                {images && images.length > 0 && <Images images={images} textWithImage={textWithImage} />}
                {textContent && <Text textContent={textContent} textWithImage={textWithImage} />}
            </div>

        </section>
    );
}
