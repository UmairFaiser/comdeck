"use client";

import { useToast } from "@/contexts/ToastContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldIcon, CheckmarkCircle02Icon, InformationCircleIcon, AlertCircleIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

export default function Toast() {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case "success":
              return ShieldIcon;
            case "info":
              return InformationCircleIcon;
            case "warning":
              return AlertCircleIcon;
            case "error":
              return AlertCircleIcon;
            default:
              return CheckmarkCircle02Icon;
          }
        };

        const getColor = () => {
          switch (toast.type) {
            case "success":
              return "text-accent";
            case "info":
              return "text-accent";
            case "warning":
              return "text-accent";
            case "error":
              return "text-accent";
            default:
              return "text-accent";
          }
        };

        return (
          <div
            key={toast.id}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-surface backdrop-blur-sm shadow-lg min-w-[280px] max-w-[420px] pointer-events-auto animate-slide-down"
            role="alert"
          >
            {toast.type === "success" ? (
              <div className="flex-shrink-0 relative w-5 h-5">
                <HugeiconsIcon
                  icon={ShieldIcon}
                  size={20}
                  className="text-accent absolute inset-0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className={`flex-shrink-0 ${getColor()}`}>
                <HugeiconsIcon
                  icon={getIcon()}
                  size={20}
                  className={getColor()}
                />
              </div>
            )}
            <p className={`flex-1 text-sm font-medium text-accent`}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-text-secondary hover:text-foreground transition-colors ml-1 opacity-70 hover:opacity-100"
              aria-label="Close notification"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={16}
                className="text-text-secondary"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

