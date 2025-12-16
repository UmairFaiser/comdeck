"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share04Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useToast } from "@/contexts/ToastContext";

interface ShareButtonProps {
  resourceId: string;
  resourceType: string;
  subject: string;
}

export default function ShareButton({
  resourceId,
  resourceType,
  subject,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${subject}/${resourceType}?id=${resourceId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      showToast("Failed to copy link.", "error");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center rounded-full p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
      aria-label="Share resource"
    >
              {copied ? <HugeiconsIcon icon={Tick01Icon} className="h-5 w-5" /> : <HugeiconsIcon icon={Share04Icon} className="h-5 w-5" />}
    </button>
  );
}
