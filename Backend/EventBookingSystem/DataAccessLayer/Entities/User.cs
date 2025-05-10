namespace DataAccessLayer.Entities;

public class User : ApplicationUser
{
    public DateOnly? DateOfBarith { get; set; }
    public string Address { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; } = string.Empty;
}