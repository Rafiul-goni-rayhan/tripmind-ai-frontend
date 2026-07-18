"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type Toast = {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: {
    success: (description: string, title?: string) => void;
    error: (description: string, title?: string) => void;
    info: (description: string, title?: string) => void;
  };
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (description: string, variant: ToastVariant = "info", title?: string) => {
      const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

      const newToast: Toast = {
        id,
        title,
        description,
        variant,
      };

      setToasts((currentToasts) => [...currentToasts, newToast]);

      window.setTimeout(() => {
        dismiss(id);
      }, 4000);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      toast: {
        success: (description: string, title?: string) => pushToast(description, "success", title),
        error: (description: string, title?: string) => pushToast(description, "error", title),
        info: (description: string, title?: string) => pushToast(description, "info", title),
      },
      dismiss,
    }),
    [dismiss, pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const variantStyles =
            toast.variant === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : toast.variant === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-slate-200 bg-slate-50 text-slate-700";

          const Icon =
            toast.variant === "success"
              ? CheckCircle2
              : toast.variant === "error"
              ? AlertCircle
              : Info;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto overflow-hidden rounded-3xl border px-4 py-3 shadow-xl ${variantStyles}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  {toast.title ? (
                    <p className="text-sm font-semibold">{toast.title}</p>
                  ) : null}
                  <p className="mt-1 text-sm leading-6">{toast.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  className="rounded-full p-1 text-current opacity-70 transition hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
