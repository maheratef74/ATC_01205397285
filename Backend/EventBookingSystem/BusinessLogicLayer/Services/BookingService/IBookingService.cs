using BusinessLogicLayer.Shared;

namespace BusinessLogicLayer.Services.BookingService;

public interface IBookingService
{
    Task<Result<string>> CreateBookingAsync(Guid eventId, string userId);
}