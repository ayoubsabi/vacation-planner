const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripbudget.app";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is TripBudget free? Do I need an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TripBudget is 100% free and requires no account, no email, and no sign-up of any kind. All your trip data is stored directly on your device using your browser's local storage. Nothing is ever sent to a server.",
      },
    },
    {
      "@type": "Question",
      name: "How does expense splitting work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TripBudget uses a debt-minimization algorithm to calculate the fewest possible payments needed to settle all group expenses. Add your travelers, log each expense with who paid and who it's split between, and TripBudget computes net balances and tells each person exactly what they owe — no spreadsheets required.",
      },
    },
    {
      "@type": "Question",
      name: "Does TripBudget work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TripBudget is a Progressive Web App (PWA). After your first visit, a Service Worker caches the entire app to your device. You can add expenses, view charts, and check balances with no internet connection. All data is stored in your browser's IndexedDB — it never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export or share my trip budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. From the trip settings screen you can generate a PDF expense report with one click. You can also share a read-only view of your trip via a link or QR code — anyone with the link can view the budget without needing an account.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to plan a trip budget with TripBudget",
  description:
    "Plan and track your vacation budget in three simple steps — no account or app download required.",
  url: siteUrl,
  step: [
    {
      "@type": "HowToStep",
      name: "Create your trip",
      text: "Enter your destination, total budget, travel dates, and the names of everyone going. Takes under a minute.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Log expenses as you spend",
      text: "Add each expense as it happens. Record who paid and which travelers it should be split between. Works fully offline.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Track spending and settle debts",
      text: "View pie charts, daily spending trends, and per-person breakdowns. The Expense Splitter tab shows who owes whom with the minimum number of transfers. Export a PDF report for the group.",
      position: 3,
    },
  ],
};

export function LandingJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
