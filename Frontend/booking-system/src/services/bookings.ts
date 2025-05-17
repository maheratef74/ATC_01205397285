import axios from "@/lib/axios";

export interface UpcomingTicket {
    id: number;
    eventName: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    venue: string;
    price: number;
    organizer: string;
    capacity: number;
    imageUrl: string;
}

export interface UpcomingTicketsResponse {
    items: UpcomingTicket[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface CreateBookingDto {
    eventId: string;
}

export interface Booking {
    id: string;
    eventId: string;
    userId: string;
    bookingDate: string;
    status: number;
}

export const bookingsApi = {
    getUpcomingTickets: async (page: number = 1, pageSize: number = 10): Promise<UpcomingTicketsResponse> => {
        const response = await axios.get(`/bookings/upcoming?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },
    create: async (eventId: string): Promise<Booking> => {
        const response = await axios.post(`/bookings?eventId=${eventId}`);
        console.log(response.data);
        return response.data;
    },
}; 