using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Application.Interfaces.Services;
using TemplateManager.Infrastructure.Data;
using TemplateManager.Infrastructure.Repositories;
using TemplateManager.Infrastructure.Services;

namespace TemplateManager.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<TemplateManagerDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("TemplateManagerConnectionString")));

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<ITemplateRepository, TemplateRepository>();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ITemplateProcessorService, TemplateProcessorService>();
        services.AddScoped<IPdfGeneratorService, PuppeteerPdfGeneratorService>();

        return services;
    }
}