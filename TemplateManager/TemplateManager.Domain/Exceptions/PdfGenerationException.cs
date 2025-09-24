namespace TemplateManager.Domain.Exceptions;

public class PdfGenerationException : Exception
{
    public PdfGenerationException(string message, Exception? innerException) : base(message, innerException)
    { }
}