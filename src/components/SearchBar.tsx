"use client";

import React from "react";
import { Search, Map, ChevronDown, X, Zap } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  states: string[];
  userLocation?: { lat: number; lng: number } | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  states,
  userLocation,
}) => {
  return (
    <div className="flex flex-col gap-5 p-6 bg-white border-b border-slate-100/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col gap-4">
        {/* Search Input Box */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
            <Search size={18} className="stroke-[2.5px]" />
          </div>
          <input
            type="text"
            placeholder="Search center name or town..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-10 py-3.5 border-2 border-slate-50 rounded-2xl bg-slate-50/50 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white text-[13px] font-bold text-indigo-950 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-slate-300 hover:text-slate-500"
            >
              <X size={16} className="stroke-[3px]" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary z-10">
              <Map size={14} className="stroke-[2.5px]" />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-slate-50 focus:outline-none focus:border-primary/30 rounded-xl transition-all bg-slate-50/30 cursor-pointer appearance-none text-indigo-950 hover:bg-slate-50"
            >
              <option value="">All Regions</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
              <ChevronDown size={14} className="stroke-[3px]" />
            </div>
          </div>

          {userLocation && (
            <div className="flex items-center gap-1.5 px-3 py-3 bg-emerald-50 rounded-xl border border-emerald-100/50 text-[9px] font-black text-emerald-600 uppercase tracking-widest animate-in fade-in zoom-in duration-500">
              <Zap size={10} className="fill-emerald-600" />
              Smart Sort
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
