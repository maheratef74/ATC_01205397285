using System.Security.Claims;
using BusinessLogicLayer.Services.BookingService;
using BusinessLogicLayer.Services.ResponseService;
using DataAccessLayer.Repositories.Booking;
using EventBookingSystem.API.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventBookingSystem.API.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IBookingService _bookingService;
    private readonly IResponseService _responseService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public UserController(IBookingRepository bookingRepository, IHttpContextAccessor httpContextAccessor, IBookingService bookingService, IResponseService responseService)
    {
        _bookingRepository = bookingRepository;
        _httpContextAccessor = httpContextAccessor;
        _bookingService = bookingService;
        _responseService = responseService;
    }

    [HttpGet("bookings")]
    public async Task<IActionResult> GetUserBookings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var bookings = await _bookingRepository.GetAllByUserAsync(userId);
        var bookingDtos = bookings.Select(b => b.ToDBookingto()).ToList();
        return Ok(bookingDtos);
    }
    
    [HttpGet("upcoming-bookings")]
    public async Task<IActionResult> GetMyUpcomingBookings()  // upcoming booked by user
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var bookings = await _bookingRepository.GetUpcomingBookedEventByUserAsync(userId);
        var bookingDtos = bookings.Select(b => b.ToDBookingto()).ToList();

        return Ok(bookingDtos);
    }
    
     
    [HttpGet("completed-bookings")]   
    public async Task<IActionResult> GetCompletedBookedEvents()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var bookings = await _bookingRepository.GetCompletedBookedEventsByUserAsync(userId);
        var result = bookings.Select(b => b.ToDBookingto()).ToList();

        return Ok(result);
    }
    
    [HttpGet("cancelled-bookings")]
    public async Task<IActionResult> GetCancelledBookedEvents()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var bookings = await _bookingRepository.GetCancelledBookedEventsByUserAsync(userId);
        var result = bookings.Select(b => b.ToDBookingto()).ToList();

        return Ok(result);
    }
    
    [HttpPut("cancel-booking/{bookingId}")]
    public async Task<IActionResult> CancelBooking(Guid bookingId)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var result = await _bookingService.CancelBookingAsync(bookingId, userId);
        return _responseService.CreateResponse(result);
    }
}