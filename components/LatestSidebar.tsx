"use client";
import Link from "next/link";
import { useState } from "react";
import { Resource, SUBJECT_LABELS } from "@/lib/resources";
import { Drawer } from "vaul";
import { useToast } from "@/contexts/ToastContext";

interface LatestSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Resource[];
}

export default function LatestSidebar({ open, onOpenChange, items }: LatestSidebarProps) {
  const { showToast } = useToast();
  const phoneNumber = "0759878351";

  const [isScrolled, setIsScrolled] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 20);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      showToast("Phone number copied to clipboard!", "success");
    } catch {
      showToast("Failed to copy phone number.", "error");
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-60" />
        <Drawer.Content className="fixed right-0 top-0 h-full w-full md:w-md bg-surface/95 backdrop-blur border-l border-border shadow-xl z-70 outline-none flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
            <Drawer.Title className="text-lg font-semibold text-foreground">Latest Uploads</Drawer.Title>
            <button onClick={() => onOpenChange(false)} className="rounded p-2 text-text-secondary hover:text-foreground transition-colors">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          {/* Masking for top and bottom */}
          {isScrolled && (
            <div className="absolute top-15 left-0 right-0 h-16 bg-linear-to-b from-surface to-surface/0 pointer-events-none z-10" />
          )}
          <div className="absolute bottom-12 left-0 right-0 h-16 bg-linear-to-t from-surface to-surface/0 pointer-events-none z-10" />

          <div className="grow overflow-y-auto p-4 space-y-2 relative" onScroll={handleScroll}>

            {items.length === 0 ? (
              <div className="rounded-lg border border-border bg-surface p-4 text-center text-text-secondary">No recent items</div>
            ) : (
              <>
                {displayedItems.map((r) => (
                  <Link
                    key={r.id}
                    href={`/${r.subject}/${r.type}?id=${r.id}`}
                    className="block rounded-xl border border-border bg-surface p-3 shadow-sm transition-all hover:shadow-md hover:border-border-hover"
                    onClick={() => onOpenChange(false)}
                  >
                    <div className="text-sm font-medium text-foreground">{r.title}</div>
                    <div className="mt-1 text-xs text-text-secondary">{SUBJECT_LABELS[r.subject]}{r.series ? ` · ${r.series}` : ""}</div>
                  </Link>
                ))}
                {items.length > 20 && !showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full py-2 text-sm font-medium text-accent hover:underline"
                  >
                    Show More
                  </button>
                )}

              </>
            )}
            <div className="pb-4" /> {/* Gap at the bottom */}
          </div>
          <div className="shrink-0 border-t border-border p-4 text-center text-sm text-text-secondary">
            <p>Have a resource? <button onClick={copyToClipboard} className="text-accent hover:underline">Whatsapp: {phoneNumber}</button></p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
