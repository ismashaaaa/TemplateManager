using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Exceptions;

namespace TemplateManager.Application.UseCases.Templates;

public class GetTemplateByIdUseCase
{
    private readonly ITemplateRepository _repository;

    public GetTemplateByIdUseCase(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<TemplateDto> ExecuteAsync(Guid id, CancellationToken cancellationToken)
    {
        var template = await _repository.GetByIdAsync(id, cancellationToken);
        if (template == null)
            throw new TemplateNotFoundException(id);

        return new TemplateDto(template.Id, template.Name, template.HtmlContent, template.CreatedAt, template.UpdatedAt);
    }
}