using TemplateManager.API.Constants;
using TemplateManager.Application.DTOs;
using TemplateManager.Application.UseCases.Templates;

namespace TemplateManager.API.Endpoints;

public static class TemplateEndpoints
{
    public static void MapTemplateEndpoints(this WebApplication app)
    {
        var group = app.MapGroup(ApiRoutes.Templates.Base);

        group.MapGet(ApiRoutes.Templates.GetById, GetTemplateByIdAsync);
        group.MapGet(ApiRoutes.Templates.GetAll, GetAllTemplatesAsync);
        group.MapPost(ApiRoutes.Templates.Create, CreateTemplateAsync);
        group.MapPut(ApiRoutes.Templates.Update, UpdateTemplateAsync);
        group.MapDelete(ApiRoutes.Templates.Delete, DeleteTemplateAsync);
    }

    private static async Task<IResult> GetAllTemplatesAsync(GetAllTemplatesUseCase  getAllTemplatesUseCase, CancellationToken cancellationToken)
    {
        var templates = await getAllTemplatesUseCase.ExecuteAsync(cancellationToken);
        return Results.Ok(templates);
    }

    private static async Task<IResult> GetTemplateByIdAsync(Guid id, GetTemplateByIdUseCase getTemplateByIdUseCase, CancellationToken cancellationToken)
    {
        var template = await getTemplateByIdUseCase.ExecuteAsync(id, cancellationToken);
        return Results.Ok(template);
    }

    private static async Task<IResult> CreateTemplateAsync(CreateTemplateDto createTemplateDto, CreateTemplateUseCase createTemplateUseCase, CancellationToken cancellationToken)
    {
        var template = await createTemplateUseCase.ExecuteAsync(createTemplateDto, cancellationToken);
        return Results.Created($"/api/templates/{template.Id}", template);
    }

    private static async Task<IResult> UpdateTemplateAsync(Guid id, UpdateTemplateDto updateTemplateDto, UpdateTemplateUseCase updateTemplateUseCase, CancellationToken cancellationToken)
    {
        var template = await updateTemplateUseCase.ExecuteAsync(id, updateTemplateDto, cancellationToken);
        return Results.Ok(template);
    }

    private static async Task<IResult> DeleteTemplateAsync(Guid id, DeleteTemplateUseCase deleteTemplateUseCase, CancellationToken cancellationToken)
    {
        await deleteTemplateUseCase.ExecuteAsync(id, cancellationToken);
        return Results.NoContent();
    }
}