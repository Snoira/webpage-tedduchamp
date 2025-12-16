import Image from "next/image";
import { getIntro, getEvents } from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import EventCard from "@/components/EventCard";


export default async function Home() {

  const intro = await getIntro();
  const { imageLarge, imageMedium, imageSmall, text } = intro[0] || {};
  const events = await getEvents();

  return (
    <main className="flex flex-col items-center justify-between py-32">
      <div className="flex flex-col items-center md:gap-32 w-full">
        <p className="text-3xl md:text-[4vw] font-averia-serif-libre">we are</p>
        <h1 className="text-[clamp(80px,25vw,100px)]/24 text-center sm:text-[18vw] py-32 md:py-0 font-londrina-solid">Ted Duchamp</h1>
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
            ) : <div className="col-start-1 col-span-2 aspect-square bg-yellow-500"></div>
          }
          {
            imageSmall ? (
              <div className="col-start-4 md:col-start-5 col-span-1 md:self-end">
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
        <section id="about">
          <p className="text-[clamp(24px,5vw,40px)] md:text-5xl p-4 md:max-w-4xl font-merriweather">
            {text ?? "Loading intro text..."}
          </p>
        </section>
      </div>
      <section id="live" className="w-full flex flex-col items-center gap-12 py-16 px-4">
        <h2 className="text-5xl md:text-8xl text-center font-londrina-solid font-light">Come see us play</h2>
        {events.length > 0 ? (
          <div className="border-t border-foreground">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-lg font-merriweather">No upcoming events.</p>
        )}
      </section>
      <section id="contact" className="w-full flex flex-col items-center gap-8 py-16 px-4">
        <h2 className="text-5xl md:text-8xl text-center font-londrina-solid font-light">Get in touch</h2>
        <p className="text-xl md:text-3xl font-merriweather text-center max-w-2xl">
          For bookings, inquiries, or just to say hello, reach out to us at{" "}
          <a href="mailto:hello@tedduchamp.com">hello@tedduchamp.com</a>
        </p>
      </section>
    </main>
  );
}
