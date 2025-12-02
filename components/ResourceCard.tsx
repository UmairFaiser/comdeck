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
    <div className="rounded-lg border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] p-5 transition-all hover:border-[oklch(0.30_0_0)] hover:bg-[oklch(0.14_0_0)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[oklch(0.90_0_0)] truncate">
            {resource.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.10_0_0)] px-2 py-1 text-xs text-[oklch(0.70_0_0)]">
              {typeLabel}
            </span>
            {resource.year && (
              <span className="text-xs text-[oklch(0.60_0_0)]">
                {resource.year}
              </span>
            )}
            {resource.hasAnswers && answerResource ? (
              <Link
                href={`/${answerResource.subject}/${answerResource.type}?id=${answerResource.id}`}
                className="inline-flex items-center rounded border border-[oklch(0.55_0.15_250)] bg-[oklch(0.12_0.05_250)] px-2 py-1 text-xs text-[oklch(0.55_0.15_250)] transition-colors hover:bg-[oklch(0.15_0.05_250)] hover:border-[oklch(0.60_0.15_250)] cursor-pointer"
              >
                Answers Available
              </Link>
            ) : resource.hasAnswers ? (
              <span className="inline-flex items-center rounded border border-[oklch(0.55_0.15_250)] bg-[oklch(0.12_0.05_250)] px-2 py-1 text-xs text-[oklch(0.55_0.15_250)]">
                Answers Available
              </span>
            ) : null}
          </div>
          {resource.description && (
            <p className="mt-2 text-sm text-[oklch(0.60_0_0)] line-clamp-2">
              {resource.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={resource.filePath}
          download
          className="inline-flex items-center justify-center rounded border border-[oklch(0.20_0_0)] bg-transparent px-4 py-2 text-sm font-medium text-[oklch(0.90_0_0)] transition-colors hover:border-[oklch(0.55_0.15_250)] hover:text-[oklch(0.55_0.15_250)]"
        >
          Download PDF
        </a>
        {linkedPaper && (
          <Link
            href={`/${linkedPaper.subject}/${linkedPaper.type}?id=${linkedPaper.id}`}
            className="inline-flex items-center justify-center rounded border border-[oklch(0.55_0.15_250)] bg-transparent px-4 py-2 text-sm font-medium text-[oklch(0.55_0.15_250)] transition-colors hover:border-[oklch(0.60_0.15_250)] hover:text-[oklch(0.60_0.15_250)]"
          >
            View Question Paper
          </Link>
        )}
      </div>
    </div>
  );
}

