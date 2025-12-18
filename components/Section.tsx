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

function Text({ textContent, textWithImage }: TextProps) {

    return (
        <div className={`${textWithImage ? smallTextStyle : largeTextStyle}`}>
            <PortableText value={textContent} />
        </div>
    );
}

function Images({ images }: { images: ImageType[] }) {
    const imageCount = images ? images.length : 0;

    return (
        <div className={`grid ${imageCount === 1 ? "grid-cols-1" : "md:grid-cols-2"} items-center gap-4 md:min-w-3xs`}>
            {images && images.map((image, index) => (
                <div key={index} className="w-full overflow-hidden">
                    <Image
                        src={urlFor(image).width(800).height(800).auto("format").url()}
                        alt={"Medium Intro Image"}
                        width={800}
                        height={800}
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

    const textWImageStyle = "flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 py-8 px-4 md:max-w-6xl";


    return (
        <section className={`${sectionStyle}`}>
            {heading && (
                <h2 className={headingStyle}>{heading}</h2>
            )}
            <div className={`font-merriweather ${textWithImage ? textWImageStyle : ""}`}>
                {images && images.length > 0 && <Images images={images} />}
                {textContent && <Text textContent={textContent} textWithImage={textWithImage} />}
            </div>

        </section>
    );
}
