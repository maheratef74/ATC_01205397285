import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "@/services/bookings";

export function useUpcomingTickets(page: number = 1, pageSize: number = 10) {
    return useQuery({
        queryKey: ["upcomingTickets", page, pageSize],
        queryFn: () => bookingsApi.getUpcomingTickets(page, pageSize),
    });
} 