import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Splitter",
  robots: { index: false, follow: false },
};

export default function SplitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
