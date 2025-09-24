import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  GeneratePdfRequest,
  Template,
  TemplateValidationResult,
} from "../../Template";
import { TemplateService } from "../../services/api";

interface PdfGeneratorModalProps {
  template: Template;
  onClose: () => void;
  onGenerate: (request: GeneratePdfRequest) => Promise<void>;
}

const PdfGeneratorModal: React.FC<PdfGeneratorModalProps> = ({
  template,
  onClose,
  onGenerate,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [validation, setValidation] = useState<TemplateValidationResult | null>(
    null
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jsonData:
        '{\n  "Name": "Іван Іваненко",\n  "Date": "2025-09-24",\n  "Title": "Важливе повідомлення",\n  "Content": "Це приклад контенту для вашого документа.",\n  "Signature": "Компанія ABC"\n}',
    },
  });

  const jsonData = watch("jsonData");

  const extractPlaceholders = (html: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1]);
    }
    return Array.from(new Set(matches));
  };

  const validateJson = async (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      setJsonError(null);

      // Validate with API
      const validationResult = await TemplateService.validateTemplate({
        templateId: template.id,
        data,
      });
      setValidation(validationResult);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setJsonError("Невірний JSON формат");
      } else {
        setJsonError("Помилка валідації");
      }
      setValidation(null);
    }
  };

  const handleGenerate = async (formData: { jsonData: string }) => {
    try {
      setIsGenerating(true);
      const data = JSON.parse(formData.jsonData);
      await onGenerate({
        templateId: template.id,
        data,
      });
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const placeholders = extractPlaceholders(template.htmlContent);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">PDF Generation</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Template: {template.name}
            </h3>
            {placeholders.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Available placeholders:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {placeholders.map((placeholder) => (
                    <span
                      key={placeholder}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      &#123;&#123;{placeholder}&#125;&#125;
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(handleGenerate)} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  JSON data for substitution *
                </label>
                <button
                  type="button"
                  onClick={() => validateJson(jsonData)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                  disabled={isGenerating}
                >
                  Validate data
                </button>
              </div>
              <textarea
                {...register("jsonData", {
                  required: "JSON data is required",
                  validate: (value) => {
                    try {
                      JSON.parse(value);
                      return true;
                    } catch {
                      return "Invalid JSON format";
                    }
                  },
                })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder='{"Name": "John Doe", "Date": "2025-09-24"}'
                disabled={isGenerating}
              />
              {errors.jsonData && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.jsonData.message}
                </p>
              )}
              {jsonError && (
                <p className="mt-1 text-sm text-red-600">{jsonError}</p>
              )}
            </div>

            {validation && (
              <div
                className={`p-4 rounded-lg ${
                  validation.isValid
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div
                  className={`font-medium ${
                    validation.isValid ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {validation.isValid
                    ? "✓ Data is valid"
                    : "✗ Data contains errors"}
                </div>
                {!validation.isValid &&
                  validation.missingPlaceholders.length > 0 && (
                    <div className="mt-2 text-sm text-red-700">
                      <div>Missing required fields:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {validation.missingPlaceholders.map((placeholder) => (
                          <span
                            key={placeholder}
                            className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded"
                          >
                            &#123;&#123;{placeholder}&#125;&#125;
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate PDF"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PdfGeneratorModal;
