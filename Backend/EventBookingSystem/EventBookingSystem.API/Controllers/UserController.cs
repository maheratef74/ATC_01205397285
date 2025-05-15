using System.Security.Claims;
using BusinessLogicLayer.Services.BookingService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Enums;
using DataAccessLayer.Filters;
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
    public async Task<IActionResult> GetUserBookings(
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize,
        [FromQuery] BookingFilter? filter)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var bookings = await _bookingRepository.GetAllByUserAsync(userId , filter , pageNumber, pageSize);
        var totalCount = await _bookingRepository.CountAllByUserAsync(userId, filter);
        var bookingDtos = bookings.Select(b => b.ToDBookingto()).ToList();
        var result = new PagedResult<BookingDto>()
        {
            Items = bookingDtos,
            TotalItems = totalCount,
            Page = pageNumber,
            PageSize = pageSize
        };
        return _responseService.CreateResponse(result);
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