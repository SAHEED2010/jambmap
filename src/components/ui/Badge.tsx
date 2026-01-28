import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "emerald" | "slate" | "solid";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className,
  icon,
}) => {
  const variants = {
    primary:
      "bg-primary/5 text-primary border-primary/10 shadow-sm shadow-primary/5",
    secondary: "bg-slate-100 text-slate-500 border-slate-200/50",
    outline: "bg-transparent border-slate-200 text-slate-600",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
    slate: "bg-slate-100 text-slate-500 border-slate-200/50",
    solid:
      "bg-primary text-white shadow-lg shadow-primary/20 border-transparent",
  };

  const selectedVariant =
    variants[variant as keyof typeof variants] || variants.primary;

  return (
    <div
      className={cn(
        "px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5 transition-all",
        selectedVariant,
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  );
};
