using DataAccessLayer.DbContext;
using DataAccessLayer.Enums;
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

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}