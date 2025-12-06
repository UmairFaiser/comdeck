import { notFound } from "next/navigation";
import {
  getResourcesBySubject,
  getResourceTypesForSubject,
  SUBJECT_LABELS,
  SUBJECTS,
  type Subject,
} from "@/lib/resources";
import SubjectPageClient from "@/components/SubjectPageClient";

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = await params;
  const subjectKey = subject as Subject;

  if (!SUBJECTS.includes(subjectKey)) {
    notFound();
  }

  const resources = getResourcesBySubject(subjectKey);
  const availableTypes = getResourceTypesForSubject(subjectKey);
  const subjectLabel = SUBJECT_LABELS[subjectKey];

  return (
    <SubjectPageClient
      resources={resources}
      availableTypes={availableTypes}
      subjectLabel={subjectLabel}
    />
  );
}
