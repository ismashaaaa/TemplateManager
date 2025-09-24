using System.Text.RegularExpressions;
using TemplateManager.Application.Interfaces.Services;
using TemplateManager.Domain.ValueObjects;

namespace TemplateManager.Infrastructure.Services;

public class TemplateProcessorService : ITemplateProcessorService
{
    private static readonly Regex PlaceholderRegex = new(@"\{\{(\w+)\}\}", RegexOptions.Compiled);

    public string ProcessTemplate(string htmlTemplate, TemplateData templateData)
    {
        if (IsNullOrEmpty(htmlTemplate))
            return string.Empty;

        return ReplacePlaceholders(htmlTemplate, templateData);
    }

    public HashSet<string> ExtractPlaceholders(string htmlTemplate)
    {
        if (IsNullOrEmpty(htmlTemplate))
            return new HashSet<string>();

        return GetPlaceholders(htmlTemplate).ToHashSet();
    }

    public bool ValidateTemplateData(string htmlTemplate, TemplateData templateData)
    {
        var requiredPlaceholders = ExtractPlaceholders(htmlTemplate);
        var providedKeys = templateData.Data.Keys.ToHashSet();
        return requiredPlaceholders.IsSubsetOf(providedKeys);
    }

    private static bool IsNullOrEmpty(string? value) => string.IsNullOrEmpty(value);

    private static string ReplacePlaceholders(string htmlTemplate, TemplateData templateData)
    {
        return PlaceholderRegex.Replace(htmlTemplate, match =>
        {
            var placeholder = match.Groups[1].Value;
            return templateData.GetStringValue(placeholder);
        });
    }

    private static IEnumerable<string> GetPlaceholders(string htmlTemplate) =>
       PlaceholderRegex.Matches(htmlTemplate)
                       .Select(match => match.Groups[1].Value);
}