using Microsoft.EntityFrameworkCore;
using TemplateManager.Infrastructure.Data.Entities;

namespace TemplateManager.Infrastructure.Data;

public class TemplateManagerDbContext : DbContext
{
    public TemplateManagerDbContext(DbContextOptions<TemplateManagerDbContext> options) : base(options)
    { }

    public DbSet<TemplateEntity> Templates{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TemplateManagerDbContext).Assembly);
    }
}