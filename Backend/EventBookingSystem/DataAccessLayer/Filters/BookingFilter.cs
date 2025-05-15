using DataAccessLayer.Enums;

namespace DataAccessLayer.Filters;

public class BookingFilter
{
    public BookingStatus? BookingStatus { get; set; }
}