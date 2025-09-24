import { useState } from "react";
import { useTemplates } from "../../hooks/useTemplates";
import TemplateList from "../templates/TemplateList";
import TemplateForm from "../templates/TemplateForm";
import PdfGeneratorModal from "../pdf/PdfGeneratorModal";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import { Template, GeneratePdfRequest } from '../../Template';
import { TemplateService } from '../../services/api';

interface TemplateFormData {
  name: string;
  htmlContent: string;
}

const TemplatesPage: React.FC = () => {
  const {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useTemplates();

  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setShowForm(true);
    setFormError(null);
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setShowForm(true);
    setFormError(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTemplate(null);
    setFormError(null);
  };

  const handleSubmitForm = async (data: TemplateFormData) => {
    try {
      setIsSubmitting(true);
      setFormError(null);

      if (editingTemplate) {
  await updateTemplate(editingTemplate.id, data);
  setSuccessMessage("Template updated successfully!");
      } else {
  await createTemplate(data);
  setSuccessMessage("Template created successfully!");
      }

      handleCloseForm();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this template?")) {
      return;
    }

    try {
      await deleteTemplate(id);
  setSuccessMessage("Template deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
  alert(`Error deleting: ${err.message}`);
    }
  };

  const handleGeneratePdf = (template: Template) => {
    setSelectedTemplate(template);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setSelectedTemplate(null);
  };

  const handlePdfGenerate = async (request: GeneratePdfRequest) => {
    try {
      const pdfBlob = await TemplateService.generatePdf(request);

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedTemplate?.name || "template"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

  setSuccessMessage("PDF generated and downloaded successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      alert(
        `Error generating PDF: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (loading && templates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Template Management
              </h1>
              <p className="mt-2 text-gray-600">
                Create and manage HTML templates for generating PDF documents
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              + Create new template
            </button>
          </div>
        </div>

        {successMessage && (
          <SuccessMessage
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        {error && <ErrorMessage message={error} onRetry={fetchTemplates} />}

        {!showForm ? (
          <TemplateList
            templates={templates}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onGeneratePdf={handleGeneratePdf}
          />
        ) : (
          <div>
            {formError && (
              <ErrorMessage
                message={formError}
                onRetry={() => setFormError(null)}
              />
            )}
            <TemplateForm
              template={editingTemplate || undefined}
              onSubmit={handleSubmitForm}
              onCancel={handleCloseForm}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {showPdfModal && selectedTemplate && (
          <PdfGeneratorModal
            template={selectedTemplate}
            onClose={handleClosePdfModal}
            onGenerate={handlePdfGenerate}
          />
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
