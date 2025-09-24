namespace TemplateManager.Domain.ValueObjects;

public record TemplateData(Dictionary<string, object> Data)
{
    public static TemplateData Empty => new([]);

    public bool IsEmpty => !Data.Any();

    public string GetStringValue(string key) =>
        Data.TryGetValue(key, out var value) ? value?.ToString() ?? string.Empty : string.Empty;
}