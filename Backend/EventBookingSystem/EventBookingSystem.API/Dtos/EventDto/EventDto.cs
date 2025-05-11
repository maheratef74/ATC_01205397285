using DataAccessLayer.Enums;

namespace EventBookingSystem.API.Dtos.EventDto;

public class EventDto
{
    public Guid Id { get; set; }
    public string EventName { get; set; }
    public string Description { get; set; }
    public EventCategory Category { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Venue { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }
    public bool IsBooked { get; set; } 
}