import Link from "next/link";

const useCases = [
  {
    emoji: "💑",
    title: "Couple's Getaway",
    description: "Split hotel and dining costs between two, track spending against your joint budget.",
    href: "/templates/paris-honeymoon",
  },
  {
    emoji: "🎒",
    title: "Solo Backpacking",
    description: "Track daily costs across many destinations, stay on budget with no group complexity.",
    href: "/templates/bali-backpacker",
  },
  {
    emoji: "👥",
    title: "Friends Trip",
    description: "Log who paid what, split costs unevenly, and settle debts with minimum transfers.",
    href: "/templates/tokyo-group",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Family Vacation",
    description: "Manage a family budget across flights, resort, excursions, and dining out.",
    href: "/templates/cancun-family",
  },
  {
    emoji: "🌆",
    title: "Weekend Break",
    description: "Quick trips need quick budgets — set up in under a minute, track as you go.",
    href: "/templates/barcelona-weekend",
  },
  {
    emoji: "🎉",
    title: "Bachelor / Stag Trip",
    description: "Coordinate costs for a big group, ensure fair splitting, and share the final tally.",
    href: "/templates/prague-stag",
  },
];

export function UseCases() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Built for every kind of trip
        </h2>
        <p className="text-[var(--text-secondary)]">
          From solo backpacking to group adventures — Budget Rover adapts to your travel style
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {useCases.map((uc) => (
          <Link
            key={uc.title}
            href={uc.href}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex gap-4 items-start group"
          >
            <span className="text-2xl shrink-0" aria-hidden="true">
              {uc.emoji}
            </span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                {uc.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {uc.description}
              </p>
              <span className="text-xs font-medium text-[var(--primary)] mt-2 inline-block">
                See sample budget →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
