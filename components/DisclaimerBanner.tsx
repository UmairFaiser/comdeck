"use client";

export default function DisclaimerBanner() {
  return (
    <div className="w-full bg-[oklch(0.20_0.06_70)] text-[oklch(0.78_0.12_80)] border-y border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-2 text-sm">
        <p className="leading-relaxed">
          None of these resources are owned by Comdeck. The resources belong to their
          original owner. Please contact the number in the contact page for credits or
          removal of resources.
        </p>
      </div>
    </div>
  );
}