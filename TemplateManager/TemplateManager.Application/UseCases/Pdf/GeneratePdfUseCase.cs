using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Application.Interfaces.Services;
using TemplateManager.Domain.Exceptions;
using TemplateManager.Domain.ValueObjects;

namespace TemplateManager.Application.UseCases.Pdf;

public class GeneratePdfUseCase
{
    private readonly ITemplateRepository _templateRepository;
    private readonly IPdfGeneratorService _pdfGenerator;
    private readonly ITemplateProcessorService _templateProcessor;

    public GeneratePdfUseCase(ITemplateRepository templateRepository, IPdfGeneratorService pdfGenerator, ITemplateProcessorService templateProcessor)
    {
        _templateRepository = templateRepository;
        _pdfGenerator = pdfGenerator;
        _templateProcessor = templateProcessor;
    }

    public async Task<byte[]> ExecuteAsync(GeneratePdfDto generatePdfDto, CancellationToken cancellationToken)
    {
        var template = await _templateRepository.GetByIdAsync(generatePdfDto.TemplateId, cancellationToken);
        if (template == null)
            throw new TemplateNotFoundException(generatePdfDto.TemplateId);

        var templateData = new TemplateData(generatePdfDto.Data);

        if (!_templateProcessor.ValidateTemplateData(template.HtmlContent, templateData))
        {
            var requiredPlaceholders = _templateProcessor.ExtractPlaceholders(template.HtmlContent);
            var providedKeys = templateData.Data.Keys.ToHashSet();
            var missingKeys = requiredPlaceholders.Except(providedKeys).ToHashSet();

            throw new InvalidTemplateDataException(
                $"Missing required placeholders: {string.Join(", ", missingKeys)}");
        }

        var processedHtml = _templateProcessor.ProcessTemplate(template.HtmlContent, templateData);
        return await _pdfGenerator.GeneratePdfAsync(processedHtml, cancellationToken);
    }
}