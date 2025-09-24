namespace TemplateManager.API.Constants;

public static class ApiRoutes
{
    private const string Root = "/";
    private const string ById = "/{id:guid}";

    public static class Templates
    {
        public const string Base = "/api/templates";
        public const string GetById = ById;
        public const string GetAll = Root;
        public const string Create = Root;
        public const string Update = ById;
        public const string Delete = ById;
    }

    public static class Pdf
    {
        public const string Base = "/api/pdf";
        public const string Generate = "/generate";
        public const string Validate = "/validate";
    }
}