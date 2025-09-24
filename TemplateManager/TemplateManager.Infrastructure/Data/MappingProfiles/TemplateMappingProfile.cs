using AutoMapper;
using TemplateManager.Domain.Entities;
using TemplateManager.Infrastructure.Data.Entities;

namespace TemplateManager.Infrastructure.Data.MappingProfiles;

public class TemplateMappingProfile : Profile
{
    public TemplateMappingProfile()
    {
        CreateMap<Template, TemplateEntity>().ReverseMap();
    }
}