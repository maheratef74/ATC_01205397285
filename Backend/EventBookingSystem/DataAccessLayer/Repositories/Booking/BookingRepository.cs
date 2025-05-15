using DataAccessLayer.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using DataAccessLayer.Entities;
using DataAccessLayer.Enums;
using DataAccessLayer.Filters;

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

    public async Task<List<Entities.Booking>> GetAllByUserAsync(string userId, BookingFilter? filter, int pageNumber, int pageSize)
    {
        var query = _dbContext.Bookings
            .Where(b => b.UserId == userId)
            .Include(b => b.Event)
            .Include(b => b.User)
            .AsQueryable();

        if (filter.BookingStatus.HasValue)
        {
            query = query.Where(b => b.Status == filter.BookingStatus.Value);
        }

        return await query
            .OrderByDescending(b => b.Event.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(); 
    }

    public async Task<int> CountAllByUserAsync(string userId, BookingFilter? filter)
    {
        var query = _dbContext.Bookings
            .Where(b => b.UserId == userId)
            .AsQueryable();

        if (filter.BookingStatus.HasValue)
        {
            query = query.Where(b => b.Status == filter.BookingStatus.Value);
        }

        return await query.CountAsync();
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
    
    public async Task<bool> UpdateAsync(Entities.Booking booking)
    {
        _dbContext.Bookings.Update(booking);
        return await Task.FromResult(true);
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

    public async Task<int> CountUpcomingEventBookingsAsync()
    {
        return await _dbContext.Bookings
            .Include(b => b.Event)
            .Where(b => b.Event.StartDate > DateTime.UtcNow)
            .CountAsync();
    }

    public async Task<List<Entities.Booking>> GetUpcomingEventBookingsAsync(int page, int pageSize)
    {
        return await _dbContext.Bookings
            .Include(b => b.Event)
            .Include(b => b.User)
            .Where(b => b.Event.StartDate > DateTime.UtcNow)
            .OrderBy(b => b.Event.StartDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<List<Entities.Booking>> GetUpcomingBookedEventByUserAsync(string userId)
    {
        return await _dbContext.Bookings
            .Include(b => b.Event)
            .Include(b => b.User)
            .Where(b => b.UserId == userId && b.Event.StartDate > DateTime.UtcNow)
            .OrderBy(b => b.Event.StartDate)
            .ToListAsync();
    }
    
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}