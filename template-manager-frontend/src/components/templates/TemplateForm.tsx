import { useForm } from "react-hook-form";
import { Template } from '../../Template';

interface TemplateFormData {
  name: string;
  htmlContent: string;
}

interface TemplateFormProps {
  template?: Template;
  onSubmit: (data: TemplateFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  template,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateFormData>({
    defaultValues: template
      ? {
          name: template.name,
          htmlContent: template.htmlContent,
        }
      : {
          name: "",
          htmlContent: "",
        },
  });

  const sampleTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{Title}}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .content { line-height: 1.6; }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{Title}}</h1>
        <p>Date: {{Date}}</p>
    </div>
    <div class="content">
        <p>Dear {{Name}},</p>
        <p>{{Content}}</p>
        <p>Sincerely,<br>{{Signature}}</p>
    </div>
</body>
</html>`;

  const insertSample = () => {
    const textarea = document.getElementById(
      "htmlContent"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = sampleTemplate;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {template ? "Edit template" : "Create new template"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Template name *
          </label>
          <input
            {...register("name", {
              required: "Template name is required",
              minLength: {
                value: 2,
                message: "The name must contain at least 2 characters",
              },
            })}
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="For example: Notification letter"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="htmlContent"
              className="block text-sm font-medium text-gray-700"
            >
              HTML content *
            </label>
            {!template && (
              <button
                type="button"
                onClick={insertSample}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Insert example
              </button>
            )}
          </div>
          <textarea
            {...register("htmlContent", {
              required: "HTML content is required",
              minLength: {
                value: 10,
                message: "HTML content must contain at least 10 characters",
              },
            })}
            id="htmlContent"
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Enter HTML content with placeholders {{Name}}, {{Date}}, etc..."
            disabled={isSubmitting}
          />
          {errors.htmlContent && (
            <p className="mt-1 text-sm text-red-600">
              {errors.htmlContent.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Use placeholders in the format &#123;&#123;Name&#125;&#125; for data substitution.
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Save..." : template ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
