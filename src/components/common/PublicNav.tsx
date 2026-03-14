import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function PublicNav() {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-6 h-14 max-w-5xl mx-auto">
        <Link href="/" className="font-bold text-[var(--primary)] text-base tracking-tight">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline"
          >
            Blog
          </Link>
          <Link
            href="/templates"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline"
          >
            Templates
          </Link>
          <Link
            href="/trip/new"
            className="text-sm font-semibold bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            New Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
