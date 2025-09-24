using TemplateManager.API.Endpoints;
using TemplateManager.API.Middleware;
using TemplateManager.Application.Extensions;
using TemplateManager.Infrastructure.Data.MappingProfiles;
using TemplateManager.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddDatabase(builder.Configuration)
    .AddRepositories()
    .AddApplicationUseCases()
    .AddServices();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddAutoMapper(configuration => configuration.AddProfile<TemplateMappingProfile>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapTemplateEndpoints();
app.MapPdfEndpoints();

app.Run();
