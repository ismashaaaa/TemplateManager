namespace TemplateManager.Domain.Exceptions;

public class InvalidTemplateDataException : Exception
{
    public InvalidTemplateDataException(string message) : base(message)
    { }
}