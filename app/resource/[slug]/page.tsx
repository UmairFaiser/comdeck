'use client';

import { notFound, useSearchParams } from 'next/navigation';

import { createSlug } from '@/lib/utils';
import React from 'react';
import ResourceCard from '@/components/ResourceCard';
import { getAllResources, getRandomResources, SUBJECT_LABELS } from '@/lib/resources';

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default function ResourcePage({ params: paramsPromise }: ResourcePageProps) {
  const params = React.use(paramsPromise);
  const resources = getAllResources();
  const searchParams = useSearchParams();
  const resourceId = searchParams.get('id');


  const resource = resources.find((r) => {
    const resourceSlug = createSlug(r.title);
    return resourceSlug === params.slug && r.id === resourceId;
  });

  if (!resource) {

    notFound();
  }

  const randomResources = getRandomResources(4, resource.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <ResourceCard resource={resource} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4 text-center">More Resources</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {randomResources.map((res) => (
            <ResourceCard key={res.id} resource={res} subjectLabel={SUBJECT_LABELS[res.subject]} />
          ))}
        </div>
      </div>
    </div>
  );
}
