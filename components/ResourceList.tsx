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

  // Group videos by chapter and sort by day when viewing videos
  const isVideosView = (selectedType && selectedType === "videos") ||
    (!selectedType && filteredResources.every((r) => r.type === "videos"));

  if (isVideosView) {
    const groups = new Map<string, Resource[]>();
    for (const r of filteredResources) {
      const key = r.chapter || "Ungrouped";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(r);
    }

    const sortedGroups = Array.from(groups.entries()).map(([chapter, items]) => {
      items.sort((a, b) => {
        const aDay = a.day ?? Number.MAX_SAFE_INTEGER;
        const bDay = b.day ?? Number.MAX_SAFE_INTEGER;
        if (aDay !== bDay) return aDay - bDay;
        return a.title.localeCompare(b.title);
      });
      return { chapter, items };
    });

    return (
      <div className="mt-8 space-y-6">
        {sortedGroups.map(({ chapter, items }) => (
          <section key={chapter}>
            <div className="rounded-lg border border-border bg-surface p-4">
              <h2 className="mb-3 text-xl font-semibold text-foreground">
                {chapter}
                {items[0]?.series && (
                  <span className="ml-2 text-sm text-text-secondary">({items[0].series})</span>
                )}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    showLinkedPaper={true}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
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
