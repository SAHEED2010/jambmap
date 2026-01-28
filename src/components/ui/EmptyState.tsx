import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="relative mb-10">
        <div className="absolute -inset-6 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium">
          <SearchX size={64} strokeWidth={1.5} className="text-slate-200" />
        </div>
      </div>
      <h3 className="text-2xl font-black text-indigo-950 tracking-tight">
        No Centers Found
      </h3>
      <p className="text-slate-500 max-w-[260px] mt-4 text-sm font-medium leading-relaxed">
        We couldn't find any centers matching your selection. Try adjusting your
        filters.
      </p>
      <div className="mt-10">
        <Button onClick={onReset} variant="secondary">
          Reset All
        </Button>
      </div>
    </div>
  );
};
