namespace TemplateManager.Domain.Entities;

public class Template
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string HtmlContent { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Template(string name, string htmlContent)
    {
        Id = Guid.NewGuid();
        Name = name;
        HtmlContent = htmlContent;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateContent(string name, string htmlContent)
    {
        Name = name;
        HtmlContent = htmlContent;
        UpdatedAt = DateTime.UtcNow;
    }
}