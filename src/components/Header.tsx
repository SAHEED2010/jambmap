"use client";

import {
  Share2,
  LayoutGrid,
  Search,
  Map,
  ChevronDown,
  X,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  states: string[];
  userLocation?: { lat: number; lng: number } | null;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  states,
  userLocation,
}) => {
  const shareApp = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "2025 JAMB Centers",
          text: "Find your nearest JAMB registration center.",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 xl:px-12 gap-3 md:gap-8">
        {/* Logo Section */}
        <div className="flex items-center shrink-0 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 cursor-pointer group"
            onClick={() => window.location.reload()}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all"></div>
              <div className="relative bg-primary p-2 md:p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
                <LayoutGrid className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl font-bold tracking-tight text-slate-900 leading-none">
                Jamb<span className="text-primary">Portal</span>
              </h1>
              <div className="hidden sm:flex items-center gap-2 mt-1.5">
                <div className="relative flex h-2 w-2">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                  Mapping Engine v2.0
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search & Filter Area - MOVED FROM SIDEBAR */}
        <div className="flex-1 max-w-5xl flex items-center gap-3 md:gap-6">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-3 md:left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <input
              type="text"
              placeholder="Search centers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/50 border border-slate-200/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl py-2.5 md:py-3.5 pl-10 md:pl-14 pr-10 md:pr-12 text-xs md:text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 md:right-5 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                title="Clear search"
              >
                <X size={16} className="stroke-[3px]" />
              </button>
            )}
          </div>

          {/* Region Select */}
          <div className="relative hidden md:block w-72 shrink-0">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
              <Map className="w-4 h-4" />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-100/50 border border-slate-200/60 hover:bg-white hover:border-slate-300 focus:bg-white focus:border-primary rounded-2xl py-3.5 pl-12 pr-12 text-sm font-semibold text-slate-700 appearance-none outline-none cursor-pointer transition-all"
            >
              <option value="">All Regions</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60">
            <button className="px-5 py-2 rounded-xl bg-white shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 transition-all">
              Vector
            </button>
            <button className="px-4 py-2 rounded-xl text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600 transition-all">
              Satellite
            </button>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden xl:block"></div>

          {userLocation && (
            <div className="hidden 2xl:flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-widest group cursor-help">
              <Zap
                size={12}
                className="fill-emerald-600 group-hover:scale-125 transition-transform"
              />
              Smart Sort Active
            </div>
          )}

          <button
            onClick={shareApp}
            className="flex items-center gap-2 md:gap-4 px-4 md:px-10 py-2.5 md:py-3.5 rounded-2xl bg-slate-900 hover:bg-primary text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95 group relative overflow-hidden min-w-[48px] md:min-w-[150px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-[11px] font-bold uppercase tracking-[0.2em]">
              Share
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
