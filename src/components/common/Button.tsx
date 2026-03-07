"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--primary)] text-white shadow-sm hover:bg-[var(--primary-dark)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-[var(--secondary)] text-white shadow-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-slate-100 active:bg-slate-200",
    danger:
      "bg-[var(--danger)] text-white shadow-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-7 py-3.5 text-base min-h-[52px]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
