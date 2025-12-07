"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Subject, ResourceType } from "@/lib/resources";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

interface LecturerFilterProps {
  lecturers: string[];
  currentLecturer: string;
  subject: Subject;
  resourceType: ResourceType;
  onLecturerSelect?: (lecturer: string | null) => void;
}

export default function LecturerFilter({
  lecturers,
  currentLecturer,
  subject,
  resourceType,
  onLecturerSelect,
}: LecturerFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilter = (lecturer: string | null) => {
    // If onLecturerSelect is provided, use it (for client-side filtering)
    if (onLecturerSelect) {
      onLecturerSelect(lecturer);
      return;
    }
    
    // Otherwise, use URL-based filtering
    const params = new URLSearchParams(searchParams.toString());
    if (lecturer) {
      params.set("lecturer", lecturer);
    } else {
      params.delete("lecturer");
    }
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2 mb-3">
        <HugeiconsIcon
          icon={UserIcon}
          size={18}
          className="text-accent"
        />
        <h3 className="text-sm font-semibold text-foreground">Filter by Lecturer</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateFilter(null)}
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
            onClick={() => updateFilter(lecturer)}
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
  );
}

