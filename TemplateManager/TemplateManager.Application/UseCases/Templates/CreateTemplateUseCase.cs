using TemplateManager.Application.DTOs;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Entities;

namespace TemplateManager.Application.UseCases.Templates;

public class CreateTemplateUseCase
{
    private readonly ITemplateRepository _repository;

    public CreateTemplateUseCase(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<TemplateDto> ExecuteAsync(CreateTemplateDto createTemplateDto, CancellationToken cancellationToken)
    {
        var template = new Template(createTemplateDto.Name, createTemplateDto.HtmlContent);
        await _repository.AddAsync(template, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return new TemplateDto(template.Id, template.Name, template.HtmlContent, template.CreatedAt, template.UpdatedAt);
    }
}