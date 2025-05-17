import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// This would typically come from an API
const bookings = [
    {
        id: "1",
        eventTitle: "Food & Wine Festival",
        date: "Aug 15, 2024",
        time: "3:00 PM",
        location: "Riverfront Park",
        status: "upcoming",
        ticketType: "VIP Pass",
        price: "$65.00",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    },
    {
        id: "2",
        eventTitle: "Summer Music Festival",
        date: "Jul 20, 2024",
        time: "7:00 PM",
        location: "Central Stadium",
        status: "completed",
        ticketType: "General Admission",
        price: "$45.00",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    },
    {
        id: "3",
        eventTitle: "Tech Conference 2024",
        date: "Sep 10, 2024",
        time: "9:00 AM",
        location: "Convention Center",
        status: "cancelled",
        ticketType: "Early Bird",
        price: "$120.00",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    },
];

const statusConfig = {
    upcoming: {
        icon: FaSpinner,
        label: "Upcoming",
        color: "bg-blue-500",
    },
    completed: {
        icon: FaCheckCircle,
        label: "Completed",
        color: "bg-green-500",
    },
    cancelled: {
        icon: FaTimesCircle,
        label: "Cancelled",
        color: "bg-red-500",
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function Bookings() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8 my-20"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                <p className="text-muted-foreground">Manage and view your event bookings</p>
            </motion.div>

            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <BookingCard booking={booking} />
                        </motion.div>
                    ))}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                    {bookings
                        .filter((booking) => booking.status === "upcoming")
                        .map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <BookingCard booking={booking} />
                            </motion.div>
                        ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    {bookings
                        .filter((booking) => booking.status === "completed")
                        .map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <BookingCard booking={booking} />
                            </motion.div>
                        ))}
                </TabsContent>

                <TabsContent value="cancelled" className="space-y-4">
                    {bookings
                        .filter((booking) => booking.status === "cancelled")
                        .map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <BookingCard booking={booking} />
                            </motion.div>
                        ))}
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}

function BookingCard({ booking }: { booking: typeof bookings[0] }) {
    const status = statusConfig[booking.status as keyof typeof statusConfig];
    const StatusIcon = status.icon;

    return (
        <Card className="overflow-hidden relative transition-all duration-300 hover:shadow-lg group">
            <div className="absolute inset-0">
                <img
                    src={booking.image}
                    alt={booking.eventTitle}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
            </div>

            <div className="relative p-8 flex flex-col justify-between min-h-[320px]">
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <Badge
                            className={cn(
                                "text-base px-4 py-1.5 transition-all duration-300",
                                status.color
                            )}
                        >
                            <StatusIcon className="mr-2 text-lg" />
                            {status.label}
                        </Badge>
                        <div className="flex items-center gap-3 text-white/90 text-base">
                            <FaTicketAlt className="text-xl" />
                            <span>{booking.ticketType}</span>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-6">
                        {booking.eventTitle}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center gap-3 text-white/90 text-lg">
                            <FaCalendarAlt className="text-xl" />
                            <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90 text-lg">
                            <FaClock className="text-xl" />
                            <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90 text-lg">
                            <FaMapMarkerAlt className="text-xl" />
                            <span className="truncate">{booking.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <span className="text-2xl font-bold text-white">{booking.price}</span>
                    <div className="flex flex-wrap gap-3">
                        {booking.status === "upcoming" && (
                            <>
                                <Button
                                    variant="outline"
                                    className="text-lg px-6 py-2.5 transition-all duration-300 hover:scale-105 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="text-lg px-6 py-2.5 transition-all duration-300 hover:scale-105"
                                >
                                    Cancel Booking
                                </Button>
                            </>
                        )}
                        {booking.status === "completed" && (
                            <Button
                                variant="outline"
                                className="text-lg px-6 py-2.5 transition-all duration-300 hover:scale-105 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
                            >
                                View Details
                            </Button>
                        )}
                        {booking.status === "cancelled" && (
                            <Button
                                variant="outline"
                                className="text-lg px-6 py-2.5 transition-all duration-300 hover:scale-105 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
                            >
                                Book Again
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Bookings;