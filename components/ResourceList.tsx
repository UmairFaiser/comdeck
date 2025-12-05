"use client";

import { Resource, ResourceType } from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";

interface ResourceListProps {
  resources: Resource[];
  selectedType: ResourceType | null;
}

export default function ResourceList({
  resources,
  selectedType,
}: ResourceListProps) {
  const filteredResources = selectedType
    ? resources.filter((r) => r.type === selectedType)
    : resources;

  if (filteredResources.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-text-secondary">
          No resources found for the selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            showLinkedPaper={true}
          />
        ))}
      </div>
    </div>
  );
}

