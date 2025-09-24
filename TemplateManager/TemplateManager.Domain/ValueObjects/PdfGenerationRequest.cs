namespace TemplateManager.Domain.ValueObjects;

public record PdfGenerationRequest(Guid TemplateId, TemplateData Data);