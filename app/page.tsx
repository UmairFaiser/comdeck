import Link from "next/link";
import { SUBJECTS, SUBJECT_LABELS } from "@/lib/resources";
import SubjectCard from "@/components/SubjectCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0_0)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <Link href="/">
            <h1 className="text-5xl font-semibold text-[oklch(0.90_0_0)] my-8 font-serif">
              Comdeck
            </h1>
          </Link>
          <p className="text-lg text-[oklch(0.60_0_0)] mb-8">
            A directory for advance level commerce papers
          </p>
          <div className="mx-auto max-w-2xl">
            <SearchBar />
          </div>
        </header>

        <main>
          <h2 className="mb-8 text-2xl font-semibold text-[oklch(0.90_0_0)] text-center">
            Browse by Subject
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUBJECTS.map((subject) => (
              <SubjectCard key={subject} subject={subject} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
