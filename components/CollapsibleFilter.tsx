"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon, FilterIcon, ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

interface CollapsibleFilterProps {
  lecturers: string[];
  series: string[];
  currentLecturer: string | null;
  currentSeries: string | null;
  onLecturerSelect?: (lecturer: string | null) => void;
  onSeriesSelect?: (series: string | null) => void;
}

export default function CollapsibleFilter({
  lecturers,
  series,
  currentLecturer,
  currentSeries,
  onLecturerSelect,
  onSeriesSelect,
}: CollapsibleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasFilters = lecturers.length > 0 || series.length > 0;
  const hasActiveFilter = currentLecturer || currentSeries;
  const [isExpanded, setIsExpanded] = useState(!!hasActiveFilter);

  const updateFilter = (key: string, value: string | null) => {
    // If callbacks are provided, use them (for client-side filtering)
    if (key === "lecturer" && onLecturerSelect) {
      onLecturerSelect(value);
      return;
    }
    if (key === "series" && onSeriesSelect) {
      onSeriesSelect(value);
      return;
    }

    // Otherwise, use URL-based filtering
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  if (!hasFilters) return null;

  return (
    <div className="mt-6 mb-6 rounded-lg border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={FilterIcon}
            size={18}
            className="text-accent"
          />
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {hasActiveFilter && (
            <span className="px-2 py-0.5 rounded-full bg-accent-weak-bg text-accent text-xs font-medium">
              Active
            </span>
          )}
        </div>
        <HugeiconsIcon
          icon={isExpanded ? ArrowUp01Icon : ArrowDown01Icon}
          size={20}
          className="text-text-secondary transition-transform duration-300"
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-6">
          {/* Lecturer Filter */}
          {lecturers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mt-4 mb-2">
                <HugeiconsIcon
                  icon={UserIcon}
                  size={16}
                  className="text-accent"
                />
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Lecturer
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter("lecturer", null)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                    !currentLecturer
                      ? "border-accent bg-accent-weak-bg text-accent"
                      : "border-border bg-background text-foreground hover:border-border-hover"
                  }`}
                >
                  All Lecturers
                </button>
                {lecturers.map((lecturer) => (
                  <button
                    key={lecturer}
                    onClick={() => updateFilter("lecturer", lecturer)}
                    className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      currentLecturer === lecturer
                        ? "border-accent bg-accent-weak-bg text-accent"
                        : "border-border bg-background text-foreground hover:border-border-hover"
                    }`}
                  >
                    {lecturer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Series Filter */}
          {series.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HugeiconsIcon
                  icon={FilterIcon}
                  size={16}
                  className="text-accent"
                />
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Series
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter("series", null)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                    !currentSeries
                      ? "border-accent bg-accent-weak-bg text-accent"
                      : "border-border bg-background text-foreground hover:border-border-hover"
                  }`}
                >
                  All Series
                </button>
                {series.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateFilter("series", s)}
                    className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                      currentSeries === s
                        ? "border-accent bg-accent-weak-bg text-accent"
                        : "border-border bg-background text-foreground hover:border-border-hover"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

