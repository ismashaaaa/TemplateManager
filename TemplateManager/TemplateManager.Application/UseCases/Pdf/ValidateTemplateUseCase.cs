using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Application.Interfaces.Services;
using TemplateManager.Domain.Exceptions;
using TemplateManager.Domain.ValueObjects;

namespace TemplateManager.Application.UseCases.Pdf;

public class ValidateTemplateUseCase
{
    private readonly ITemplateRepository _templateRepository;
    private readonly ITemplateProcessorService _templateProcessor;

    public ValidateTemplateUseCase(ITemplateRepository templateRepository, ITemplateProcessorService templateProcessor)
    {
        _templateRepository = templateRepository;
        _templateProcessor = templateProcessor;
    }

    public async Task<TemplateValidationResult> ExecuteAsync(Guid templateId, Dictionary<string, object> data, CancellationToken cancellationToken)
    {
        var template = await _templateRepository.GetByIdAsync(templateId, cancellationToken);
        if (template == null)
            throw new TemplateNotFoundException(templateId);

        var templateData = new TemplateData(data);
        var requiredPlaceholders = _templateProcessor.ExtractPlaceholders(template.HtmlContent);
        var providedKeys = data.Keys.ToHashSet();
        var missingPlaceholders = requiredPlaceholders.Except(providedKeys).ToHashSet();
        var isValid = !missingPlaceholders.Any();

        return new TemplateValidationResult(isValid, requiredPlaceholders, missingPlaceholders);
    }
}