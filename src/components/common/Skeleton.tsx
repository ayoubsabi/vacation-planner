import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-slate-200 rounded-lg animate-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}
