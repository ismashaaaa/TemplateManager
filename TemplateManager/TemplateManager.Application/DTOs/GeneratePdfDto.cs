namespace TemplateManager.Application.DTOs;

public record GeneratePdfDto(Guid TemplateId, Dictionary<string, object> Data);