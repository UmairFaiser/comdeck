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
  subject: string;
  subjectLabel: string;
}

export default function SubjectPageClient({
  resources,
  availableTypes,
  subject,
  subjectLabel,
}: SubjectPageClientProps) {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);

  return (
    <div className="min-h-screen bg-[oklch(0.10_0_0)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              <BackButton href="/" label="Back to Home" />
            </div>
            <h1 className="text-3xl font-bold text-[oklch(0.90_0_0)] justify-self-center text-center">
              {subjectLabel}
            </h1>
            <div />
          </div>
          <p className="mt-2 text-[oklch(0.60_0_0)] text-center">
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
          <div className="rounded-lg border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] p-8 text-center">
            <p className="text-[oklch(0.60_0_0)]">
              No resources available for this subject yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

