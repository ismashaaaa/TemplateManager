using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Entities;

namespace TemplateManager.Application.UseCases.Templates;

public class GetAllTemplatesUseCase
{
    private readonly ITemplateRepository _repository;

    public GetAllTemplatesUseCase(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TemplateDto>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var templates = await _repository.GetAllAsync(cancellationToken);
        return templates.Select(MapToDto);
    }

    private static TemplateDto MapToDto(Template template) => new(
        template.Id,
        template.Name,
        template.HtmlContent,
        template.CreatedAt,
        template.UpdatedAt
    );
}