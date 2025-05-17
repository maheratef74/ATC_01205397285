import React from "react";
import { AnimatePresence } from "framer-motion";
import EventCard, { type EventCardProps } from "./EventCard";

interface EventCardListProps {
    events: EventCardProps[];
}

const EventCardList: React.FC<EventCardListProps> = ({ events }) => (
    <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
            Get Your Ticket – Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {events.map((event, index) => (
                    <EventCard key={event.title + event.date} {...event} idx={index} />
                ))}
            </AnimatePresence>
        </div>
    </section>
);

export default EventCardList;