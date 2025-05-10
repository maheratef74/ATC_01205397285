using System.ComponentModel.DataAnnotations;
using DataAccessLayer.Enums;

namespace EventBookingSystem.API.Models.Auth;

public class RegisterRequest
{
    [Required(ErrorMessage = "Name")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email")]
    [EmailAddress(ErrorMessage = "EmailInvalid")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Phone")]
    [Phone(ErrorMessage = "PhoneInvalid")]
    public string Phone { get; set; }

    [Required(ErrorMessage = "DateOfBirth")]
    public DateOnly DateOfBirth { get; set; }

    [Required(ErrorMessage = "Address")]
    public string Address { get; set; }
    
    [Required(ErrorMessage = "Password")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "PasswordLength")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Gender")]
    public Gender Gender { get; set; }
}