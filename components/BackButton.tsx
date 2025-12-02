"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-[oklch(0.60_0_0)] hover:text-[oklch(0.90_0_0)] transition-colors"
    >
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        size={20}
        color="currentColor"
        strokeWidth={1.5}
      />
      <span>{label}</span>
    </Link>
  );
}

