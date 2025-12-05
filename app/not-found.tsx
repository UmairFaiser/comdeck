import Link from "next/link";

export default function NotFound() {
  return (
  <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
    <h1 className="text-4xl font-bold text-foreground mb-4">
          404
        </h1>
    <p className="text-lg text-text-secondary mb-8">
          Page not found
        </p>
        <Link
          href="/"
      className="inline-flex items-center justify-center rounded border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

