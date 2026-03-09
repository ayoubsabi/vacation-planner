"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Budget Rover free? Do I need an account?",
    answer: (
      <>
        Budget Rover is 100% free — no account, no email, no subscription. All your trip data is
        stored directly on your device using your browser&apos;s local storage. Nothing is ever
        sent to a server.{" "}
        <Link href="/trip/new" className="text-[var(--primary)] hover:underline font-medium">
          Start planning now →
        </Link>
      </>
    ),
  },
  {
    question: "How does expense splitting work?",
    answer: (
      <>
        Budget Rover uses a <strong className="text-[var(--text-primary)]">debt-minimization algorithm</strong> to calculate the fewest
        possible payments needed to settle group expenses. Add your travelers, log each expense with
        who paid and who it&apos;s split between, and Budget Rover computes net balances
        automatically — telling each person exactly what they owe. See it in action in our{" "}
        <Link
          href="/templates/tokyo-group"
          className="text-[var(--primary)] hover:underline font-medium"
        >
          Tokyo group trip example →
        </Link>
      </>
    ),
  },
  {
    question: "Does Budget Rover work offline?",
    answer: (
      <>
        Yes. Budget Rover is a <strong className="text-[var(--text-primary)]">Progressive Web App (PWA)</strong>. After your first visit, a
        Service Worker caches the entire app to your device. You can add expenses, view charts, and
        check balances with no internet connection at all — on a plane, in a remote village, or in
        an underground metro. All data lives in your browser&apos;s IndexedDB and never leaves your
        device.
      </>
    ),
  },
  {
    question: "Can I export or share my trip budget?",
    answer: (
      <>
        Yes. From the trip settings screen you can generate a{" "}
        <strong className="text-[var(--text-primary)]">PDF expense report</strong>{" "}
        with one click. You can also share a read-only view of your trip via a link or{" "}
        <strong className="text-[var(--text-primary)]">QR code</strong> — anyone with the link can
        view the budget without needing an account. Learn more on the{" "}
        <Link href="/blog" className="text-[var(--primary)] hover:underline font-medium">
          Budget Rover blog →
        </Link>
      </>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-4 py-16 max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 id="faq-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-[var(--text-secondary)]">Everything you need to know before you go</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <h3 className="font-semibold text-[var(--text-primary)] text-sm pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={18}
                  className={`text-[var(--primary)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-5 pb-3 pt-2 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
