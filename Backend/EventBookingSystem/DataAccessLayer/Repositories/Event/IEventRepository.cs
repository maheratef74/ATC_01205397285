using DataAccessLayer.Enums;
using DataAccessLayer.Filters;
using EventBookingSystem.API.Dtos.EventDto;

namespace DataAccessLayer.Repositories.Event;
using DataAccessLayer.Entities;
public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid eventId);
    Task<IEnumerable<Event>> GetEventsAsync(int pageNumber, int pageSize, EventFilter filter);
    Task<int> GetTotalCountAsync(EventFilter filter);
    Task AddAsync(Event evt);
    Task<bool> UpdateAsync(Event evt);
    Task DeleteAsync(Guid eventId);
    Task<int> MarkExpiredEventsAsCompletedAsync();
    Task IncrementTicketsBookedAsync(Guid eventId);
    Task<List<EventCategoryCountDto>> GetEventCountsByCategoryAsync();
    Task SaveChangesAsync();
}