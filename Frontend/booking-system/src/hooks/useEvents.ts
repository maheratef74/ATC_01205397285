import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsApi, type EventsQueryParams } from "@/services/events";
import { toast } from "sonner";

export function useEvents(params: EventsQueryParams = {}) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => eventsApi.getEvents(params),
  });
}

export const useEventsOld = (params?: EventsQueryParams) => {
  const queryClient = useQueryClient();

  // Get all events with pagination and filters
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", params],
    queryFn: () => eventsApi.getEvents(params),
  });

  console.log(data);

  // Create event mutation
  const createEvent = useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create event");
      console.error("Error creating event:", error);
    },
  });

  // Update event mutation
  const updateEvent = useMutation({
    mutationFn: eventsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update event");
      console.error("Error updating event:", error);
    },
  });

  // Delete event mutation
  const deleteEvent = useMutation({
    mutationFn: (id: string) => Promise.resolve(eventsApi.delete(id)),
    onSuccess: () => {
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete event");
      console.error("Error deleting event:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Get event by id
  const useEvent = (id: string) => {
    return useQuery({
      queryKey: ["events", id],
      queryFn: () => eventsApi.getById(id),
      enabled: !!id,
    });
  };

  return {
    events: data?.data.items ?? [],
    totalCount: data?.data.totalItems ?? 0,
    pageNumber: data?.data.page ?? 1,
    pageSize: data?.data.pageSize ?? 10,
    totalPages: data?.data.totalPages ?? 1,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    useEvent,
  };
};
