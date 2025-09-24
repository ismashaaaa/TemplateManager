import axios, { AxiosResponse } from 'axios';
import { Template, CreateTemplateRequest, UpdateTemplateRequest, GeneratePdfRequest, TemplateValidationResult } from '../Template';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class TemplateService {
  static async getAllTemplates(): Promise<Template[]> {
    const response: AxiosResponse<Template[]> = await apiClient.get('/templates');
    return response.data;
  }

  static async getTemplateById(id: string): Promise<Template> {
    const response: AxiosResponse<Template> = await apiClient.get(`/templates/${id}`);
    return response.data;
  }

  static async createTemplate(template: CreateTemplateRequest): Promise<Template> {
    const response: AxiosResponse<Template> = await apiClient.post('/templates', template);
    return response.data;
  }

  static async updateTemplate(id: string, template: UpdateTemplateRequest): Promise<Template> {
    const response: AxiosResponse<Template> = await apiClient.put(`/templates/${id}`, template);
    return response.data;
  }

  static async deleteTemplate(id: string): Promise<void> {
    await apiClient.delete(`/templates/${id}`);
  }

  static async generatePdf(request: GeneratePdfRequest): Promise<Blob> {
    const response = await apiClient.post('/pdf/generate', request, {
      responseType: 'blob',
    });
    return new Blob([response.data], { type: 'application/pdf' });
  }

  static async validateTemplate(request: GeneratePdfRequest): Promise<TemplateValidationResult> {
    const response: AxiosResponse<TemplateValidationResult> = await apiClient.post('/pdf/validate', request);
    return response.data;
  }
}