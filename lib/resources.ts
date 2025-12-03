import {
  Resource,
  ResourceFilters,
  Subject,
  ResourceType,
} from "./types";
import resourcesData from "../data/resources.json";

// Re-export types for convenience
export type { Resource, ResourceFilters, Subject, ResourceType };

const allResources: Resource[] = resourcesData.resources as Resource[];

export function getAllResources(): Resource[] {
  return allResources;
}

export function getResourcesBySubject(subject: Subject): Resource[] {
  return allResources.filter((r) => r.subject === subject);
}

export function getResourcesByType(
  subject: Subject,
  type: ResourceType
): Resource[] {
  return allResources.filter(
    (r) => r.subject === subject && r.type === type
  );
}

export function getResourceById(id: string): Resource | undefined {
  return allResources.find((r) => r.id === id);
}

export function getLinkedResource(resource: Resource): Resource | undefined {
  if (resource.linkedPaperId) {
    return getResourceById(resource.linkedPaperId);
  }
  return undefined;
}

// Find answer resources that link to a given paper
export function getAnswerResources(paperId: string): Resource[] {
  return allResources.filter(
    (r) =>
      r.linkedPaperId === paperId &&
      (r.type === "past-paper-answers" ||
        r.type === "provincial-papers" ||
        r.type === "unit-papers" ||
        r.type === "model-papers")
  );
}

// Find the first answer resource for a paper (for quick navigation)
export function getAnswerResource(paperId: string): Resource | undefined {
  const answers = getAnswerResources(paperId);
  return answers.length > 0 ? answers[0] : undefined;
}

export function filterResources(filters: ResourceFilters): Resource[] {
  let filtered = [...allResources];

  if (filters.subject) {
    filtered = filtered.filter((r) => r.subject === filters.subject);
  }

  if (filters.type) {
    filtered = filtered.filter((r) => r.type === filters.type);
  }

  if (filters.year !== undefined) {
    filtered = filtered.filter((r) => r.year === filters.year);
  }

  if (filters.hasAnswers !== undefined) {
    filtered = filtered.filter((r) => r.hasAnswers === filters.hasAnswers);
  }

  if (filters.searchQuery) {
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[\-_\/]/g, " ")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const tokenize = (text: string) => normalize(text).split(" ").filter(Boolean);

    const tokens = tokenize(filters.searchQuery);

    filtered = filtered.filter((r) => {
      const searchTextParts = [
        r.title,
        r.description ?? "",
        r.subject,
        r.type,
        r.year ? String(r.year) : "",
        r.id,
      ];
      const searchText = normalize(searchTextParts.join(" "));

      // All query tokens must be present somewhere in the resource's searchable text
      return tokens.every((t) => {
        // Simple plural/variant normalization for common terms
        const variants = new Set<string>([t]);
        if (t === "note") variants.add("notes");
        if (t === "answer") variants.add("answers");
        if (t === "paper") variants.add("papers");
        if (t === "pastpaper") variants.add("past paper");
        if (t === "shortnotes") variants.add("short notes");

        // Match if any variant appears in the search text
        return Array.from(variants).some((v) => searchText.includes(v));
      });
    });
  }

  return filtered;
}

export function searchResources(query: string): Resource[] {
  return filterResources({ searchQuery: query });
}

export function getAvailableYears(
  subject?: Subject,
  type?: ResourceType
): number[] {
  let filtered = allResources;

  if (subject) {
    filtered = filtered.filter((r) => r.subject === subject);
  }

  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }

  const years = filtered
    .map((r) => r.year)
    .filter((y): y is number => y !== undefined)
    .sort((a, b) => b - a);

  return Array.from(new Set(years));
}

export function getResourceTypesForSubject(subject: Subject): ResourceType[] {
  const types = allResources
    .filter((r) => r.subject === subject)
    .map((r) => r.type);

  return Array.from(new Set(types)) as ResourceType[];
}

export const SUBJECTS: Subject[] = [
  "economics",
  "ict",
  "accounting",
  "business-studies",
];

export const RESOURCE_TYPES: ResourceType[] = [
  "notes",
  "short-notes",
  "past-papers",
  "past-paper-answers",
  "provincial-papers",
  "unit-papers",
  "model-papers",
];

export const SUBJECT_LABELS: Record<Subject, string> = {
  economics: "Economics",
  ict: "ICT",
  accounting: "Accounting",
  "business-studies": "Business Studies",
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  notes: "Notes",
  "short-notes": "Short Notes",
  "past-papers": "Past Papers",
  "past-paper-answers": "Past Paper Answers",
  "provincial-papers": "Provincial Papers",
  "unit-papers": "Unit Papers",
  "model-papers": "Model Papers",
};

