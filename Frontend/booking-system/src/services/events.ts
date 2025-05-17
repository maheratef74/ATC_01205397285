import axios from "../lib/axios";

export enum EventStatus {
  Pending = 0,
  Started = 1,
  Completed = 2,
  Cancelled = 3,
}
export enum ECategory {
  "Conference",
  "Workshop",
  "Seminar",
  "Concert",
  "Exhibition",
  "Festival",
  "Sports",
  "Theater",
  "Meetup",
  "Webinar",
}

export interface Event {
  id: string;
  eventName: string;
  description: string;
  category: number;
  startDate: string;
  endDate: string;
  venue: string;
  isBooked: boolean;
  price: number;
  organizer: string;
  capacity: number;
  imageUrl: string;
  eventStatus: EventStatus;
  ticketsBooked: number;
}

export interface CreateEventDto {
  eventName: string;
  description: string;
  category: ECategory;
  startDate: string;
  endDate: string;
  venue: string;
  price: number;
  organizer: string;
  capacity: number;
  imageUrl: string;
}

export interface UpdateEventDto extends CreateEventDto {
  id: string;
}

export interface EventsResponse {
  data: {
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: Event[];
  };
}

export interface EventsQueryParams {
  pageNumber?: number;
  pageSize?: number;
  category?: string;
  status?: string;
}

export const eventsApi = {
  getEvents: async (params?: EventsQueryParams): Promise<EventsResponse> => {
    const response = await axios.get("/event", { params });
    return response.data;
  },

  // Get event by id
  getById: async (id: string): Promise<Event> => {
    const response = await axios.get(`/event/${id}`);
    return response.data;
  },

  // Create new event
  create: async (event: CreateEventDto): Promise<Event> => {
    const response = await axios.post(`/event`, event);
    return response.data;
  },

  // Update event
  update: async (event: UpdateEventDto): Promise<Event> => {
    const response = await axios.put(`event/${event.id}`, event);
    return response.data;
  },

  // Delete event
  delete: async (id: string): Promise<void> => {
    return await axios.delete(`/event/${id}`);
  },
};
