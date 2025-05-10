using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Repositories.User;
using DataAccessLayer.Entities;
public interface IUserRepository
{
    Task<User?> GetByIdAsync(string userId);
    Task<User?> GetByEmailAsync(string email);
    Task<IdentityResult> AddAsync(User user , string Password);
    Task UpdateAsync(User user);
    Task DeleteAsync(string userId);
    Task SaveChangesAsync();
}