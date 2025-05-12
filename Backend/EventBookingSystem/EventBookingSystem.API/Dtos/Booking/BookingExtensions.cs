namespace EventBookingSystem.API.Models.Booking;
using DataAccessLayer.Entities;
public static class BookingExtensions
{
    public static BookingDto ToDBookingto(this Booking booking)
    {
        return new BookingDto
        {
            Id = booking.Id,
            EventId = booking.EventId,
            eventName = booking.Event.EventName,
            description = booking.Event.Description,
            category = booking.Event.Category,
            startDate = booking.Event.StartDate,
            endDate = booking.Event.EndDate,
            venue = booking.Event.Venue,
            price = booking.Event.Price,
            imageUrl = booking.Event.ImageUrl,
            ticketsBooked = booking.Event.TicketsBooked,
            Organizer = booking.Event.Organizer,
            Capacity = booking.Event.Capacity,
            
            UserId = booking.UserId,
            UserName = booking.User.FullName,
            BookingDate = booking.BookingDate,
            EventStatus = booking.Event.EventStatus,
            BookingStatus = booking.Status
        };
    }
}