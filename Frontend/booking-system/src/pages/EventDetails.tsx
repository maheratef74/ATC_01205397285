import { useLocation, useNavigate } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaTicketAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import type { Event } from "@/services/events";
import { EventStatus } from "@/services/events";
import clsx from "clsx";
import { bookingsApi } from "@/services/bookings";
import { toast } from "sonner";

const categoryLabels: Record<number, string> = {
    1: "Conference",
    2: "Workshop",
    3: "Seminar",
    4: "Concert",
    5: "Festival",
    6: "Sports",
    7: "Theater",
    8: "Exhibition",
    9: "Meetup",
    10: "Webinar"
};

export default function EventDetails() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event as Event;

    if (!event) {
        return (
            <div className="min-h-screen w-screen pt-[72px] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
                    <Button onClick={() => navigate('/events')}>Back to Events</Button>
                </div>
            </div>
        );
    }

    const handleBookNow = () => {
        setIsBookingOpen(true);
    };

    const handleConfirmBooking = async () => {
        try {
            setIsBooking(true);
            await bookingsApi.create(event.id);
            toast.success('Event booked successfully!');
            setIsBookingOpen(false);
            navigate('/booked');
        } catch (error: any) {
            console.error('Error booking event:', error);
            if (error.response?.status === 401) {
                toast.error('Please log in to book this event');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.message || 'Failed to book event. Please try again.');
            }
        } finally {
            setIsBooking(false);
        }
    };

    const getBookingButtonState = () => {
        const now = new Date();
        const eventDate = new Date(event.startDate);

        if (event.isBooked) {
            return {
                text: 'Already Booked ✓',
                disabled: true,
                className: 'bg-green-500 hover:bg-green-600 text-white',
                message: 'You have already booked this event.'
            };
        }

        if (eventDate < now) {
            return {
                text: 'Event Passed',
                disabled: true,
                className: 'bg-gray-500 hover:bg-gray-600 text-white',
                message: 'This event has already passed and cannot be booked.'
            };
        }

        if (event.eventStatus === EventStatus.Started || event.eventStatus === EventStatus.Completed) {
            return {
                text: 'Event Started',
                disabled: true,
                className: 'bg-gray-500 hover:bg-gray-600 text-white',
                message: 'This event has already started and cannot be booked.'
            };
        }

        if (event.eventStatus === EventStatus.Cancelled) {
            return {
                text: 'Event Cancelled',
                disabled: true,
                className: 'bg-red-500 hover:bg-red-600 text-white',
                message: 'This event has been cancelled.'
            };
        }

        return {
            text: 'Book Now',
            disabled: false,
            className: 'bg-primary hover:bg-primary/90 text-white',
            message: 'Secure your spot now! Limited tickets available.'
        };
    };

    const bookingState = getBookingButtonState();

    return (
        <div className="min-h-screen w-screen pt-[72px]">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                {!imageError ? (
                    <img
                        src={`https://ayadtytest.runasp.net/api/upload/${event.imageUrl}`}
                        alt={event.eventName}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                        <div className="text-center">
                            <FaExclamationTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <span className="text-muted-foreground text-lg">Image not available</span>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-blue-500">
                            {categoryLabels[event.category] || 'Other'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.eventName}</h1>
                        <div className="flex items-center justify-center gap-4 text-lg">
                            <span className="flex items-center">
                                <FaCalendarAlt className="mr-2" />
                                {new Date(event.startDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                                <FaClock className="mr-2" />
                                {new Date(event.startDate).toLocaleTimeString()}
                            </span>
                            <span className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                {event.venue}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Organizer</p>
                                        <p className="font-medium">{event.organizer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium">
                                            {new Date(event.endDate).getTime() - new Date(event.startDate).getTime() > 0
                                                ? `${Math.round((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60))} hours`
                                                : 'TBD'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Capacity</p>
                                        <p className="font-medium">{event.capacity} attendees</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaTicketAlt className="text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Tickets Booked</p>
                                        <p className="font-medium">{event.ticketsBooked} / {event.capacity}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">${event.price.toFixed(2)}</h3>
                                    <p className="text-sm text-muted-foreground">{bookingState.message}</p>
                                </div>

                                <Button
                                    className={clsx("w-full", bookingState.className)}
                                    disabled={bookingState.disabled}
                                    onClick={handleBookNow}
                                >
                                    {bookingState.text}
                                </Button>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaCheck className="text-green-500" />
                                        <span>Secure booking</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaCheck className="text-green-500" />
                                        <span>Instant confirmation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaCheck className="text-green-500" />
                                        <span>Free cancellation</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Dialog */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to book this event? This will reserve your spot and you'll receive a confirmation email.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmBooking}
                            disabled={isBooking}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {isBooking ? 'Booking...' : 'Confirm Booking'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}