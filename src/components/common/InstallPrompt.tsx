"use client";
import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

const DISMISSED_KEY = "pwa-install-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream;

    // On iOS, only show if not already installed (standalone mode)
    const nav = navigator as Navigator & { standalone?: boolean };
    if (ios && !nav.standalone) {
      setIsIOS(true);
      setShow(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setShow(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:w-80">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-lg p-4 flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
          <span className="text-white font-bold text-sm">BR</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Install Budget Rover</p>
          {isIOS ? (
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Tap <Share size={11} className="inline mb-0.5" /> Share, then{" "}
              <strong>Add to Home Screen</strong>
            </p>
          ) : (
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Add to your home screen for quick access
            </p>
          )}
          {!isIOS && (
            <button
              onClick={install}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
            >
              <Download size={12} />
              Install App
            </button>
          )}
        </div>
        <button
          onClick={dismiss}
          className="shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-0.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
