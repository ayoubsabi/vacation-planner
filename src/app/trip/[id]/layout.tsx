import { BottomNavigation } from "@/components/trip/BottomNavigation";

interface TripLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function TripLayout({ children, params }: TripLayoutProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="pb-20">{children}</div>
      <BottomNavigation tripId={id} />
    </div>
  );
}
