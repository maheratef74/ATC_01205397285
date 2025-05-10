using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.User;
using DataAccessLayer.Entities;
using DataAccessLayer.DbContext;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    public UserRepository(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }
    
    public async Task<User?> GetByIdAsync(string userId)
    {
        return await _dbContext.Users.FindAsync(userId);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<IdentityResult> AddAsync(User user, string password)
    {
        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            return result;
        }
        var addRoleResult = await _userManager.AddToRoleAsync(user, Roles.User);
        if (!addRoleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);
            return addRoleResult;
        }
        return IdentityResult.Success;
    }
    public Task UpdateAsync(User user)
    {
        _dbContext.Users.Update(user);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(string userId)
    {
        var user = await _dbContext.Users.FindAsync(userId);
        if (user != null)
        {
            _dbContext.Users.Remove(user);
        }
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}