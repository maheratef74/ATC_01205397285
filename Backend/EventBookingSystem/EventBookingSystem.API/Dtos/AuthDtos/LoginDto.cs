using DataAccessLayer.Entities;

namespace EventBookingSystem.API.Dtos.AuthDtos;

public class LoginDto
{
    public string Id {get; set;} = string.Empty;
    public string Name {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public string Role { get; set; } 
}

public static class UserExtentsionMethld
{
    public static LoginDto ToLoginDto(this ApplicationUser user)
    {
        return new LoginDto()
        {
           Id = user.Id,
           Name = user.FullName,
           Email = user.Email
        };
    }
}