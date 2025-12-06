import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getResourcesByType,
  getAvailableYears,
  getAvailableLecturers,
  SUBJECTS,
  RESOURCE_TYPES,
  SUBJECT_LABELS,
  RESOURCE_TYPE_LABELS,
  type Subject,
  type ResourceType,
} from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";
import FilterBar from "@/components/FilterBar";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/ui/spinner";

interface ResourceTypePageProps {
  params: Promise<{ subject: string; resourceType: string }>;
  searchParams: Promise<{ year?: string; id?: string }>;
}

export default async function ResourceTypePage({
  params,
  searchParams,
}: ResourceTypePageProps) {
  const { subject, resourceType } = await params;
  const { year, id } = await searchParams;

  const subjectKey = subject as Subject;
  const typeKey = resourceType as ResourceType;

  if (
    !SUBJECTS.includes(subjectKey) ||
    !RESOURCE_TYPES.includes(typeKey)
  ) {
    notFound();
  }

  let resources = getResourcesByType(subjectKey, typeKey);
  const availableYears = getAvailableYears(subjectKey, typeKey);
  const availableLecturers = getAvailableLecturers(subjectKey, typeKey);

  // Filter by year if provided
  if (year) {
    const yearNum = parseInt(year, 10);
    resources = resources.filter((r) => r.year === yearNum);
  }

  // If a specific resource ID is provided, show only that resource
  if (id) {
    resources = resources.filter((r) => r.id === id);
  }

  const subjectLabel = SUBJECT_LABELS[subjectKey];
  const typeLabel = RESOURCE_TYPE_LABELS[typeKey];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <BackButton href={`/${subject}`} label={`Back to ${subjectLabel}`} />
            </div>
            <h1 className="text-3xl font-bold text-foreground text-center">
              {typeLabel}
            </h1>
            <div />
          </div>

          <p className="mt-2 text-text-secondary text-center">
            {resources.length} resource{resources.length !== 1 ? "s" : ""}
          </p>
        </header>


        <div className="mt-8">
          {availableYears.length > 0 && (
            <div className="mb-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-6">
                    <Spinner variant="ring" className="text-text-tertiary" />
                  </div>
                }
              >
                <FilterBar years={availableYears} lecturers={availableLecturers} />
              </Suspense>
            </div>
          )}

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  showLinkedPaper={true}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-surface p-8 text-center">
              <p className="text-text-secondary">
                No resources found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

