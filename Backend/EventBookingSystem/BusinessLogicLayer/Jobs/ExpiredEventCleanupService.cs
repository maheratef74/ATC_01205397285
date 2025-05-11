using DataAccessLayer.DbContext;
using DataAccessLayer.Repositories.Event;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BusinessLogicLayer.Jobs;

public class ExpiredEventCleanupService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ExpiredEventCleanupService> _logger;
    private readonly TimeSpan _interval = TimeSpan.FromHours(12);

    public ExpiredEventCleanupService(IServiceProvider serviceProvider, ILogger<ExpiredEventCleanupService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await RemoveExpiredEventsAsync();
            await Task.Delay(_interval, stoppingToken);
        }
    }
    private async Task RemoveExpiredEventsAsync()
    {
        using var scope = _serviceProvider.CreateScope();

        var _eventRepository = scope.ServiceProvider.GetRequiredService<IEventRepository>();
        var deletedCount = await _eventRepository.DeleteExpiredEventsAsync();
        
        if (deletedCount > 0)
        {
            _logger.LogInformation($"{deletedCount} expired event(s) deleted at {DateTime.UtcNow}.");
        }
    }
}