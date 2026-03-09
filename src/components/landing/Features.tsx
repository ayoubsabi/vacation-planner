import { WifiOff, BarChart2, Users, Share2 } from "lucide-react";

const features = [
  {
    icon: <Users size={24} />,
    title: "Smart Expense Splitting",
    description:
      "Add travelers and log who paid for what. Our debt-minimization algorithm calculates the fewest transfers needed to settle all balances — no manual maths, no spreadsheets.",
    color: "bg-orange-50 text-[var(--primary)]",
  },
  {
    icon: <WifiOff size={24} />,
    title: "Works Offline",
    description:
      "Budget Rover is a Progressive Web App (PWA). A Service Worker caches the app on first load, and all data is stored in IndexedDB on your device. Add expenses anywhere — no Wi-Fi required.",
    color: "bg-blue-50 text-[var(--secondary)]",
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Visual Charts",
    description:
      "Understand your spending at a glance with a category pie chart, cumulative daily spending line chart, and a per-person bar chart. Spot overspending before it becomes a problem.",
    color: "bg-teal-50 text-[var(--success)]",
  },
  {
    icon: <Share2 size={24} />,
    title: "Easy Sharing",
    description:
      "Share a read-only trip link or QR code so the whole group can see the budget. When it's over, export a one-click PDF expense report to keep for your records.",
    color: "bg-yellow-50 text-amber-600",
  },
];

export function Features() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Everything you need for group travel
        </h2>
        <p className="text-[var(--text-secondary)]">Built for travelers, by travelers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-stagger">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${f.color}`}>
              {f.icon}
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{f.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
