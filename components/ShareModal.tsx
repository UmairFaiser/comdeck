"use client";

import { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Cancel01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useToast } from "@/contexts/ToastContext";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export default function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false); // New state for animation
  const { showToast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCopied(false); // Reset copied state when modal opens
      setShowModal(true); // Show modal for fade-in
    } else {
      setShowModal(false); // Hide modal for fade-out
      const timer = setTimeout(() => onClose(), 700); // Match animation duration
      return () => clearTimeout(timer);
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      showToast("Failed to copy link.", "error");
    }
  };

  if (!isOpen && !showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-lg bg-surface p-6 shadow-lg border border-border mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
          aria-label="Close share modal"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
        </button>

        <h2 id="share-modal-title" className="mb-4 text-xl font-semibold text-text-primary">
          Share Resource
        </h2>

        <div className="mb-4 flex items-center rounded-md border border-border bg-surface-alt p-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 truncate bg-transparent text-text-primary outline-none"
            aria-label="Shareable link"
          />
          <button
            onClick={handleCopy}
            className="ml-2 rounded-md p-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            aria-label={copied ? "Link copied" : "Copy link to clipboard"}
          >
            {copied ? <HugeiconsIcon icon={Tick01Icon} className="h-5 w-5" /> : <HugeiconsIcon icon={Copy01Icon} className="h-5 w-5" />}
          </button>
        </div>

        <p className="text-sm text-text-secondary">
          Copy this link to share the resource.
        </p>
      </div>
    </div>
  );
}
