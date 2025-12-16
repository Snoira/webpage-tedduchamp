import Image from "next/image";
import { getIntro } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";


export default async function Home() {

  const intro = await getIntro();
  const { imageLarge, imageMedium, imageSmall, text } = intro[0] || {};

  console.log(intro);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32">
        <div className="flex flex-col items-center md:gap-32 w-full">
          <p className="text-3xl md:text-[4vw] font-averia-serif-libre">we are</p>
          <h1 className="text-8xl text-center sm:text-[18vw] px-4 py-32 md:py-0 font-londrina-solid">Ted Duchamp</h1>
          <div className="grid grid-rows-3 md:grid-rows-2 grid-cols-4 md:grid-cols-6 gap-y-4 md:gap-0 auto-rows-max w-full items-center">
            {
              imageLarge ? (
                <div className="md:col-start-3 col-span-4">
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
                <div className="col-start-1 row-start-1 md:row-start-2 col-span-2">
                  <Image
                    src={urlFor(imageMedium).width(800).height(800).auto("format").url()}
                    alt={"Medium Intro Image"}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : <div className="col-start-1 row-start-1 md:row-start-2 col-span-2 aspect-square bg-yellow-500"></div>
            }
            {
              imageSmall ? (
                <div className="col-start-4 md:col-start-5 col-span-1 row-start-3 md:row-start-2 md:self-end">
                  <Image
                    src={urlFor(imageSmall).width(400).height(400).auto("format").url()}
                    alt={"Small Intro Image"}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : <div className="col-start-4 md:col-start-5 col-span-1 row-start-3 md:row-start-2 aspect-square bg-green-500"></div>
            }

            {/* <div className="md:col-start-3 col-span-4 aspect-7/4 bg-red-500"></div> */}
            {/* <div className=" col-start-1 row-start-2 col-span-2 aspect-square bg-blue-500"></div> */}
            {/* <div className="col-start-4 md:col-start-5 col-span-1 row-start-2 aspect-square self-end bg-green-500"></div> */}
          </div>

          <p className="text-[clamp(24px,5vw,40px)] md:text-5xl p-4 md:max-w-4xl font-merriweather">
            {text ?? "Loading intro text..."}
          </p>

        </div>
        <section className="w-full flex flex-col items-center gap-12 py-16 px-4">
          <h2 className="text-5xl md:text-8xl text-center font-londrina-solid font-light ">Come see us play</h2>
        </section>
      </main>
    </div>
  );
}
