namespace TemplateManager.Application.Interfaces.Services;

public interface IPdfGeneratorService
{
    Task<byte[]> GeneratePdfAsync(string htmlContent, CancellationToken cancellationToken);
}