'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { getAllResources } from '@/lib/resources';
import { createSlug } from '@/lib/utils';
import React from 'react';
import ResourceCard from '@/components/ResourceCard';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <ResourceCard resource={resource} />
    </div>
  );
}
