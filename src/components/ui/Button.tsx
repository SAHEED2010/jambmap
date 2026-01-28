import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "emerald";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  icon,
  disabled,
  ...props
}) => {
  const variants = {
    primary:
      "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30",
    secondary:
      "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900",
    outline:
      "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900",
    ghost:
      "bg-transparent text-slate-500 hover:text-primary hover:bg-primary/5",
    danger:
      "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600",
    emerald:
      "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-5 py-2.5 text-[11px]",
    lg: "px-7 py-3.5 text-[11px]",
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin absolute" />}
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {icon}
        {children}
      </span>
    </button>
  );
};
