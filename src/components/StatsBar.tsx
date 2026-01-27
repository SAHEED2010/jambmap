"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Database, MapPin } from "lucide-react";
import { JambCenter } from "@/types/center";

interface StatsBarProps {
  centers: JambCenter[];
  selectedState: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  centers,
  selectedState,
}) => {
  const totalCenters = centers.length;

  const topTowns = React.useMemo(() => {
    const counts: Record<string, number> = {};
    centers.forEach((c) => {
      counts[c.town] = (counts[c.town] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [centers]);

  const stats = [
    {
      label: "Total Centers",
      value: totalCenters,
      icon: Database,
      color: "bg-blue-500",
    },
    {
      label: "Selected State",
      value: selectedState || "Nigeria",
      icon: MapPin,
      color: "bg-indigo-500",
    },
    {
      label: "Top Towns",
      value: topTowns.map(([name]) => name).join(", ") || "N/A",
      icon: BarChart3,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="px-8 py-5 bg-white/50 border-b border-slate-100 flex items-center justify-between gap-8 overflow-x-auto no-scrollbar">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-4 group cursor-default min-w-max"
        >
          <div
            className={`p-2.5 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 text-primary`}
          >
            <stat.icon size={18} className="stroke-[2px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors max-w-[200px] truncate">
                {stat.value}
              </span>
            </div>
          </div>
          {idx < stats.length - 1 && (
            <div className="h-4 w-px bg-slate-200 ml-4 shrink-0 hidden md:block" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
