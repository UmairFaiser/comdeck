"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-border bg-surface/80 backdrop-blur supports-backdrop-filter:bg-surface/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 sm:px-6 lg:px-8 h-14">
        <Link href="/" className="text-foreground font-serif font-normal tracking-wide text-xl md:text-2xl leading-tight">
          Comdeck
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="text-text-secondary hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}