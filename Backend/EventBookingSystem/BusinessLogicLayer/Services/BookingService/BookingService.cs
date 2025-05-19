using System.Globalization;
using BusinessLogicLayer.Services.EmailService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
using DataAccessLayer.Enums;
using DataAccessLayer.Repositories.Booking;
using DataAccessLayer.Repositories.Event;
using DataAccessLayer.Repositories.User;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace BusinessLogicLayer.Services.BookingService;

public class BookingService : IBookingService
{
    private readonly IStringLocalizer<BookingService> _localizer;
    private readonly IBookingRepository _bookingRepository;
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IEmailService _emailService;

    public BookingService(IStringLocalizer<BookingService> localizer, IBookingRepository bookingRepository, IEventRepository eventRepository, IUserRepository userRepository, IEmailService emailService)
    {
        _localizer = localizer;
        _bookingRepository = bookingRepository;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _emailService = emailService;
    }

    public async Task<Result<string>> CreateBookingAsync(Guid eventId, string userId)
    {
        var eventExists = await _eventRepository.GetByIdAsync(eventId);
        if (eventExists is null)
            return Result<string>.Failure(_localizer["EventNotFound"]);

        var userExists = await _userRepository.GetByIdAsync(userId);
        if (userExists is null)
            return Result<string>.Failure(_localizer["UserNotFound"]);

        var alreadyBooked = await _bookingRepository.AlreadyBookedAsync(userId, eventId);
        if (alreadyBooked)
            return Result<string>.Failure(_localizer["AlreadyBooked"]);

        if (eventExists.TicketsBooked >= eventExists.Capacity)
            return Result<string>.Failure(_localizer["EventFull"]);
        
        if (eventExists.StartDate < DateTime.UtcNow)
            return Result<string>.Failure(_localizer["EventStarted"]);
        
        var booking = new Booking
        {
            UserId = userId,
            EventId = eventId,
            BookingDate = DateTime.UtcNow
        };
        await _bookingRepository.AddAsync(booking);
        await _eventRepository.IncrementTicketsBookedAsync(eventId);
        
        await _bookingRepository.SaveChangesAsync();

        var emailSubject = _localizer["EmailBookingSubject"];
        var emailBody = GenerateBookingConfirmationEmail(userExists, eventExists);
        
        await _emailService.SendEmailAsync(userExists.Email, emailSubject, emailBody);

        return Result<string>.SuccessMessage(_localizer["BookingCreatedSuccessfully"]);
    }

    public async Task<Result<string>> CancelBookingAsync(Guid bookingId, string userId)
    {
        var booking = await _bookingRepository.GetByIdAsync(bookingId);

        if (booking == null)
        {
            return Result<string>.Failure(_localizer["BookingNotFound"]);
        }

        if (booking.Status == BookingStatus.Cancelled)
        {
            return Result<string>.Failure(_localizer["BookingAlreadyCancelled"]);
        }

        if (booking.Event.StartDate <= DateTime.UtcNow)
        {
            return Result<string>.Failure(_localizer["CannotCancelStartedEvent"]);
        }

        booking.Status = BookingStatus.Cancelled;

        var updateSuccess = await _bookingRepository.UpdateAsync(booking);
        await _bookingRepository.SaveChangesAsync();

        if (!updateSuccess)
        {
            return Result<string>.Failure(_localizer["FailedToCancelBooking"]);
        }

        return Result<string>.SuccessMessage(_localizer["BookingCancelledSuccessfully"]);
    }

    private string GenerateBookingConfirmationEmail(User user, Event evt)
        {
            var isRtl = CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
            var direction = isRtl ? "rtl" : "ltr";
            var textAlign = isRtl ? "right" : "left";

            return $@"
                <html dir='{direction}'>
                    <head>
                        <style>
                            body {{
                                font-family: 'Segoe UI', Arial, sans-serif;
                                background-color: #f4f4f4;
                                padding: 20px;
                                direction: {direction};
                                text-align: {textAlign};
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 10px;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            }}
                            h2 {{
                                color: #4CAF50;
                                margin-bottom: 20px;
                            }}
                            h3 {{
                                color: #333;
                                border-bottom: 1px solid #e0e0e0;
                                padding-bottom: 8px;
                            }}
                            ul {{
                                list-style: none;
                                padding: 0;
                            }}
                            li {{
                                margin-bottom: 10px;
                                line-height: 1.5;
                            }}
                            strong {{
                                color: #555;
                            }}
                            .description {{
                                background-color: #f9f9f9;
                                border-left: 4px solid #4CAF50;
                                padding: 15px;
                                margin-top: 15px;
                                border-radius: 5px;
                                color: #333;
                            }}
                            .footer {{
                                margin-top: 30px;
                                font-size: 0.95em;
                                color: #888;
                            }}
                        </style>
                    </head>
                    <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; direction: {direction}; text-align: {textAlign};'>
                        <div style='max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); direction: {direction}; text-align: {textAlign};'>
                            <h2 style='color: #4CAF50;'>{_localizer["EmailBookingHeader"]}</h2>
                            <p>{string.Format(_localizer["EmailGreeting"], user.FullName)}</p>
                            <h3 style='color: #333;'>{_localizer["EmailEventDetails"]}</h3>
                            <ul style='line-height: 1.6;'>
                                <li><strong>{_localizer["EmailEventName"]}</strong>: {evt.EventName}</li>
                                <li><strong>{_localizer["EmailStartTime"]}</strong>: {evt.StartDate:dddd, dd MMMM yyyy HH:mm}</li>
                                <li><strong>{_localizer["EmailEndTime"]}</strong>: {evt.EndDate:dddd, dd MMMM yyyy HH:mm}</li>
                                <li><strong>{_localizer["EmailLocation"]}</strong>: {evt.Venue}</li>
                            </ul>
                             <div class='description'>
                                <strong>{_localizer["EmailDescription"]}</strong><br />
                                {evt.Description}
                            </div>
                           <div class='footer'>
                              <p>{_localizer["EmailThankYou"]}</p>
                          </div>
                        </div>
                    </body> 
                    </html>"; 
        }

}