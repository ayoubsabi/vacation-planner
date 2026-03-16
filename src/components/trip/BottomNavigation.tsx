"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, GitFork, CalendarDays, Settings } from "lucide-react";

interface BottomNavigationProps {
  tripId: string;
}

const tabs = [
  { label: "Home",     icon: Home,        href: ""          },
  { label: "Charts",   icon: BarChart2,   href: "/charts"   },
  { label: "Split",    icon: GitFork,     href: "/split"    },
  { label: "Plan",     icon: CalendarDays, href: "/plan"    },
  { label: "Settings", icon: Settings,    href: "/settings" },
];

export function BottomNavigation({ tripId }: BottomNavigationProps) {
  const pathname = usePathname();
  const base = `/trip/${tripId}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[var(--border)] safe-bottom">
      <div className="flex max-w-2xl mx-auto">
        {tabs.map(({ label, icon: Icon, href }) => {
          const fullPath = `${base}${href}`;
          const isActive = href === "" ? pathname === base : pathname.startsWith(fullPath);

          return (
            <Link
              key={label}
              href={fullPath}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors min-h-[56px] ${
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-[var(--primary)] rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
