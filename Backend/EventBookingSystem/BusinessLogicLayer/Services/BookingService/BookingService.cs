using System.Globalization;
using BusinessLogicLayer.Services.EmailService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
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

        var booking = new Booking
        {
            UserId = userId,
            EventId = eventId,
            BookingDate = DateTime.UtcNow
        };
        await _bookingRepository.AddAsync(booking);
        await _bookingRepository.SaveChangesAsync();

        // Send confirmation email
        var emailSubject = _localizer["BookingConfirmationSubject"];
        var isRtl = CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
        var direction = isRtl ? "rtl" : "ltr";
        var textAlign = isRtl ? "right" : "left";
        var emailBody = $@"
            <html dir='{direction}'>
            <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; direction: {direction}; text-align: {textAlign};'>
                <div style='max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); direction: {direction}; text-align: {textAlign};'>
                    <h2 style='color: #4CAF50;'>{_localizer["EmailBookingHeader"]}</h2>
                    <p>{_localizer["EmailGreeting"]}</p>
                    <h3 style='color: #333;'>{_localizer["EmailEventDetails"]}</h3>
                    <ul style='line-height: 1.6;'>
                        <li><strong>{_localizer["EmailEventName"]}</strong>: {eventExists.EventName}</li>
                        <li><strong>{_localizer["EmailStartTime"]}</strong>: {eventExists.StartDate:dddd, dd MMMM yyyy HH:mm}</li>
                        <li><strong>{_localizer["EmailEndTime"]}</strong>: {eventExists.EndDate:dddd, dd MMMM yyyy HH:mm}</li>
                        <li><strong>{_localizer["EmailLocation"]}</strong>: {eventExists.Venue}</li>
                    </ul>
                    <p style='margin-top: 30px;'>{_localizer["EmailThankYou"]}</p>
                </div>
            </body>
            </html>";


        await _emailService.SendEmailAsync(userExists.Email, emailSubject, emailSubject);

        return Result<string>.SuccessMessage(_localizer["BookingCreatedSuccessfully"]);
    }
}