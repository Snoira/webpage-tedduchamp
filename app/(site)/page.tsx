import Image from "next/image";
import { getIntro, getEvents, getSections } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import EventCard from "@/components/EventCard";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { smallTextStyle, headingStyle, sectionStyle } from "@/lib/styles";

export default async function Home() {

  const intro = await getIntro();
  const { imageLarge, imageMedium, imageSmall } = intro[0] || {};
  const events = await getEvents();
  const sections = await getSections();

  return (
    <main className="flex flex-col items-center justify-between pb-32">
      <div className="flex flex-col items-center w-full relative">
        <p className="text-3xl md:text-[4vw] font-averia-serif-libre pt-20 md:pt-30">we are</p>
        <h1 className="text-[clamp(70px,29vw,200px)] leading-[clamp(70px,27vw,200px)] text-center md:text-[20vw] font-londrina-solid tracking-tight py-30">Ted Duchamp</h1>
        <div className="grid grid-rows-3 md:grid-rows-2 grid-cols-4 md:grid-cols-6 gap-y-4 md:gap-0 w-full items-center">
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
      </div>
      {
        sections.map((section) => (
          <Section key={section._id} content={section} />
        ))
      }

      <section id="live" className={`${sectionStyle} md:max-w-4xl`}>
        <h2 className={`${headingStyle}`}>Come see us play</h2>
        {events.length > 0 ? (
          <div className="border-t border-foreground w-full md:max-w-4xl">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          <p className={`${smallTextStyle}`}>No upcoming events.</p>
        )}
      </section>
      <section id="contact" className={`${sectionStyle} max-w-4xl`}>
        <h2 className={`${headingStyle}`}>Get in touch</h2>
        {/* <p className={`${smallTextStyle} text-center`}>
          For bookings, inquiries, or just to say hello, reach out to us at{" "}
          <a href="mailto:hello@tedduchamp.com">hello@tedduchamp.com</a>
        </p> */}
        <ContactForm />
      </section>
    </main>
  );
}
