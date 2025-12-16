import { notFound } from 'next/navigation';
import { getAllResources, getResourceById } from '@/lib/resources';
import { createSlug } from '@/lib/utils';
import ResourceCard from '@/components/ResourceCard';
import BackButton from '@/components/BackButton';

interface ResourcePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((resource) => ({
    slug: createSlug(resource.title),
  }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const resources = getAllResources();
  const resource = resources.find((r) => createSlug(r.title) === params.slug);

  if (!resource) {
    return {};
  }

  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: `/${params.slug}`,
    },
  };
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const resources = getAllResources();
  const resource = resources.find((r) => createSlug(r.title) === params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="justify-self-start">
            <BackButton href="/" label="Back to Home" />
          </div>
          <h1 className="text-3xl font-bold text-foreground text-center mb-4">
            {resource.title}
          </h1>
        </header>
        <div className="flex justify-center">
          <ResourceCard resource={resource} showLinkedPaper={true} />
        </div>
      </div>
    </div>
  );
}
