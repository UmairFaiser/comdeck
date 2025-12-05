import Link from "next/link";
import { Subject, SUBJECT_LABELS } from "@/lib/resources";

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const label = SUBJECT_LABELS[subject];

  return (
    <Link
      href={`/${subject}`}
      className="group block rounded-lg border border-border bg-surface p-6 transition-all hover:border-border-hover hover:bg-surface-hover"
    >
      <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground-strong transition-colors">
        {label}
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        View all resources for {label}
      </p>
    </Link>
  );
}
