"use client";

import { useState } from "react";
import { Resource, ResourceType } from "@/lib/resources";
import ResourceTypeTabs from "@/components/ResourceTypeTabs";
import SearchBar from "@/components/SearchBar";
import BackButton from "@/components/BackButton";
import ResourceList from "@/components/ResourceList";

interface SubjectPageClientProps {
  resources: Resource[];
  availableTypes: ResourceType[];
  subjectLabel: string;
}

export default function SubjectPageClient({
  resources,
  availableTypes,
  subjectLabel,
}: SubjectPageClientProps) {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <BackButton href="/" label="Back to Home" />
            </div>
            <h1 className="text-3xl font-bold text-foreground justify-self-center text-center">
              {subjectLabel}
            </h1>
            <div />
          </div>
          <p className="mt-2 text-text-secondary text-center">
            {resources.length} resource{resources.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </header>

        <div className="mb-8">
          <SearchBar placeholder={`Search ${subjectLabel} resources...`} />
        </div>

        {availableTypes.length > 0 ? (
          <>
            <ResourceTypeTabs
              availableTypes={availableTypes}
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />
            <ResourceList resources={resources} selectedType={selectedType} />
          </>
        ) : (
          <div className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="text-text-secondary">
              No resources available for this subject yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

