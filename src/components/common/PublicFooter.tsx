import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="font-bold text-[var(--primary)] text-sm">
              {APP_NAME}
            </Link>
            <span>·</span>
            <span>Free</span>
            <span>·</span>
            <span>Offline</span>
            <span>·</span>
            <span>No account needed</span>
          </div>
          <nav className="flex items-center gap-5 text-xs text-[var(--text-secondary)]">
            <Link href="/trip/new" className="hover:text-[var(--text-primary)] transition-colors">
              New Trip
            </Link>
            <Link href="/templates" className="hover:text-[var(--text-primary)] transition-colors">
              Templates
            </Link>
            <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link href="/tos" className="hover:text-[var(--text-primary)] transition-colors">
              Terms
            </Link>
          </nav>
        </div>
        <div className="border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--text-secondary)]">
          Data stays on your device · Made with ❤️ by travelers for travelers.
        </div>
      </div>
    </footer>
  );
}
