import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm p-4",
        hoverable && "cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-150",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
