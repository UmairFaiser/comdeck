export type Subject = "economics" | "ict" | "accounting" | "business-studies";

export type ResourceType =
  | "notes"
  | "short-notes"
  | "past-papers"
  | "past-paper-answers"
  | "provincial-papers"
  | "unit-papers"
  | "model-papers";

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
}

export interface ResourceFilters {
  subject?: Subject;
  type?: ResourceType;
  year?: number;
  hasAnswers?: boolean;
  searchQuery?: string;
}

