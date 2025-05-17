import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router";

export interface EventCardProps {
    image: string;
    category: string;
    categoryColor?: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    tags?: string[];
    price: string;
    onBook?: () => void;
    idx?: number;
    id?: string;
}

const EventCard: React.FC<EventCardProps> = (props) => (
    <motion.div
        initial={{ opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
            type: "spring",
            stiffness: 100,
            damping: 18,
            delay: props.idx !== undefined ? props.idx * 0.08 : 0,
        }}
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto border border-zinc-100 dark:border-zinc-800 group"
        tabIndex={0}
        aria-label={`Event: ${props.title}`}
    >
        <div className="relative">
            <img
                src={props.image}
                alt={props.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${props.categoryColor}`}
            >
                {props.category}
            </span>
        </div>
        <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-1 text-zinc-900 dark:text-white">{props.title}</h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1 gap-2">
                <FaCalendarAlt className="inline mr-1" />
                <span>{props.date} • {props.time}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2 gap-2">
                <FaMapMarkerAlt className="inline mr-1" />
                <span>{props.location}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {props.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {props?.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 text-xs font-medium"
                    >
                        <FaTag className="mr-1" /> {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">{props.price}</span>

                <Link to={`/event/${props.id}`}>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow transition-colors"

                    >
                        Book Now
                    </motion.button>
                </Link>
            </div>
        </div>
    </motion.div>
);

export default EventCard;