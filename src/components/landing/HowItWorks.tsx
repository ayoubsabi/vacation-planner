import Link from "next/link";
import { Button } from "@/components/common/Button";

const steps = [
  {
    step: "1",
    title: "Create your trip",
    description: "Enter your destination, budget, dates, and who's coming.",
    emoji: "🗺️",
  },
  {
    step: "2",
    title: "Log expenses",
    description: "Quickly add expenses as you spend. Assign who paid and who splits it.",
    emoji: "💳",
  },
  {
    step: "3",
    title: "Track & share",
    description: "See charts, settle debts, and export a PDF report for the group.",
    emoji: "📊",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Up and running in 2 minutes
          </h2>
          <p className="text-[var(--text-secondary)]">No signup, no fuss — just open and plan</p>
        </div>

        <div className="flex flex-col gap-6 animate-stagger">
          {steps.map((s, i) => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--primary)] to-[var(--border)] mt-1" />
                )}
              </div>
              <div className="pb-2">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/trip/new">
            <Button size="lg" className="w-full sm:w-auto">
              Create Your First Trip →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
