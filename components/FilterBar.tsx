"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Subject, ResourceType, SUBJECT_LABELS, RESOURCE_TYPE_LABELS } from "@/lib/resources";

interface FilterBarProps {
  subjects?: Subject[];
  resourceTypes?: ResourceType[];
  years?: number[];
  showHasAnswers?: boolean;
  lecturers?: string[];
}

export default function FilterBar({
  subjects,
  resourceTypes,
  years,
  showHasAnswers = false,
  lecturers,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
    // Ensure server components re-render with updated search params
    router.refresh();
  };

  const currentSubject = searchParams.get("subject") || "";
  const currentType = searchParams.get("type") || "";
  const currentYear = searchParams.get("year") || "";
  const currentHasAnswers = searchParams.get("hasAnswers") || "";
  const currentLecturer = searchParams.get("lecturer") || "";

  return (
    <div className="flex flex-wrap gap-3">
      {subjects && subjects.length > 0 && (
        <select
          value={currentSubject}
          onChange={(e) => updateFilter("subject", e.target.value || null)}
          className="rounded border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {SUBJECT_LABELS[subject]}
            </option>
          ))}
        </select>
      )}

      {resourceTypes && resourceTypes.length > 0 && (
        <select
          value={currentType}
          onChange={(e) => updateFilter("type", e.target.value || null)}
          className="rounded border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">All Types</option>
          {resourceTypes.map((type) => (
            <option key={type} value={type}>
              {RESOURCE_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      )}

      {years && years.length > 0 && (
        <select
          value={currentYear}
          onChange={(e) => updateFilter("year", e.target.value || null)}
          className="rounded border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      )}

      {lecturers && lecturers.length > 0 && (
        <select
          value={currentLecturer}
          onChange={(e) => updateFilter("lecturer", e.target.value || null)}
          className="rounded border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">All Lecturers</option>
          {lecturers.map((name: string) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {showHasAnswers && (
        <div className="flex gap-2">
          <button
            onClick={() =>
              updateFilter("hasAnswers", currentHasAnswers === "true" ? null : "true")
            }
            className={`rounded border px-3 py-2 text-sm font-medium transition-colors ${
              currentHasAnswers === "true"
                ? "border-accent bg-accent-weak-bg text-accent"
                : "border-border bg-surface text-foreground hover:border-border-hover"
            }`}
          >
            Has Answers
          </button>
          <button
            onClick={() =>
              updateFilter("hasAnswers", currentHasAnswers === "false" ? null : "false")
            }
            className={`rounded border px-3 py-2 text-sm font-medium transition-colors ${
              currentHasAnswers === "false"
                ? "border-accent bg-accent-weak-bg text-accent"
                : "border-border bg-surface text-foreground hover:border-border-hover"
            }`}
          >
            No Answers
          </button>
        </div>
      )}
    </div>
  );
}

