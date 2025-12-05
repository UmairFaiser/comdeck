import Link from "next/link";
import { Resource, RESOURCE_TYPE_LABELS } from "@/lib/resources";
import { getLinkedResource, getAnswerResource } from "@/lib/resources";

interface ResourceCardProps {
  resource: Resource;
  showLinkedPaper?: boolean;
}

export default function ResourceCard({
  resource,
  showLinkedPaper = false,
}: ResourceCardProps) {
  const linkedPaper = showLinkedPaper ? getLinkedResource(resource) : null;
  const answerResource = resource.hasAnswers
    ? getAnswerResource(resource.id)
    : null;
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type];

  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-all hover:border-border-hover hover:bg-surface-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {resource.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded border border-border bg-background px-2 py-1 text-xs text-text-tertiary">
              {typeLabel}
            </span>
            {resource.year && (
              <span className="text-xs text-text-secondary">
                {resource.year}
              </span>
            )}
            {resource.lecturer && (
              <span className="inline-flex items-center rounded border border-border bg-background px-2 py-1 text-xs text-text-tertiary">
                {resource.lecturer}
              </span>
            )}
            {resource.hasAnswers && answerResource ? (
              <Link
                href={`/${answerResource.subject}/${answerResource.type}?id=${answerResource.id}`}
                className="inline-flex items-center rounded border border-accent bg-accent-weak-bg px-2 py-1 text-xs text-accent transition-colors hover:bg-accent-weak-bg-hover hover:border-accent-hover cursor-pointer"
              >
                Answers Available
              </Link>
            ) : resource.hasAnswers ? (
              <span className="inline-flex items-center rounded border border-accent bg-accent-weak-bg px-2 py-1 text-xs text-accent">
                Answers Available
              </span>
            ) : null}
          </div>
          {resource.description && (
            <p className="mt-2 text-sm text-text-secondary line-clamp-2">
              {resource.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={resource.filePath}
          download
          className="inline-flex items-center justify-center rounded border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Download PDF
        </a>
        {linkedPaper && (
          <Link
            href={`/${linkedPaper.subject}/${linkedPaper.type}?id=${linkedPaper.id}`}
            className="inline-flex items-center justify-center rounded border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent-hover hover:text-accent-hover"
          >
            View Question Paper
          </Link>
        )}
      </div>
    </div>
  );
}
