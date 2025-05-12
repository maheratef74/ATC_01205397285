using DataAccessLayer.DbContext;
using DataAccessLayer.Repositories.Event;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BusinessLogicLayer.Jobs;

public class MarkExpiredEventsAsCompletedAsync : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<MarkExpiredEventsAsCompletedAsync> _logger;
    private readonly TimeSpan _interval = TimeSpan.FromHours(1);

    public MarkExpiredEventsAsCompletedAsync(IServiceProvider serviceProvider, ILogger<MarkExpiredEventsAsCompletedAsync> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await MarEventsAsCompletedAsync();
            await Task.Delay(_interval, stoppingToken);
        }
    }
    private async Task MarEventsAsCompletedAsync()
    {
        using var scope = _serviceProvider.CreateScope();

        var _eventRepository = scope.ServiceProvider.GetRequiredService<IEventRepository>();
        var Count = await _eventRepository.MarkExpiredEventsAsCompletedAsync();
        
        if (Count > 0)
        {
            _logger.LogInformation($"{Count} expired event(s) deleted at {DateTime.UtcNow}.");
        }
    }
}