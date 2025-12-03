"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home04Icon } from "@hugeicons/core-free-icons";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      aria-label={label || "Home"}
      className="inline-flex items-center text-[oklch(0.60_0_0)] hover:text-[oklch(0.90_0_0)] transition-colors"
    >
      <HugeiconsIcon
        icon={Home04Icon}
        size={22}
        color="currentColor"
        strokeWidth={1.5}
      />
    </Link>
  );
}

