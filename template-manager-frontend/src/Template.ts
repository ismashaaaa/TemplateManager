export interface Template {
  id: string;
  name: string;
  htmlContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateRequest {
  name: string;
  htmlContent: string;
}

export interface UpdateTemplateRequest {
  name: string;
  htmlContent: string;
}

export interface GeneratePdfRequest {
  templateId: string;
  data: Record<string, any>;
}

export interface TemplateValidationResult {
  isValid: boolean;
  requiredPlaceholders: string[];
  missingPlaceholders: string[];
}

export interface ApiError {
  message: string;
  details?: string;
}