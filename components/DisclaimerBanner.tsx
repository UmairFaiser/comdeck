"use client";
import { useEffect, useState } from "react";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("comdeck_disclaimer_dismissed") === "true";
    } catch {}
    return false;
  });
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // no-op: state is initialized lazily from localStorage
  }, []);

  const handleDismiss = () => {
    setHiding(true);
    setTimeout(() => {
      setDismissed(true);
      try {
        localStorage.setItem("comdeck_disclaimer_dismissed", "true");
      } catch {}
    }, 300);
  };

  if (dismissed) return null;

  return (
    <div
      className={`relative w-full bg-banner-bg text-banner-text border-y border-border/60 transition-opacity duration-300 ease-in-out ${hiding ? "opacity-0" : "opacity-100"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-sm">
        <p className="leading-relaxed">
          None of these resources are owned by Comdeck. The resources belong to their
          original owner. Please contact the number in the contact page for credits or
          removal of resources.
        </p>
        <button
          type="button"
          aria-label="Dismiss disclaimer"
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-banner-text hover:text-white focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
