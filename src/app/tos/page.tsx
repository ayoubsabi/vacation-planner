import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/common/BreadcrumbJsonLd";
import { Card } from "@/components/common/Card";
import { PublicNav } from "@/components/common/PublicNav";
import { PublicFooter } from "@/components/common/PublicFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://budgetrover.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Budget Rover is a free, as-is tool. Read our terms of service to understand acceptable use, data responsibility, and liability limitations.",
  openGraph: {
    title: "Terms of Service — Budget Rover",
    description:
      "Budget Rover is a free, as-is tool. Read our terms covering acceptable use, data responsibility, and liability limitations.",
    type: "website",
    images: [
      {
        url: "/og?title=Terms+of+Service+%E2%80%94+Budget+Rover",
        width: 1200,
        height: 630,
        alt: "Terms of Service — Budget Rover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Budget Rover",
    description:
      "Budget Rover is a free, as-is tool. Read our terms covering acceptable use, data responsibility, and liability limitations.",
    images: ["/og?title=Terms+of+Service+%E2%80%94+Budget+Rover"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description:
    "Terms of service for Budget Rover — a free, offline-first travel budget planner.",
  url: `${siteUrl}/tos`,
  publisher: {
    "@type": "Organization",
    name: "Budget Rover",
    url: siteUrl,
  },
  dateModified: "2026-03-09T00:00:00.000Z",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Terms of Service" },
        ]}
      />

      <PublicNav />

      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        />

        <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-1">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Last updated: March 9, 2026
        </p>

        <Card className="space-y-8 !p-6 sm:!p-8">
          {/* Acceptance */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              By accessing or using Budget Rover, you agree to be bound by these Terms of
              Service. If you do not agree, please do not use the app.
            </p>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              2. Description of Service
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover is a free, browser-based travel budget planner. It requires no
              account or sign-in, and all data is stored locally on your device. The service
              is provided at no cost and may be updated, changed, or discontinued at any
              time without prior notice.
            </p>
          </section>

          {/* Your data */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              3. Your Data &amp; Responsibility
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              All trip and expense data you enter is stored exclusively in your browser
              (IndexedDB / localStorage). This means:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc list-inside">
              <li>
                We have no access to your data and cannot recover it if it is lost (e.g.,
                due to clearing browser storage or uninstalling the app).
              </li>
              <li>
                You are responsible for backing up your data using the Export feature
                (Settings → Export Data).
              </li>
              <li>
                You are solely responsible for the accuracy of the information you enter.
              </li>
            </ul>
          </section>

          {/* Acceptable use */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              4. Acceptable Use
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              You agree to use Budget Rover only for lawful, personal purposes. You must not:
            </p>
            <ul className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc list-inside">
              <li>Attempt to reverse-engineer, scrape, or reproduce the service</li>
              <li>Use the app in a way that abuses or circumvents ad-serving infrastructure</li>
              <li>Use the app for any commercial purpose without explicit permission</li>
              <li>Attempt to introduce malicious code or otherwise interfere with the service</li>
            </ul>
          </section>

          {/* IP */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              5. Intellectual Property
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              The Budget Rover application, including its design, code, and content, is owned
              by Budget Rover. All rights are reserved. The data you enter into the app
              belongs to you.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover is provided <strong>"as is"</strong> without warranties of any
              kind, express or implied. We do not guarantee uninterrupted availability,
              error-free operation, or that your locally stored data will be preserved across
              browser updates, device resets, or storage-clearing events.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              To the fullest extent permitted by law, Budget Rover and its creators shall not
              be liable for any loss of data, financial decisions made based on app output,
              or any indirect, incidental, or consequential damages arising from your use of
              the service.
            </p>
          </section>

          {/* Third-party */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              8. Third-Party Services
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Budget Rover may display advertisements served by Google AdSense. Your
              interactions with those ads are governed by{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                Google&apos;s Terms of Service
              </a>
              . We are not responsible for the content of third-party ads or linked sites.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              9. Changes to These Terms
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              We may update these terms from time to time. The date at the top of this page
              reflects the most recent revision. Continued use of Budget Rover after any
              changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
              10. Contact
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Questions about these terms? Open an issue or discussion on the project&apos;s
              GitHub repository. You can also review our{" "}
              <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </Card>
      </div>

      <PublicFooter />
    </main>
  );
}
