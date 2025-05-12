using DataAccessLayer.Enums;

namespace EventBookingSystem.API.Dtos.EventDto;

public class EventDto
{
    public Guid Id { get; set; }
    public string EventName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public EventCategory Category { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Venue { get; set; } = string.Empty;
    public bool IsBooked { get; set; } 
    public decimal Price { get; set; }
    public string Organizer { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public EventStatus EventStatus { get; set; } = EventStatus.Pending;
    public int TicketsBooked { get; set; } = 0;
}