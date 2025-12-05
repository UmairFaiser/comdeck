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
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        <button
          onClick={() => onTypeSelect(null)}
          className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
            selectedType === null
              ? "border-accent text-accent"
              : "border-transparent text-text-secondary hover:border-border-hover hover:text-foreground"
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
                  ? "border-accent text-accent"
                  : "border-transparent text-text-secondary hover:border-border-hover hover:text-foreground"
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

