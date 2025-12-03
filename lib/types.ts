export type Subject = "economics" | "ict" | "accounting" | "business-studies";

export type ResourceType =
  | "notes"
  | "short-notes"
  | "past-papers"
  | "past-paper-answers"
  | "provincial-papers"
  | "unit-papers"
  | "model-papers"
  | "school-papers"
  | "school-paper-answers";

export interface Resource {
  id: string;
  subject: Subject;
  type: ResourceType;
  year?: number;
  title: string;
  filePath: string;
  linkedPaperId?: string; // For answers that link to a question paper
  hasAnswers?: boolean; // For papers that may have answers
  description?: string;
  lecturer?: string; // Display name, e.g., "Lakshitha Sir"
  school?: string; // For school-level papers, e.g., "St Joseph's"
}

export interface ResourceFilters {
  subject?: Subject;
  type?: ResourceType;
  year?: number;
  hasAnswers?: boolean;
  searchQuery?: string;
  lecturer?: string; // Filter by lecturer display name
}

