using Microsoft.Extensions.DependencyInjection;
using TemplateManager.Application.UseCases.Pdf;
using TemplateManager.Application.UseCases.Templates;

namespace TemplateManager.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationUseCases(this IServiceCollection services)
    {
        services.AddTransient<GetAllTemplatesUseCase>();
        services.AddTransient<GetTemplateByIdUseCase>();
        services.AddTransient<CreateTemplateUseCase>();
        services.AddTransient<UpdateTemplateUseCase>();
        services.AddTransient<DeleteTemplateUseCase>();

        services.AddTransient<GeneratePdfUseCase>();
        services.AddTransient<ValidateTemplateUseCase>();

        return services;
    }
}