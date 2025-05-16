using System.Security.Claims;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
using DataAccessLayer.Filters;
using DataAccessLayer.Repositories.Booking;
using DataAccessLayer.Repositories.Event;
using EventBookingSystem.API.Dtos.EventDto;
using EventBookingSystem.API.Models.Event;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Localization;

namespace EventBookingSystem.API.Controllers;

[EnableRateLimiting("ApiPolicy")]
[ApiController]
[Route("api/event")]
public class EventController:ControllerBase
{
    private readonly IEventRepository _eventRepository;
    private readonly IStringLocalizer<AuthenticationController> _localizer;
    private readonly IResponseService _responseService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IBookingRepository _bookingRepository;
    public EventController(IEventRepository eventRepository, IStringLocalizer<AuthenticationController> localizer, IResponseService responseService, IHttpContextAccessor httpContextAccessor, IBookingRepository bookingRepository)
    {
        _eventRepository = eventRepository;
        _localizer = localizer;
        _responseService = responseService;
        _httpContextAccessor = httpContextAccessor;
        _bookingRepository = bookingRepository;
    }
    
    [Authorize(Roles = Roles.Admin)]
    [HttpPost]
    public async Task<IActionResult> AddEvent([FromBody] EventRequest request)
    {
        var evt = request.ToEvent();
        await _eventRepository.AddAsync(evt);
        await _eventRepository.SaveChangesAsync();
        return _responseService.CreateResponse(Result<string>.SuccessMessage(_localizer["EventCreatedSuccessfully"]));
    }
    
    [Authorize(Roles = Roles.Admin)]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(Guid id, [FromBody] EventRequest request)
    {
        var existingEvent = await _eventRepository.GetByIdAsync(id);
        if (existingEvent is null)
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["EventNotFound"]));
        }

        // Instead of creating a new instance, update the existing one 
        existingEvent.EventName = request.EventName;
        existingEvent.Description = request.Description;
        existingEvent.Category = request.Category;
        existingEvent.Venue = request.Venue;
        existingEvent.StartDate = request.StartDate;
        existingEvent.EndDate = request.EndDate;
        existingEvent.Price = request.Price;
        existingEvent.ImageUrl = request.ImageUrl;
        
        
        var updateSuccess = await _eventRepository.UpdateAsync(existingEvent);
        await _eventRepository.SaveChangesAsync();
        if (!updateSuccess)
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["FailedToUpdateEvent"]));
        }

        return _responseService.CreateResponse(Result<string>.SuccessMessage(_localizer["EventUpdatedSuccessfully"]));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        var evt = await _eventRepository.GetByIdAsync(id);
        if (evt is null)
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["EventNotFound"]));
        }

        await _eventRepository.DeleteAsync(id);
        await _eventRepository.SaveChangesAsync();
        return _responseService.CreateResponse(Result<string>.SuccessMessage(_localizer["EventDeletedSuccessfully"]));
    }
    
    [HttpGet]
    public async Task<IActionResult> GetEvents(
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize,
        [FromQuery] EventFilter filter)
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var events = await _eventRepository.GetEventsAsync(pageNumber, pageSize , filter);
        var totalCount = await _eventRepository.GetTotalCountAsync(filter);

        var bookedEventIds = await _bookingRepository.GetBookedEventIdsByUserAsync(userId);

        var eventDtos = events.ToEventDtos(bookedEventIds);

        var result = new PagedResult<EventDto>
        {
            Items = eventDtos,
            Page = pageNumber,
            PageSize = pageSize,
            TotalItems = totalCount
        };

        return _responseService.CreateResponse(Result<PagedResult<EventDto>>.Success(result));
    }
    
    [HttpGet("category-counts")]
    public async Task<IActionResult> GetEventCountsByCategory()
    {
        var result = await _eventRepository.GetEventCountsByCategoryAsync();
        return Ok(result);
    }
}