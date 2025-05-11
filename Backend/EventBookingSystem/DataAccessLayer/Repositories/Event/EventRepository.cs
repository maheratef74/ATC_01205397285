using DataAccessLayer.DbContext;
using DataAccessLayer.Enums;
using EventBookingSystem.API.Dtos.EventDto;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.Event;
using DataAccessLayer.Entities;
public class EventRepository : IEventRepository
{
    private readonly AppDbContext _dbContext;

    public EventRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Event?> GetByIdAsync(Guid eventId)
    {
        return await _dbContext.Events.FindAsync(eventId);
    }

    public async Task<IEnumerable<Event>> GetUpcomingAsync(int pageNumber, int pageSize)
    {
        var now = DateTime.UtcNow;
        return await _dbContext.Events
            .Where(e => e.StartDate > now)
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Event>> GetUpcomingByCategoryAsync(EventCategory category, int pageNumber, int pageSize)
    {
        var now = DateTime.UtcNow;
        return await _dbContext.Events
            .Where(e => e.Category == category && e.StartDate > now)
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetUpcomingTotalCountAsync()
    {
        var now = DateTime.UtcNow;
        return await _dbContext.Events.CountAsync(e => e.StartDate > now);
    }

    public async Task<int> GetUpcomingTotalCountByCategoryAsync(EventCategory category)
    {
        var now = DateTime.UtcNow;
        return await _dbContext.Events.CountAsync(e => e.Category == category && e.StartDate > now);
    }

    public async Task AddAsync(Event evt)
    {
        await _dbContext.Events.AddAsync(evt);
    }

    public async Task<bool> UpdateAsync(Event evt)
    {
        var existingEvent = await _dbContext.Events.FindAsync(evt.Id);
        if (existingEvent == null)
            return false;
        
        _dbContext.Entry(existingEvent).CurrentValues.SetValues(evt);
        return true;
    }

    public async Task DeleteAsync(Guid eventId)
    {
        var evt = await _dbContext.Events.FindAsync(eventId);
        if (evt != null)
        {
            _dbContext.Events.Remove(evt);
        }
    }

    public async Task<int> DeleteExpiredEventsAsync()
    {
        var now = DateTime.UtcNow;
        var expiredEvents = await _dbContext.Events
            .Where(e => e.EndDate < now)
            .ToListAsync();

        if (expiredEvents.Any())
        {
            _dbContext.Events.RemoveRange(expiredEvents);
            return await _dbContext.SaveChangesAsync();
        }

        return 0;
    }

    public async Task IncrementTicketsBookedAsync(Guid eventId)
    {
        var evt = await _dbContext.Events.FindAsync(eventId);
        if (evt != null)
        {
            evt.TicketsBooked++;
            _dbContext.Events.Update(evt);
        }
    }

    public async Task<List<EventCategoryCountDto>> GetEventCountsByCategoryAsync()
    {
        var allCategories = Enum.GetValues(typeof(EventCategory)).Cast<EventCategory>();

        var eventCounts = await _dbContext.Events
            .GroupBy(e => e.Category)
            .Select(g => new
            {
                Category = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        var result = allCategories
            .Select(category => new EventCategoryCountDto
            {
                Category = category.ToString(),
                Count = eventCounts.FirstOrDefault(e => e.Category == category)?.Count ?? 0
            })
            .ToList();

        return result;
    }


    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}