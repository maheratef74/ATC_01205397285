using DataAccessLayer.Enums;

namespace DataAccessLayer.Entities;

public class Booking
{
    public Guid Id { get; set; } = new Guid();
        
    public Guid EventId { get; set; }
    public Event Event { get; set; } = null!;

    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public DateTime BookingDate { get; set; } = DateTime.UtcNow;
}