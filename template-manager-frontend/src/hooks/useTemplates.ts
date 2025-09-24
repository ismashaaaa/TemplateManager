import { useState, useEffect } from 'react';
import { Template, CreateTemplateRequest, UpdateTemplateRequest } from '../Template';
import { TemplateService } from '../services/api';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TemplateService.getAllTemplates();
      setTemplates(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const createTemplate = async (template: CreateTemplateRequest): Promise<Template> => {
    try {
      const newTemplate = await TemplateService.createTemplate(template);
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create template');
    }
  };

  const updateTemplate = async (id: string, template: UpdateTemplateRequest): Promise<Template> => {
    try {
      const updatedTemplate = await TemplateService.updateTemplate(id, template);
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t));
      return updatedTemplate;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update template');
    }
  };

  const deleteTemplate = async (id: string): Promise<void> => {
    try {
      await TemplateService.deleteTemplate(id);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete template');
    }
  };

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};