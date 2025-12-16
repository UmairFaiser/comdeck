"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share04Icon } from "@hugeicons/core-free-icons";
import ShareModal from "./ShareModal";
import { createSlug } from "@/lib/utils";

interface ShareButtonProps {
  resourceId: string;
  resourceType: string;
  subject: string;
  resourceTitle: string;
}

export default function ShareButton({
  resourceId,
  resourceType,
  subject,
  resourceTitle,
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const slug = createSlug(resourceTitle);
  const shareUrl = `${window.location.origin}/${subject}/${resourceType}/${slug}?id=${resourceId}`;

  return (
    <>
      <button
        onClick={handleShareClick}
        className="inline-flex items-center justify-center rounded-full p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
        aria-label="Share resource"
      >
        <HugeiconsIcon icon={Share04Icon} className="h-5 w-5" />
      </button>
      <ShareModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        shareUrl={shareUrl}
      />
    </>
  );
}
