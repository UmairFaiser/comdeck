import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0_0)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[oklch(0.90_0_0)] mb-4">
          404
        </h1>
        <p className="text-lg text-[oklch(0.60_0_0)] mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded border border-[oklch(0.20_0_0)] bg-[oklch(0.12_0_0)] px-6 py-3 text-sm font-medium text-[oklch(0.90_0_0)] transition-colors hover:border-[oklch(0.55_0.15_250)] hover:text-[oklch(0.55_0.15_250)]"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

