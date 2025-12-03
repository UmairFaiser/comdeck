"use client";
import { useState } from "react";

export default function ContactPageClient() {
  const contacts = [
    { label: "General Inquiries", phone: "+94 71 000 0000" },
    { label: "Credits / Removals", phone: "+94 77 111 1111" },
    { label: "Support", phone: "+94 75 222 2222" },
  ];

  const [copied, setCopied] = useState<string | null>(null);

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
              setCopied(c.phone);
              setTimeout(() => setCopied(null), 1500);
            }}
            aria-label={`Copy ${c.label} phone number`}
            className="px-3 py-1 rounded border border-border text-sm hover:bg-border/20 transition"
          >
            {copied === c.phone ? "Copied" : "Copy"}
          </button>
        </div>
      ))}
    </div>
  );
}