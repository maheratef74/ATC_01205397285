import { motion } from "framer-motion";
import { FaCheckCircle, FaEnvelope, FaTicketAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDownload, FaShare } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

function Booked() {
    const navigate = useNavigate();
    // In a real app, this would come from the booking API response
    const booking = {
        id: "BK123456",
        eventTitle: "Food & Wine Festival",
        date: "Aug 15, 2024",
        time: "3:00 PM",
        location: "Riverfront Park",
        ticketType: "VIP Pass",
        price: "$65.00",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12 my-20"
        >
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Success Message */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                        <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                    <p className="text-lg text-muted-foreground">
                        Thank you for your booking. We've sent the confirmation details to your email.
                    </p>
                </motion.div>

                {/* Ticket Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="overflow-hidden pt-0">
                        <div className="relative">
                            <img
                                src={booking.image}
                                alt={booking.eventTitle}
                                className="w-full h-50 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {booking.eventTitle}
                                </h2>
                                <div className="flex items-center gap-2 text-white/90">
                                    <FaTicketAlt />
                                    <span>Booking ID: {booking.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-xl text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium">{booking.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-xl text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time</p>
                                        <p className="font-medium">{booking.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-xl text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium truncate">{booking.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Ticket Type</p>
                                        <p className="font-medium">{booking.ticketType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Quantity</p>
                                        <p className="font-medium">{booking.quantity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total</p>
                                        <p className="font-medium">{booking.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button className="flex-1">
                                    <FaDownload className="mr-2" />
                                    Download Ticket
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <FaShare className="mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Email Confirmation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-muted/50 rounded-lg p-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                            <FaEnvelope className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
                            <p className="text-muted-foreground mb-4">
                                We've sent a confirmation email with your ticket details and QR code.
                                Please check your inbox and spam folder. You can also download your ticket
                                using the button above.
                            </p>
                            <Button variant="link" className="p-0 h-auto">
                                Didn't receive the email? Click here to resend
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center gap-4"
                >
                    <Button variant="outline" onClick={() => navigate("/bookings")}>
                        View All Bookings
                    </Button>
                    <Button onClick={() => navigate("/")}>
                        Return to Home
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Booked;