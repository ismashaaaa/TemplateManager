using Microsoft.Extensions.Logging;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using TemplateManager.Application.Interfaces.Services;
using TemplateManager.Domain.Exceptions;

namespace TemplateManager.Infrastructure.Services;

public class PuppeteerPdfGeneratorService : IPdfGeneratorService
{
    private readonly ILogger<PuppeteerPdfGeneratorService> _logger;
    private static readonly string[] options = ["--no-sandbox", "--disable-setuid-sandbox"];

    public PuppeteerPdfGeneratorService(ILogger<PuppeteerPdfGeneratorService> logger)
    {
        _logger = logger;
    }

    public async Task<byte[]> GeneratePdfAsync(string htmlContent, CancellationToken cancellationToken = default)
    {
        try
        {
            await new BrowserFetcher().DownloadAsync();

            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true,
                Args = options
            });

            await using var page = await browser.NewPageAsync();
            await page.SetContentAsync(htmlContent);

            var pdfBytes = await page.PdfDataAsync(new PdfOptions
            {
                Format = PaperFormat.A4,
                PrintBackground = true,
                MarginOptions = new MarginOptions
                {
                    Top = "1cm",
                    Right = "1cm",
                    Bottom = "1cm",
                    Left = "1cm"
                }
            });

            return pdfBytes;
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error generating PDF from HTML content");
            throw new PdfGenerationException("Failed to generate PDF", exception);
        }
    }
}