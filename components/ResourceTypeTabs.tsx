"use client";

import { ResourceType, RESOURCE_TYPE_LABELS } from "@/lib/resources";


interface ResourceTypeTabsProps {
  availableTypes: ResourceType[];
  selectedType: ResourceType | null;
  onTypeSelect: (type: ResourceType | null) => void;
}

export default function ResourceTypeTabs({
  availableTypes,
  selectedType,
  onTypeSelect,
}: ResourceTypeTabsProps) {
  return (
    <div className="border-b border-[oklch(0.20_0_0)]">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        <button
          onClick={() => onTypeSelect(null)}
          className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
            selectedType === null
              ? "border-[oklch(0.55_0.15_250)] text-[oklch(0.55_0.15_250)]"
              : "border-transparent text-[oklch(0.60_0_0)] hover:border-[oklch(0.30_0_0)] hover:text-[oklch(0.90_0_0)]"
          }`}
        >
          All
        </button>
        {availableTypes.map((type) => {
          const isActive = selectedType === type;

          return (
            <button
              key={type}
              onClick={() => onTypeSelect(type)}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[oklch(0.55_0.15_250)] text-[oklch(0.55_0.15_250)]"
                  : "border-transparent text-[oklch(0.60_0_0)] hover:border-[oklch(0.30_0_0)] hover:text-[oklch(0.90_0_0)]"
              }`}
            >
              {RESOURCE_TYPE_LABELS[type]}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

