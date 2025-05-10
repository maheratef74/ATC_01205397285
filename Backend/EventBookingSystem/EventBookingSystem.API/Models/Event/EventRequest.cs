using System.ComponentModel.DataAnnotations;
using DataAccessLayer.Enums;

namespace EventBookingSystem.API.Models.Event;

public class EventRequest
{
    [Required(ErrorMessage = "EventName")]
    [MaxLength(100, ErrorMessage = "EventNameMaxLength")]
    public string EventName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description")]
    [MaxLength(500, ErrorMessage = "DescriptionMaxLength")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category")]
    public EventCategory Category { get; set; }

    [Required(ErrorMessage = "StartDate")]
    [DataType(DataType.DateTime, ErrorMessage = "StartDateInvalid")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "EndDate")]
    [DataType(DataType.DateTime, ErrorMessage = "EndDateInvalid")]
    public DateTime EndDate { get; set; }

    [Required(ErrorMessage = "Venue")]
    [MaxLength(200, ErrorMessage = "VenueMaxLength")]
    public string Venue { get; set; } = string.Empty;

    [Required(ErrorMessage = "Price")]
    [Range(0, double.MaxValue, ErrorMessage = "PriceInvalid")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "ImageUrl")]
    public string ImageUrl { get; set; } = string.Empty;
}