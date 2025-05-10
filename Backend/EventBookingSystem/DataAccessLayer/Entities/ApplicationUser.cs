using DataAccessLayer.Enums;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}