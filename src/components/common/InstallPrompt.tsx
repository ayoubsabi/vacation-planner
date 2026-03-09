"use client";
import { useEffect, useState } from "react";
import { X, Download, Share, Smartphone } from "lucide-react";

const DISMISSED_KEY = "pwa-install-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  // iphone/ipod via UA
  if (/iphone|ipod/i.test(navigator.userAgent)) return true;
  // iPad — classic UA check OR iPadOS 13+ which reports MacIntel + touch
  if (/ipad/i.test(navigator.userAgent)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

export function IOSInstallGuide() {
  return (
    <ol className="mt-2 space-y-2 text-xs text-[var(--text-secondary)]">
      <li className="flex items-start gap-2">
        <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">1</span>
        <span>Open this page in <strong className="text-[var(--text-primary)]">Safari</strong> (not Chrome or other browsers)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">2</span>
        <span>Tap the <Share size={11} className="inline mb-0.5 text-[var(--primary)]" /> <strong className="text-[var(--text-primary)]">Share</strong> button at the bottom of the screen</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">3</span>
        <span>Scroll down and tap <strong className="text-[var(--text-primary)]">&ldquo;Add to Home Screen&rdquo;</strong></span>
      </li>
      <li className="flex items-start gap-2">
        <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">4</span>
        <span>Tap <strong className="text-[var(--text-primary)]">&ldquo;Add&rdquo;</strong> in the top-right corner</span>
      </li>
    </ol>
  );
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    if (isStandalone()) return;

    const ios = detectIOS();

    if (ios) {
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
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:w-84">
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <Smartphone size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Install Budget Rover</p>
            {isIOS ? (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Add to your home screen for offline access
              </p>
            ) : (
              <>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Add to your home screen for quick access
                </p>
                <button
                  onClick={install}
                  className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
                >
                  <Download size={12} />
                  Install App
                </button>
              </>
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
        {isIOS && <IOSInstallGuide />}
      </div>
    </div>
  );
}
