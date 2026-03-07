"use client";
import Link from "next/link";
import { useOffline } from "@/hooks/useOffline";
import { Wifi, WifiOff } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

interface HeaderProps {
  title?: string;
  backHref?: string;
  actions?: React.ReactNode;
}

export function Header({ title, backHref, actions }: HeaderProps) {
  const isOffline = useOffline();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
        {backHref && (
          <Link
            href={backHref}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors -ml-1"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Link>
        )}

        <div className="flex-1 min-w-0">
          {title ? (
            <h1 className="font-bold text-[var(--text-primary)] truncate">{title}</h1>
          ) : (
            <Link href="/" className="font-bold text-[var(--primary)] text-lg tracking-tight">
              {APP_NAME}
            </Link>
          )}
        </div>

        {isOffline && (
          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <WifiOff size={12} className="animate-pulse-dot" />
            <span>Offline</span>
          </div>
        )}

        {!isOffline && title && (
          <div className="text-green-500" aria-hidden="true">
            <Wifi size={14} className="opacity-40" />
          </div>
        )}

        {actions}
      </div>
    </header>
  );
}
