using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Exceptions;

namespace TemplateManager.Application.UseCases.Templates;

public class DeleteTemplateUseCase
{
    private readonly ITemplateRepository _repository;

    public DeleteTemplateUseCase(ITemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task ExecuteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        if (!await _repository.ExistsAsync(id, cancellationToken))
            throw new TemplateNotFoundException(id);

        await _repository.DeleteAsync(id, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
    }
}