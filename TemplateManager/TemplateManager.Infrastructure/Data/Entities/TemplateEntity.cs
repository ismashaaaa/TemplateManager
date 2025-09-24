namespace TemplateManager.Infrastructure.Data.Entities;

public class TemplateEntity
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string HtmlContent { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
