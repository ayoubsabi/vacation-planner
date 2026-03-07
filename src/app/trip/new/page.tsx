import { TripWizard } from "@/components/trip/TripWizard";
import { Header } from "@/components/common/Header";

export const metadata = { title: "Create New Trip — TripBudget" };

export default function NewTripPage() {
  return (
    <>
      <Header title="New Trip" backHref="/" />
      <TripWizard />
    </>
  );
}
