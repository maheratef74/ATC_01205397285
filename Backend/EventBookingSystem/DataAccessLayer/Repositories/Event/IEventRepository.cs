using DataAccessLayer.Enums;

namespace DataAccessLayer.Repositories.Event;
using DataAccessLayer.Entities;
public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid eventId);
    Task<IEnumerable<Event>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<Event>> GetByCategoryAsync(EventCategory category, int pageNumber, int pageSize);
    Task<int> GetTotalCountAsync(); 
    Task<int> GetTotalCountByCategoryAsync(EventCategory category);
    Task AddAsync(Event evt);
    Task UpdateAsync(Event evt);
    Task DeleteAsync(Guid eventId);
    Task SaveChangesAsync();
}