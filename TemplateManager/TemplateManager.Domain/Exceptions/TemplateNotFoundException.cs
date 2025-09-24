namespace TemplateManager.Domain.Exceptions;

public class TemplateNotFoundException : Exception
{
    public TemplateNotFoundException(Guid templateId) : base($"Template with ID '{templateId}' was not found.")
    { }
}