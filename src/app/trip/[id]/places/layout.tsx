import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nearby Places",
  robots: { index: false, follow: false },
};

export default function PlacesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
