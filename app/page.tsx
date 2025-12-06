import Link from "next/link";
import { SUBJECTS } from "@/lib/resources";
import SubjectCard from "@/components/SubjectCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
  <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <Link href="/">
      <h1 className="font-serif font-normal text-foreground my-1 text-4xl md:text-5xl leading-tight">
              Comdeck
            </h1>
          </Link>
      <p className="text-lg text-text-secondary mb-8">
            A directory for advance level commerce papers
          </p>
          <div className="mx-auto max-w-2xl">
            <SearchBar />
          </div>
        </header>

        <main>
      <h2 className="mb-8 text-2xl font-semibold text-foreground text-center">
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
