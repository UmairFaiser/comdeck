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

  console.log('All resources:', resources.map(r => ({ id: r.id, title: r.title, slug: createSlug(r.title) })));
  console.log('Params slug:', params.slug);
  console.log('Query resourceId:', resourceId);

  const resource = resources.find((r) => {
    const resourceSlug = createSlug(r.title);
    console.log(`Comparing resource slug '${resourceSlug}' with params slug '${params.slug}' and resource ID '${r.id}' with query ID '${resourceId}'`);
    return resourceSlug === params.slug && r.id === resourceId;
  });

  if (!resource) {
    console.log('Resource not found for slug:', params.slug, 'and ID:', resourceId);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ResourceCard resource={resource} />
    </div>
  );
}
