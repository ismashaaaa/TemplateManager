using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Exceptions;

namespace TemplateManager.Application.UseCases.Templates;

public class UpdateTemplateUseCase
{
    private readonly ITemplateRepository _repository;

    public UpdateTemplateUseCase(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<TemplateDto> ExecuteAsync(Guid id, UpdateTemplateDto updateTemplateDto, CancellationToken cancellationToken)
    {
        var template = await _repository.GetByIdAsync(id, cancellationToken);
        if (template == null)
            throw new TemplateNotFoundException(id);

        template.UpdateContent(updateTemplateDto.Name, updateTemplateDto.HtmlContent);
        await _repository.UpdateAsync(template, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return new TemplateDto(template.Id, template.Name, template.HtmlContent, template.CreatedAt, template.UpdatedAt);
    }
}