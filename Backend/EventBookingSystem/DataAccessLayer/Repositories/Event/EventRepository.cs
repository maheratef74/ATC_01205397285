using DataAccessLayer.DbContext;
using DataAccessLayer.Enums;
using DataAccessLayer.Filters;
using EventBookingSystem.API.Dtos.EventDto;
using Microsoft.EntityFrameworkCore;
using EventBookingSystem.API.Dtos;

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

    public async Task<IEnumerable<Event>> GetEventsAsync(int pageNumber, int pageSize , EventFilter filter)
    {
        var query = _dbContext.Events.AsQueryable();
        
        if (filter.Category.HasValue)
            query = query.Where(e => e.Category == filter.Category.Value);

        if (filter.Status.HasValue)
            query = query.Where(e => e.EventStatus == filter.Status.Value);
        
        return await query
            .OrderBy(e => e.StartDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
    
    public async Task<int> GetTotalCountAsync(EventFilter filter)
    {
        var query = _dbContext.Events.AsQueryable();

        if (filter.Category.HasValue)
            query = query.Where(e => e.Category == filter.Category.Value);

        if (filter.Status.HasValue)
            query = query.Where(e => e.EventStatus == filter.Status.Value);
        
        return await query.CountAsync();
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

    public async Task<int> MarkExpiredEventsAsCompletedAsync()
    {
        var now = DateTime.UtcNow;
    
        var expiredEvents = await _dbContext.Events
            .Where(e => e.EndDate < now && e.EventStatus != EventStatus.Completed)
            .ToListAsync();

        if (expiredEvents.Any())
        {
            foreach (var ev in expiredEvents)
            {
                ev.EventStatus = EventStatus.Completed;
            }

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