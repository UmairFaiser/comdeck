'use client';

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Resource, RESOURCE_TYPE_LABELS } from "@/lib/resources";
import { getLinkedResource, getAnswerResource } from "@/lib/resources";
import { useToast } from "@/contexts/ToastContext";

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
  const { showToast } = useToast();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(false);

  useEffect(() => {
    const checkMasks = () => {
      const el = titleRef.current;
      if (el) {
        const isOverflowing = el.scrollWidth > el.clientWidth;
        const scrolledToStart = el.scrollLeft === 0;
        // Add a small tolerance for floating point inaccuracies
        const scrolledToEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        setShowLeftMask(isOverflowing && !scrolledToStart);
        setShowRightMask(isOverflowing && !scrolledToEnd);
      }
    };

    // Initial check
    checkMasks();

    // Add event listeners
    const el = titleRef.current;
    if (el) {
      el.addEventListener("scroll", checkMasks);
    }
    window.addEventListener("resize", checkMasks);

    // Cleanup
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkMasks);
      }
      window.removeEventListener("resize", checkMasks);
    };
  }, [resource.title]); // Re-run effect if title changes

  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-all hover:border-border-hover hover:bg-surface-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <h3
              ref={titleRef}
              className="text-lg font-semibold text-foreground overflow-x-auto whitespace-nowrap"
              title={resource.title}
            >
              {resource.title}
            </h3>
            {showLeftMask && (
              <div className="absolute left-0 top-0 h-full w-8 bg-linear-to-r from-surface to-transparent pointer-events-none" />
            )}
            {showRightMask && (
              <div className="absolute right-0 top-0 h-full w-8 bg-linear-to-l from-surface to-transparent pointer-events-none" />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded border border-border bg-background px-2 py-1 text-xs text-text-tertiary">
              {typeLabel}
            </span>
            {resource.day !== undefined && (
              <span className="inline-flex items-center rounded border border-border bg-background px-2 py-1 text-xs text-text-tertiary">
                {`Day ${resource.day}`}
              </span>
            )}
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
        {resource.videoUrl ? (
          <a
            href={resource.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent-hover hover:text-accent-hover"
          >
            Watch Video
          </a>
        ) : (
          <a
            href={resource.filePath}
            download
            onClick={() => {
              showToast(`Downloading ${resource.title}...`, "success");
            }}
            className="inline-flex items-center justify-center rounded border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Download PDF
          </a>
        )}
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