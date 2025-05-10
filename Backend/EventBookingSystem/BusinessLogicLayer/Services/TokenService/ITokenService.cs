using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Services.TokenService;

public interface ITokenService
{
    Task<string> GenerateToken(ApplicationUser user, bool rememberMe);
}