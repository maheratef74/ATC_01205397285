using DataAccessLayer.Entities;
using EventBookingSystem.API.Dtos.AuthDtos;
using EventBookingSystem.API.Models.Event;

namespace EventBookingSystem.API.Dtos.EventDto;

public static class EventExtensionMethold
{
    public static Event ToEvent(this EventRequest request)
    {
        return new Event()
        {
            Category = request.Category,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Description = request.Description,
            EventName = request.EventName,
            ImageUrl = request.ImageUrl,
            Price = request.Price,
            Venue = request.Venue,
            Capacity = request.Capacity,
            Organizer = request.Organizer
        };
    }
    
    public static List<EventDto> ToEventDtos(this IEnumerable<Event> events, List<Guid> bookedEventIds)
    {
        return events.Select(e => new EventDto
        {
            Id = e.Id,
            EventName = e.EventName,
            Description = e.Description,
            Category = e.Category,
            StartDate = e.StartDate,
            EndDate = e.EndDate,
            Venue = e.Venue,
            Price = e.Price,
            ImageUrl = e.ImageUrl,
            EventStatus = e.EventStatus,
            Capacity = e.Capacity,
            Organizer = e.Organizer,
            TicketsBooked = e.TicketsBooked,
            IsBooked = bookedEventIds?.Contains(e.Id) ?? false
        }).ToList();
    }
}