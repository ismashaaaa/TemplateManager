using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TemplateManager.Application.Interfaces.Repositories;
using TemplateManager.Domain.Entities;
using TemplateManager.Infrastructure.Data;
using TemplateManager.Infrastructure.Data.Entities;

namespace TemplateManager.Infrastructure.Repositories;

public class TemplateRepository : ITemplateRepository
{
    private readonly TemplateManagerDbContext _dbContext;
    private readonly IMapper _mapper;

    public TemplateRepository(TemplateManagerDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<Template> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var templates = await _dbContext.Templates
                .AsNoTracking()
                .FirstOrDefaultAsync(template => template.Id == id, cancellationToken);

        return _mapper.Map<Template>(templates);
    }

    public async Task<IEnumerable<Template>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Templates
               .ProjectTo<Template>(_mapper.ConfigurationProvider)
               .AsNoTracking()
               .ToListAsync(cancellationToken);
    }


    public async Task AddAsync(Template template, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<TemplateEntity>(template);

        await _dbContext.Templates.AddAsync(entity, cancellationToken);
    }

    public async Task UpdateAsync(Template template, CancellationToken cancellationToken)
    {
        var existingTemplate = await _dbContext.Templates
            .FindAsync(template.Id, cancellationToken);

        if (existingTemplate == null)
            return;

        _mapper.Map(template, existingTemplate);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var existingTemplate = await _dbContext.Templates
            .FindAsync(id, cancellationToken);

        if (existingTemplate == null)
            return;

        _dbContext.Templates.Remove(existingTemplate);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Templates.AnyAsync(templateEntity => templateEntity.Id == id, cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}