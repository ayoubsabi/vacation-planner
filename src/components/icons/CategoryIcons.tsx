import {
  Hotel,
  UtensilsCrossed,
  Plane,
  Ticket,
  ShoppingBag,
  Film,
  Package,
} from "lucide-react";
import { ExpenseCategory } from "@/lib/types";

interface CategoryIconProps {
  category: ExpenseCategory;
  size?: number;
  className?: string;
}

const iconMap: Record<ExpenseCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  accommodation: Hotel,
  food: UtensilsCrossed,
  transport: Plane,
  activities: Ticket,
  shopping: ShoppingBag,
  entertainment: Film,
  other: Package,
};

export function CategoryIcon({ category, size = 18, className }: CategoryIconProps) {
  const Icon = iconMap[category] ?? Package;
  return <Icon size={size} className={className} />;
}
