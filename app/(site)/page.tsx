import { getIntro, getEvents, getSections } from "@/lib/utils/sanityQueries";
import EventCard from "@/components/EventCard";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { smallTextStyle, headingStyle, sectionStyle } from "@/lib/styles";
import Hero from "@/components/Hero";


export default async function Home() {

  const intro = await getIntro();
  const events = await getEvents();
  const sections = await getSections();


  return (
    <main className="flex flex-col items-center justify-between pb-32">
      {intro.length > 0 && <Hero intro={intro[0] ?? {}} />}
      {sections.length > 0 && (
        sections.map((section) => (
          <Section key={section._id} content={section} />
        ))
      )}

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
        <ContactForm />
      </section>
    </main>
  );
}
