"use client";

import { useState, useMemo } from "react";
import { Resource, ResourceType, Subject, getAvailableLecturers, getAvailableSeries } from "@/lib/resources";
import ResourceTypeTabs from "@/components/ResourceTypeTabs";
import SearchBar from "@/components/SearchBar";
import BackButton from "@/components/BackButton";
import ResourceList from "@/components/ResourceList";
import CollapsibleFilter from "@/components/CollapsibleFilter";

interface SubjectPageClientProps {
  resources: Resource[];
  availableTypes: ResourceType[];
  subjectLabel: string;
  subject: Subject;
}

export default function SubjectPageClient({
  resources,
  availableTypes,
  subjectLabel,
  subject,
}: SubjectPageClientProps) {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  // Get available lecturers and series (only for non-past-paper types, or for "All" section)
  const availableLecturers = useMemo(() => {
    if (selectedType && (selectedType === "past-papers" || selectedType === "past-paper-answers")) {
      return [];
    }
    return getAvailableLecturers(subject, selectedType || undefined);
  }, [subject, selectedType]);

  const availableSeries = useMemo(() => {
    if (selectedType && (selectedType === "past-papers" || selectedType === "past-paper-answers")) {
      return [];
    }
    return getAvailableSeries(subject, selectedType || undefined);
  }, [subject, selectedType]);

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
              onTypeSelect={(type) => {
                setSelectedType(type);
                setSelectedLecturer(null); // Reset filters when type changes
                setSelectedSeries(null);
              }}
            />
            
            {/* Collapsible filter - show for all sections except past-papers */}
            {(availableLecturers.length > 0 || availableSeries.length > 0) && (
              <CollapsibleFilter
                lecturers={availableLecturers}
                series={availableSeries}
                currentLecturer={selectedLecturer}
                currentSeries={selectedSeries}
                subject={subject}
                resourceType={selectedType}
                onLecturerSelect={setSelectedLecturer}
                onSeriesSelect={setSelectedSeries}
              />
            )}
            
            <ResourceList 
              resources={resources} 
              selectedType={selectedType}
              selectedLecturer={selectedLecturer}
              selectedSeries={selectedSeries}
            />
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

