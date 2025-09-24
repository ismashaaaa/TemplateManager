using TemplateManager.Domain.Entities;

namespace TemplateManager.Application.Interfaces.Repositories;

public interface ITemplateRepository
{
    Task<Template> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IEnumerable<Template>> GetAllAsync(CancellationToken cancellationToken);

    Task AddAsync(Template template, CancellationToken cancellationToken);

    Task UpdateAsync(Template template, CancellationToken cancellationToken);

    Task DeleteAsync(Guid id, CancellationToken cancellationToken);

    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}