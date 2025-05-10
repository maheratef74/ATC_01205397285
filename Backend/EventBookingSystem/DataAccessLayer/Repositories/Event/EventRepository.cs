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

    public async Task<IEnumerable<Event>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await _dbContext.Events
            .OrderBy(e => e.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Event>> GetByCategoryAsync(EventCategory category, int pageNumber, int pageSize)
    {
        return await _dbContext.Events
            .Where(e => e.Category == category)
            .OrderBy(e => e.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<int> GetTotalCountAsync()
    {
        return await _dbContext.Events.CountAsync();
    }

    public async Task<int> GetTotalCountByCategoryAsync(EventCategory category)
    {
        return await _dbContext.Events.CountAsync(e => e.Category == category);
    }

    public async Task AddAsync(Event evt)
    {
        await _dbContext.Events.AddAsync(evt);
    }

    public async Task UpdateAsync(Event evt)
    {
        _dbContext.Events.Update(evt);
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