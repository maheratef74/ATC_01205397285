namespace DataAccessLayer.Repositories.Booking;
using DataAccessLayer.Entities;
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(Guid bookingId);
    Task<IEnumerable<Booking>> GetAllByUserAsync(string userId);
    Task<IEnumerable<Booking>> GetAllByEventAsync(Guid eventId, int pageNumber, int pageSize);
    Task<int> GetTotalCountByEventAsync(Guid eventId); 
    Task AddAsync(Booking booking);
    Task<bool> UpdateAsync(Booking booking);
    Task DeleteAsync(Guid bookingId);
    Task<bool> AlreadyBookedAsync(string userId, Guid eventId);
    Task<List<Guid>> GetBookedEventIdsByUserAsync(string userId);
    Task<List<Booking>> GetUpcomingBookedEventByUserAsync(string userId);
    Task<int> CountUpcomingEventBookingsAsync();
    Task<List<Booking>> GetUpcomingEventBookingsAsync(int page, int pageSize);
    Task<List<Booking>> GetCompletedBookedEventsByUserAsync(string userId);
    Task<List<Booking>> GetCancelledBookedEventsByUserAsync(string userId);
    Task SaveChangesAsync();
}