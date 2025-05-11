using DataAccessLayer.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using DataAccessLayer.Entities;
namespace DataAccessLayer.Repositories.Booking;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _dbContext;

    public BookingRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Entities.Booking?> GetByIdAsync(Guid bookingId)
    {
        return await _dbContext.Bookings
            .Include(b => b.Event)
            .Include(b => b.User)
            .FirstOrDefaultAsync(b => b.Id == bookingId);
    }

    public async Task<IEnumerable<Entities.Booking>> GetAllByUserAsync(string userId)
    {
        return await _dbContext.Bookings
            .Where(b => b.UserId == userId)
            .Include(b => b.Event)
            .ToListAsync();
    }

    public async Task<IEnumerable<Entities.Booking>> GetAllByEventAsync(Guid eventId, int pageNumber, int pageSize)
    {
        return await _dbContext.Bookings
            .Where(b => b.EventId == eventId)
            .Include(b => b.User)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetTotalCountByEventAsync(Guid eventId)
    { 
        return await _dbContext.Bookings.CountAsync(b => b.EventId == eventId);
    }

    public async Task AddAsync(Entities.Booking booking)
    {
        await _dbContext.Bookings.AddAsync(booking);
    }

    public async Task DeleteAsync(Guid bookingId)
    {
        var booking = await _dbContext.Bookings.FindAsync(bookingId);
        if (booking != null)
        {
            _dbContext.Bookings.Remove(booking);
        }
    }

    public async Task<bool> AlreadyBookedAsync(string userId, Guid eventId)
    {
        return await _dbContext.Bookings
            .AnyAsync(b => b.UserId == userId && b.EventId == eventId);
    }

    public async Task<List<Guid>> GetBookedEventIdsByUserAsync(string userId)
    {
       return await _dbContext.Bookings
            .Where(b => b.UserId == userId)
            .Select(b => b.EventId)
            .ToListAsync();
    }
    
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}