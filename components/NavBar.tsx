"use client";
import Link from "next/link";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InboxIcon } from "@hugeicons/core-free-icons";
import LatestSidebar from "./LatestSidebar";
import { getLatestResources } from "@/lib/resources";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface NavBarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function NavBar({ setSidebarOpen }: NavBarProps) {
  const items = getLatestResources();
  return (
    <nav className="w-full border-b border-border bg-surface/80 backdrop-blur supports-backdrop-filter:bg-surface/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 sm:px-6 lg:px-8 h-14">
        <Link href="/" className="text-foreground font-serif font-normal tracking-wide text-xl md:text-2xl leading-tight">
          Comdeck
        </Link>
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          <button
            className="relative text-text-secondary hover:text-foreground transition-colors"
            aria-label="Open latest uploads"
            onClick={() => setSidebarOpen(true)}
          >
            <HugeiconsIcon icon={InboxIcon} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-600/80 ring-2 ring-surface" />
          </button>
        </div>
      </div>
    </nav>
  );
}
