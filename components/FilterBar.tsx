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
          className="rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] px-3 py-2 text-sm text-[oklch(0.90_0_0)] transition-colors focus:border-[oklch(0.55_0.15_250)] focus:outline-none"
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
          className="rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] px-3 py-2 text-sm text-[oklch(0.90_0_0)] transition-colors focus:border-[oklch(0.55_0.15_250)] focus:outline-none"
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
          className="rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] px-3 py-2 text-sm text-[oklch(0.90_0_0)] transition-colors focus:border-[oklch(0.55_0.15_250)] focus:outline-none"
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
          className="rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] px-3 py-2 text-sm text-[oklch(0.90_0_0)] transition-colors focus:border-[oklch(0.55_0.15_250)] focus:outline-none"
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
                ? "border-[oklch(0.55_0.15_250)] bg-[oklch(0.12_0.05_250)] text-[oklch(0.55_0.15_250)]"
                : "border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] text-[oklch(0.90_0_0)] hover:border-[oklch(0.30_0_0)]"
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
                ? "border-[oklch(0.55_0.15_250)] bg-[oklch(0.12_0.05_250)] text-[oklch(0.55_0.15_250)]"
                : "border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] text-[oklch(0.90_0_0)] hover:border-[oklch(0.30_0_0)]"
            }`}
          >
            No Answers
          </button>
        </div>
      )}
    </div>
  );
}

