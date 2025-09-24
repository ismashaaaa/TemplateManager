using TemplateManager.Domain.ValueObjects;

namespace TemplateManager.Application.Interfaces.Services;

public interface ITemplateProcessorService
{
    string ProcessTemplate(string htmlTemplate, TemplateData templateData);

    HashSet<string> ExtractPlaceholders(string htmlTemplate);

    bool ValidateTemplateData(string htmlTemplate, TemplateData templateData);
}