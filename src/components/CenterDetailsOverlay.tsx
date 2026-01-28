"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JambCenter } from "@/types/center";
import { X, Navigation, Globe, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "./ui/Badge";
import { formatDistance } from "@/lib/utils";

interface CenterDetailsOverlayProps {
  center: JambCenter | null;
  onClose: () => void;
  isNavigating: boolean;
  onNavigate: (val: boolean) => void;
}

export const CenterDetailsOverlay: React.FC<CenterDetailsOverlayProps> = ({
  center,
  onClose,
  isNavigating,
  onNavigate,
}) => {
  if (!center) return null;

  const handleNavigation = () => {
    onNavigate(!isNavigating);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[96%] md:w-[95%] max-w-lg z-[60]"
      >
        <div className="bg-white/80 backdrop-blur-3xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 shadow-deep border border-white/50 overflow-hidden relative group">
          {/* Animated Background Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000"></div>

          {/* Close Button - More Visible */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all shadow-sm z-10"
            aria-label="Close"
          >
            <X size={20} className="stroke-[3px]" />
          </button>

          <div className="relative space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="solid" className="shadow-lg shadow-primary/20">
                Verified Center
              </Badge>
              {center.distance && (
                <Badge
                  variant="emerald"
                  icon={<Zap size={12} className="fill-emerald-600" />}
                >
                  {formatDistance(center.distance)} Away
                </Badge>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 leading-[1.4] tracking-tight pr-12">
                {center.centre_name}
              </h2>
              <div className="flex gap-3">
                <div className="mt-1 p-2 rounded-lg bg-slate-50 shrink-0">
                  <Globe size={16} className="text-slate-400" />
                </div>
                <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                  {center.address}
                </p>
              </div>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  Town / District
                </span>
                <p className="text-[14px] font-bold text-slate-700 truncate">
                  {center.town}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  Region / State
                </span>
                <p className="text-[14px] font-bold text-slate-700 truncate">
                  {center.state}
                </p>
              </div>
            </div>

            {/* CTA Container */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleNavigation}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 group/btn ${
                  isNavigating
                    ? "bg-rose-500 text-white shadow-rose-500/20"
                    : "bg-slate-900 hover:bg-primary text-white shadow-slate-900/10"
                }`}
              >
                <Navigation
                  size={16}
                  className={`stroke-[3px] transition-transform ${
                    isNavigating
                      ? "rotate-180"
                      : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  }`}
                />
                {isNavigating ? "Exit Navigation" : "Start Route"}
              </button>

              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/50 shadow-sm">
                <ShieldCheck size={20} className="stroke-[2.5px]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
