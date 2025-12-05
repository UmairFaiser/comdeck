import { Suspense } from "react";
import {
  filterResources,
  SUBJECTS,
  RESOURCE_TYPES,
  SUBJECT_LABELS,
  RESOURCE_TYPE_LABELS,
  type ResourceFilters,
} from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/ui/spinner";
import { getAvailableYears, getAvailableLecturers } from "@/lib/resources";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    subject?: string;
    type?: string;
    year?: string;
    hasAnswers?: string;
    lecturer?: string;
  }>;
}

function SearchResults({ searchParams }: SearchPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-8">
          <Spinner variant="ellipsis" className="text-text-tertiary" />
        </div>
      }
    >
      <SearchResultsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchResultsContent({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { q, subject, type, year, hasAnswers, lecturer } = params;

  const filters: ResourceFilters = {};

  if (q) {
    filters.searchQuery = q;
  }
  if (subject && SUBJECTS.includes(subject as any)) {
    filters.subject = subject as any;
  }
  if (type && RESOURCE_TYPES.includes(type as any)) {
    filters.type = type as any;
  }
  if (year) {
    filters.year = parseInt(year, 10);
  }
  if (hasAnswers === "true") {
    filters.hasAnswers = true;
  } else if (hasAnswers === "false") {
    filters.hasAnswers = false;
  }
  if (lecturer) {
    filters.lecturer = lecturer;
  }

  const results = filterResources(filters);
  // Scope filter options based on the currently selected subject/type
  const availableYears = getAvailableYears(filters.subject, filters.type);
  const availableLecturers = getAvailableLecturers(filters.subject, filters.type);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <BackButton href="/" label="Back to Home" />
            </div>
            <h1 className="justify-self-center text-3xl font-bold text-foreground">
              Search Results
            </h1>
            <div />
          </div>
          {q && (
            <p className="mt-2 text-text-secondary text-center">
              {results.length} result{results.length !== 1 ? "s" : ""} for "
              {q}"
            </p>
          )}
        </header>

        <div className="mb-8">
          <SearchBar defaultValue={q || ""} />
        </div>

        <div className="mb-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-6">
                <Spinner variant="ring" className="text-text-tertiary" />
              </div>
            }
          >
            <FilterBar
              subjects={SUBJECTS}
              resourceTypes={RESOURCE_TYPES}
              years={availableYears}
              showHasAnswers={true}
              lecturers={availableLecturers}
            />
          </Suspense>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                showLinkedPaper={true}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-[oklch(0.60_0_0)]">
              No resources found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

