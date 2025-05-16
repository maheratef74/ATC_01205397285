using System.Security.Claims;
using BusinessLogicLayer.Services.BookingService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.Booking;
using EventBookingSystem.API.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Localization;

namespace EventBookingSystem.API.Controllers;

[EnableRateLimiting("ApiPolicy")]
[ApiController]
[Route("api/bookings")]
public class BookingController : ControllerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IResponseService _responseService;
    private readonly IStringLocalizer<BookingController> _localizer;
    private readonly IBookingService _bookingService;
    private readonly IBookingRepository _bookingRepository;
    public BookingController(IResponseService responseService, IHttpContextAccessor httpContextAccessor, IStringLocalizer<BookingController> localizer, IBookingService bookingService, IBookingRepository bookingRepository)
    {
        _responseService = responseService;
        _httpContextAccessor = httpContextAccessor;
        _localizer = localizer;
        _bookingService = bookingService;
        _bookingRepository = bookingRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromQuery] Guid eventId)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var result = await _bookingService.CreateBookingAsync(eventId, userId);
        return _responseService.CreateResponse(result);
    }
    
    [Authorize(Roles = Roles.Admin)]
    [HttpGet("upcoming")]   // for admin dashboard 
    public async Task<IActionResult> GetUpcomingEventBookings([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var countBookings = await _bookingRepository.CountUpcomingEventBookingsAsync();
        var upcomingBookings = await _bookingRepository.GetUpcomingEventBookingsAsync(page, pageSize);
        var upcommingBookingDto = upcomingBookings.Select(b => b.ToDBookingto()).ToList();
        
        var result = new PagedResult<BookingDto>()
        {
            Items = upcommingBookingDto,
            TotalItems = countBookings,
            PageSize = pageSize,
            Page = page
        };
        
        return Ok(result);
    }
    
   
}