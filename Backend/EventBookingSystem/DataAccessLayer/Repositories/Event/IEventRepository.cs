using DataAccessLayer.Enums;

namespace DataAccessLayer.Repositories.Event;
using DataAccessLayer.Entities;
public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid eventId);
    Task<IEnumerable<Event>> GetUpcomingAsync(int pageNumber, int pageSize);
    Task<IEnumerable<Event>> GetUpcomingByCategoryAsync(EventCategory category, int pageNumber, int pageSize);
    Task<int> GetUpcomingTotalCountAsync(); 
    Task<int> GetUpcomingTotalCountByCategoryAsync(EventCategory category);
    Task AddAsync(Event evt);
    Task<bool> UpdateAsync(Event evt);
    Task DeleteAsync(Guid eventId);
    Task<int> DeleteExpiredEventsAsync();
    Task SaveChangesAsync();
}