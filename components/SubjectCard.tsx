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
      className="group block rounded-lg border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] p-6 transition-all hover:border-[oklch(0.30_0_0)] hover:bg-[oklch(0.14_0_0)]"
    >
      <h2 className="text-xl font-semibold text-[oklch(0.90_0_0)] group-hover:text-[oklch(0.95_0_0)] transition-colors">
        {label}
      </h2>
      <p className="mt-2 text-sm text-[oklch(0.60_0_0)]">
        View all resources for {label}
      </p>
    </Link>
  );
}

