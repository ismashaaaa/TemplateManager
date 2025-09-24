using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TemplateManager.Infrastructure.Data.Entities;

namespace TemplateManager.Infrastructure.Data.Configurations;

public class TemplateConfiguration : IEntityTypeConfiguration<TemplateEntity>
{
    public void Configure(EntityTypeBuilder<TemplateEntity> builder)
    {
        builder.HasKey(template => template.Id);

        builder.Property(template => template.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(template => template.HtmlContent)
            .IsRequired();

        builder.Property(template => template.CreatedAt)
            .IsRequired();
    }
}