import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Charts",
  robots: { index: false, follow: false },
};

export default function ChartsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
