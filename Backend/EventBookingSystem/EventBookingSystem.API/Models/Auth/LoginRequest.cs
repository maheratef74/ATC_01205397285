using System.ComponentModel.DataAnnotations;
using EventBookingSystem.API.Dtos.AuthDtos;

namespace EventBookingSystem.API.Models.Auth;

public class LoginRequest
{
    [Required(ErrorMessage = "Email")]
    [EmailAddress(ErrorMessage = "EmailInvalid")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password")]
    public string Password { get; set; }

    public bool RememberMe = true;
}

