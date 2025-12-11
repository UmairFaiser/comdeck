"use client";
import { useState } from "react";

export default function ContactPageClient() {
  const contacts = [
    { label: "Umair Faiser", phone: "0759878351" },
    { label: "Anonymous", phone: "Will be added soon..." }
  ];

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contacts.map((c) => (
        <div
          key={c.label}
          className="rounded-md border border-border bg-surface p-4 flex items-center justify-between"
        >
          <div>
            <div className="text-sm text-text-secondary">{c.label}</div>
            <div className="text-lg font-semibold">{c.phone}</div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(c.phone);
              setCopiedStates((prev) => ({ ...prev, [c.label]: true }));
              setTimeout(() => {
                setCopiedStates((prev) => ({ ...prev, [c.label]: false }));
              }, 1500);
            }}
            aria-label={`Copy ${c.label} phone number`}
            className="px-3 py-1 rounded border border-border text-sm hover:bg-border/20 transition"
          >
            {copiedStates[c.label] ? "Copied" : "Copy"}
          </button>
        </div>
      ))}
    </div>
  );
}