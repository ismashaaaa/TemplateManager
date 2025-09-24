using TemplateManager.API.Constants;
using TemplateManager.Application.DTOs;
using TemplateManager.Application.UseCases.Pdf;

namespace TemplateManager.API.Endpoints;

public static class PdfEndpoints
{
    public static void MapPdfEndpoints(this WebApplication app)
    {
        var group = app.MapGroup(ApiRoutes.Pdf.Base);

        group.MapPost(ApiRoutes.Pdf.Generate, GeneratePdfAsync);
        group.MapPost(ApiRoutes.Pdf.Validate, ValidateTemplateAsync);
    }

    private static async Task<IResult> GeneratePdfAsync(GeneratePdfDto generatePdfDto, GeneratePdfUseCase generatePdfUseCase, CancellationToken cancellationToken)
    {
        var pdfBytes = await generatePdfUseCase.ExecuteAsync(generatePdfDto, cancellationToken);
        return Results.File(pdfBytes, "application/pdf", $"template_{generatePdfDto.TemplateId}.pdf");
    }

    private static async Task<IResult> ValidateTemplateAsync(GeneratePdfDto generatePdfDto, ValidateTemplateUseCase validateTemplateUseCase, CancellationToken cancellationToken)
    {
        var result = await validateTemplateUseCase.ExecuteAsync(generatePdfDto.TemplateId, generatePdfDto.Data, cancellationToken);
        return Results.Ok(result);
    }
}