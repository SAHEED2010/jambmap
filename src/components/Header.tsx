"use client";

import { Share2, Search, Map, ChevronDown, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <header className="sticky top-0 z-[100] w-full bg-blue-800 shadow-lg border-b border-white/5">
      <div className="flex items-center justify-between h-14 md:h-[60px] px-4 md:px-6 gap-4">
        {/* LEFT: Branding (Quieter) */}
        <div className="flex items-center shrink-0 w-auto md:w-56 gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => window.location.reload()}
          >
            <Image
              src="/logo.png"
              alt="JambPortal Logo"
              width={140}
              height={45}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* CENTER: Hero Search & Controls */}
        <div className="flex-1 flex justify-center max-w-3xl items-center gap-2 md:gap-3">
          {/* 1. HERO SEARCH INPUT */}
          <div className="flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-blue-300 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search centers or towns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-blue-900/40 border border-white/10 rounded-lg pl-9 pr-8 text-white placeholder:text-blue-300/50 text-sm font-medium focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 focus:bg-blue-900/60 outline-none transition-all shadow-inner hover:border-white/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-2 flex items-center text-blue-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* 2. REGION SELECTOR (Separated Pill) */}
          <div className="hidden sm:flex relative items-center max-w-[150px] bg-blue-800/80 border border-white/10 rounded-lg h-10 px-2 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all hover:border-white/20">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent border-none text-blue-100 text-xs font-medium focus:ring-0 pl-1 pr-6 py-0 appearance-none cursor-pointer hover:text-white transition-colors [&>option]:text-slate-900 truncate"
            >
              <option value="">Select Region</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 text-blue-400 w-3 h-3 pointer-events-none" />
          </div>

          {/* 3. PRIMARY ACTION (Distinct Button) */}
          <button className="bg-secondary hover:bg-yellow-300 text-primary font-bold text-xs px-5 h-10 rounded-lg uppercase tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0">
            Search
          </button>
        </div>

        {/* RIGHT: Secondary Tools (Minimal) */}
        <div className="flex items-center justify-end w-auto md:w-56 gap-1 md:gap-2">
          {userLocation && (
            <button
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-wide transition-all border border-transparent hover:border-white/10"
              title="Sorted by proximity"
            >
              <Zap size={12} className="text-secondary/80" />
              <span>Smart Sort</span>
            </button>
          )}

          <button
            onClick={shareApp}
            className="flex items-center gap-2 px-3 py-2 text-blue-300 hover:text-white transition-colors text-xs font-medium rounded-lg hover:bg-white/5 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden lg:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};
