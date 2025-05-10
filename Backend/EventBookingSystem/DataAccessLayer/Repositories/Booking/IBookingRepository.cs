namespace DataAccessLayer.Repositories.Booking;
using DataAccessLayer.Entities;
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(Guid bookingId);
    Task<IEnumerable<Booking>> GetAllByUserAsync(string userId);
    Task<IEnumerable<Booking>> GetAllByEventAsync(Guid eventId, int pageNumber, int pageSize);
    Task<int> GetTotalCountByEventAsync(Guid eventId); 
    Task AddAsync(Booking booking);
    Task DeleteAsync(Guid bookingId);
    Task SaveChangesAsync();
}