import { Template } from "../../Template";

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
  onGeneratePdf: (template: Template) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
  onGeneratePdf,
}) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateHtml = (html: string, maxLength: number = 100): string => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No templates created</div>
        <p className="text-gray-400">
          Create your first template to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {template.name}
              </h3>
              <div className="flex space-x-1">
                <button
                  onClick={() => onEdit(template)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">HTML content:</div>
              <div className="bg-gray-50 p-3 rounded text-xs font-mono max-h-20 overflow-y-auto">
                {truncateHtml(template.htmlContent)}
              </div>
            </div>

            <div className="mb-4 text-xs text-gray-500">
              <div>Created: {formatDate(template.createdAt)}</div>
              <div>Updated: {formatDate(template.updatedAt)}</div>
            </div>

            <button
              onClick={() => onGeneratePdf(template)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Generate PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
