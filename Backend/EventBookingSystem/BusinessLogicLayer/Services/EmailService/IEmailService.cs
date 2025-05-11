using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Services.EmailService;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string body, List<IFormFile> attachments = null);
}