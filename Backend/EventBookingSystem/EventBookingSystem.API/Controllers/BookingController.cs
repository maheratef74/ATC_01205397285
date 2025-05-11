using System.Security.Claims;
using BusinessLogicLayer.Services.BookingService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace EventBookingSystem.API.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
[ApiController]
[Route("api/bookings")]
public class BookingController : ControllerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IResponseService _responseService;
    private readonly IStringLocalizer<BookingController> _localizer;
    private readonly IBookingService _bookingService;
    
    public BookingController(IResponseService responseService, IHttpContextAccessor httpContextAccessor, IStringLocalizer<BookingController> localizer, IBookingService bookingService)
    {
        _responseService = responseService;
        _httpContextAccessor = httpContextAccessor;
        _localizer = localizer;
        _bookingService = bookingService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromQuery] Guid eventId)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var result = await _bookingService.CreateBookingAsync(eventId, userId);
        return _responseService.CreateResponse(result);
    }
}