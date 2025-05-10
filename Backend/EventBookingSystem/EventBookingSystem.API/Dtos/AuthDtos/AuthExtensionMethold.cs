using DataAccessLayer.Entities;
using EventBookingSystem.API.Models.Auth;

namespace EventBookingSystem.API.Dtos.AuthDtos;

public static class AuthExtensionMethold
{
    public static User ToUser(this RegisterRequest request)
    {
        return new User()
        {
            Address = request.Address,
            FullName = request.Name,
            DateOfBarith = request.DateOfBirth,
            Email = request.Email,
            UserName = request.Email,
            PhoneNumber = request.Phone
        };
    }
}