import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Intro } from "@/sanity/types";

export default function Hero({ intro }: { intro: Intro }) {
    const { imageLarge, imageMedium, imageSmall } = intro;

    return (
            <div className="flex flex-col items-center w-full relative">
                <p className="text-3xl md:text-[4vw] font-averia-serif-libre pt-20 md:pt-30 z-10">we are</p>
                <h1 className="text-[clamp(70px,29vw,200px)] leading-[clamp(70px,27vw,200px)] text-center md:text-[20vw] font-londrina-solid tracking-tight py-30 z-30 sticky top-50 md:top-60">Ted Duchamp</h1>
                <div className="image-container grid grid-rows-3 md:grid-rows-2 grid-cols-4 md:grid-cols-6 gap-y-4 md:gap-0 w-full items-center pb-50 md:pb-70">
                    {
                        imageLarge ? (
                            <div className="md:col-start-3 col-span-4 z-40">
                                <Image
                                    src={urlFor(imageLarge).width(1400).height(800).auto("format").url()}
                                    alt={"Large Intro Image"}
                                    width={1400}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ) : <div className="md:col-start-3 col-span-4 aspect-7/4 bg-red-500"></div>
                    }
                    {
                        imageMedium ? (
                            <div className="col-start-1 row-start-1 md:row-start-2 col-span-2 z-20">
                                <Image
                                    src={urlFor(imageMedium).width(800).height(800).auto("format").url()}
                                    alt={"Medium Intro Image"}
                                    width={800}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ) : <div className="col-start-1 col-span-2 aspect-square bg-yellow-500"></div>
                    }
                    {
                        imageSmall ? (
                            <div className="col-start-4 md:col-start-5 col-span-1 md:self-end z-30">
                                <Image
                                    src={urlFor(imageSmall).width(400).height(400).auto("format").url()}
                                    alt={"Small Intro Image"}
                                    width={400}
                                    height={400}
                                    className="w-full h-auto object-cover transform-[translateX(-15%)] md:transform-none"
                                />
                            </div>
                        ) : <div className="col-start-4 md:col-start-5 col-span-1 row-start-3 md:row-start-2 aspect-square bg-green-500"></div>
                    }
                </div>
            </div>
    )
}