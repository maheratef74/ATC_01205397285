using DataAccessLayer.Enums;
using DataAccessLayer.Filters;

namespace DataAccessLayer.Repositories.Booking;
using DataAccessLayer.Entities;
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(Guid bookingId);
    Task<List<Booking>> GetAllByUserAsync(string userId, BookingFilter? filter, int pageNumber, int pageSize);
    Task<int> CountAllByUserAsync(string userId, BookingFilter? filter);
    Task<IEnumerable<Booking>> GetAllByEventAsync(Guid eventId, int pageNumber, int pageSize);
    Task<int> GetTotalCountByEventAsync(Guid eventId); 
    Task AddAsync(Booking booking);
    Task<bool> UpdateAsync(Booking booking);
    Task DeleteAsync(Guid bookingId);
    Task<bool> AlreadyBookedAsync(string userId, Guid eventId);
    Task<List<Guid>> GetBookedEventIdsByUserAsync(string userId);
    Task<int> CountUpcomingEventBookingsAsync();
    Task<List<Booking>> GetUpcomingEventBookingsAsync(int page, int pageSize);
    Task SaveChangesAsync();
}