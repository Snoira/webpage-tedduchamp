import type { Event } from "@/sanity/types";

export default function EventCard({ event }: { event: Event }) {
    const { date, venue, location, url } = event;
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const formattedTime = eventDate.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const date2 = formattedDate;
    const time = formattedTime;

    return (
        <a href={url ?? "#"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform">
            <div className="grid md:grid-flow-col items-center gap-2 md:gap-10 border-b border-foreground p-4 w-full">
                <p className="text-xl md:text-2xl font-merriweather font-light"> <strong className="font-bold">{venue}</strong>, {location}</p>
                <div className="flex flex-col md:flex-row gap-2 md:justify-end">
                    <p className="text-xl md:text-2xl font-merriweather">{date2}</p>
                    <p className="text-xl md:text-2xl font-merriweather">{time}</p>
                </div>
            </div>
        </a>
    );
}