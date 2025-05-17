import { clsx } from "clsx";
import { useTheme } from "../theme-provider";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import type { Event } from "@/services/events";


interface EventListProps {
    title?: string;
    pageSize?: number;
    showPagination?: boolean;
    onEventClick?: (event: Event) => void;
}

export default function EventList({
    title = "Events",
    pageSize = 6,
    showPagination = true,
    onEventClick
}: EventListProps) {
    const { theme } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const currentPage = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || undefined;

    const { data, isLoading } = useEvents({
        pageNumber: currentPage,
        pageSize,
        category,
        status
    });

    const handlePageChange = (page: number) => {
        setSearchParams(prev => {
            prev.set("page", page.toString());
            return prev;
        });
    };

    const handleImageError = (eventId: string) => {
        setImageErrors(prev => ({ ...prev, [eventId]: true }));
    };

    const handleEventClick = (event: Event) => {
        if (onEventClick) {
            onEventClick(event);
        } else {
            navigate(`/event/${event.id}`, { state: { event } });
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(pageSize)].map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border bg-card">
                            <Skeleton className="w-full h-48" />
                            <div className="p-4 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data?.data.items.length) {
        return (
            <div className="container mx-auto px-4 py-8">
                {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No events found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or check back later for new events.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.items.map((event) => (
                    <div
                        key={event.id}
                        className={clsx(
                            "group relative rounded-lg overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg",
                            theme === "dark" ? "hover:border-primary/50" : "hover:border-primary"
                        )}
                    >
                        <div className="relative h-48 overflow-hidden">
                            {!imageErrors[event.id] ? (
                                <img
                                    src={`https://ayadtytest.runasp.net/api/upload/${event.imageUrl}`}
                                    alt={event.eventName}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={() => handleImageError(event.id)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <span className="text-muted-foreground">Image not available</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold text-white mb-1">{event.eventName}</h3>
                                <p className="text-sm text-white/80">
                                    {format(new Date(event.startDate), "MMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {event.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    ${event.price.toFixed(2)}
                                </span>
                                <Button
                                    onClick={() => handleEventClick(event)}
                                    className="transition-all duration-200 hover:scale-105"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showPagination && data.data.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === data.data.totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
} 