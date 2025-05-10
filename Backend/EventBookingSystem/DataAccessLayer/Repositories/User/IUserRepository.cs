namespace DataAccessLayer.Repositories.User;
using DataAccessLayer.Entities;
public interface IUserRepository
{
    Task<User?> GetByIdAsync(string userId);
    Task<User?> GetByEmailAsync(string email);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(string userId);
    Task SaveChangesAsync();
}