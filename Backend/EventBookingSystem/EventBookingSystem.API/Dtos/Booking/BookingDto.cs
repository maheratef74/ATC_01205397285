using DataAccessLayer.Enums;

namespace EventBookingSystem.API.Models.Booking;

public class BookingDto
{
    public Guid Id { get; set; }
    public Guid EventId { get; set; }
    public string eventName { get; set; } = string.Empty;
    public string description { get; set;} = string.Empty;
    public EventCategory category { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public string venue { get; set; } = string.Empty;
    public decimal price { get; set; }
    public string imageUrl { get; set; } = string.Empty;
    public int ticketsBooked { get;set; }
    public string Organizer { get; set; } = string.Empty;
    public int Capacity { get; set; }
    
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public EventStatus EventStatus { get; set; }
    public BookingStatus BookingStatus { get; set; }
}