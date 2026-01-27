"use client";

import React from "react";
import { JambCenter } from "@/types/center";
import { motion } from "framer-motion";
import { MapPin, Navigation, Hash, Copy, Check, Zap } from "lucide-react";
import { useState } from "react";

interface CenterItemProps {
  center: JambCenter;
  searchQuery: string;
  index: number;
  onSelect: () => void;
  onNavigate?: () => void;
  isSelected?: boolean;
  isBestMatch?: boolean;
}

export const CenterItem: React.FC<CenterItemProps> = ({
  center,
  searchQuery,
  index,
  onSelect,
  onNavigate,
  isSelected,
  isBestMatch,
}) => {
  const [copied, setCopied] = useState(false);

  const getDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate();
    }
  };

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${center.centre_name}, ${center.town}, ${center.state} State`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span className="inline">
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-primary/10 text-primary font-semibold rounded-sm px-0.5 no-underline"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-3xl p-6 mb-4 border-2 ${
        isSelected
          ? "bg-white border-primary shadow-deep z-10 scale-[1.01]"
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-hover hover:-translate-y-1"
      }`}
    >
      <div className="flex flex-col gap-6 relative z-10">
        {/* Info Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200/50">
                Center #{center.sn}
              </div>
              <div className="px-3 py-1.5 bg-primary/5 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/10">
                {center.state}
              </div>
              {center.distance && center.distance !== Infinity && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl text-[10px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-100/50">
                  <Zap size={12} className="fill-emerald-600" />
                  {center.distance < 1
                    ? `${(center.distance * 1000).toFixed(0)}m`
                    : `${center.distance.toFixed(1)}km`}
                </div>
              )}
              {isBestMatch && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary rounded-xl text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-primary/20 animate-in fade-in zoom-in duration-500">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Smart Choice
                </div>
              )}
            </div>
            {isSelected && (
              <motion.div
                layoutId={`check-${center.sn}`}
                className="bg-primary rounded-full p-2 shadow-lg shadow-primary/20"
              >
                <Check size={14} className="text-white stroke-[3px]" />
              </motion.div>
            )}
          </div>

          <div className="space-y-2.5">
            <h3
              className={`text-lg font-bold leading-[1.4] tracking-tight transition-colors duration-300 ${
                isSelected
                  ? "text-primary"
                  : "text-slate-900 group-hover:text-primary"
              }`}
            >
              {highlightText(center.centre_name, searchQuery)}
            </h3>
            <div className="flex items-start gap-2.5 text-slate-500">
              <div className="mt-1 p-1 bg-slate-50 rounded-lg shrink-0 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                <MapPin size={14} className="stroke-[2px]" />
              </div>
              <p className="text-[14px] font-medium leading-relaxed text-slate-500 group-hover:text-slate-600">
                {center.address}
              </p>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate?.();
            }}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:shadow-lg active:scale-95 ${
              isSelected
                ? "bg-primary text-white shadow-primary/20"
                : "bg-slate-900 text-white hover:bg-primary"
            }`}
          >
            <Navigation size={14} className="stroke-[2.5px]" />
            Route
          </button>
          <button
            onClick={copyAddress}
            className={`flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all active:scale-95 border-2 ${
              copied
                ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:text-slate-900"
            }`}
          >
            {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
            {copied ? "Done" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
