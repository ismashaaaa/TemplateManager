namespace TemplateManager.Application.DTOs;

public record TemplateValidationResult(bool IsValid, HashSet<string> RequiredPlaceholders, HashSet<string> MissingPlaceholders);