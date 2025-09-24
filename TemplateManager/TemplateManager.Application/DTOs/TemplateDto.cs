namespace TemplateManager.Application.DTOs;

public record TemplateDto(Guid Id, string Name, string HtmlContent, DateTime CreatedAt, DateTime? UpdatedAt);