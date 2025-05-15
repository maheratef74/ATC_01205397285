using DataAccessLayer.Enums;

namespace DataAccessLayer.Filters;

public class EventFilter
{
    public EventCategory? Category { get; set; } 
    public EventStatus? Status { get; set; }     
}