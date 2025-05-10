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
            Venue = request.Venue
        };
    }
}