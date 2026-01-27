"use client";

import React from "react";
import { JambCenter } from "@/types/center";
import { CenterItem } from "./CenterItem";
import { StatsBar } from "./StatsBar";
import { SearchX, FilterX, ListFilter, Zap } from "lucide-react";
import { CentersListSkeleton } from "./Skeletons";

interface CentersListProps {
  centers: JambCenter[];
  searchQuery: string;
  onSelectCenter: (center: JambCenter) => void;
  onNavigate?: (center: JambCenter) => void;
  selectedCenterId?: number;
  selectedState: string;
  isLoading?: boolean;
}

export const CentersList: React.FC<CentersListProps> = ({
  centers,
  searchQuery,
  onSelectCenter,
  onNavigate,
  selectedCenterId,
  selectedState,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-transparent">
        <CentersListSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-transparent min-h-[400px]">
      <StatsBar centers={centers} selectedState={selectedState} />

      <div className="flex-1 overflow-y-auto scroll-smooth">
        {centers.length > 0 ? (
          <div className="flex flex-col">
            <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListFilter size={14} className="text-slate-400 stroke-[3px]" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
                  Found Centers
                </span>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                {centers.length} Result{centers.length !== 1 ? "s" : ""}
              </span>
            </div>
            {/* Spotlight Section */}
            {centers.length > 0 &&
              centers[0].distance &&
              centers[0].distance !== Infinity && (
                <div className="px-6 lg:px-8 pt-8 pb-2 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-4 px-1">
                    <Zap
                      size={14}
                      className="text-emerald-500 fill-emerald-500"
                    />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                      Best Match Spotlight
                    </span>
                  </div>
                  <CenterItem
                    key={`spotlight-${centers[0].sn}`}
                    center={centers[0]}
                    searchQuery={searchQuery}
                    index={-1}
                    onSelect={() => onSelectCenter(centers[0])}
                    onNavigate={() => onNavigate?.(centers[0])}
                    isSelected={selectedCenterId === centers[0].sn}
                    isBestMatch={true}
                  />
                  <div className="h-px w-full bg-slate-200/50 my-10"></div>
                  <div className="flex items-center gap-2 mb-6 px-1">
                    <ListFilter
                      size={14}
                      className="text-slate-400 stroke-[3px]"
                    />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Explore Other Options
                    </span>
                  </div>
                </div>
              )}

            <div className="flex flex-col p-6 lg:p-8">
              {centers.map((center, index) => {
                const hasSpotlight =
                  centers[0].distance && centers[0].distance !== Infinity;
                if (hasSpotlight && index === 0) return null;

                const isNearest =
                  index === 0 &&
                  center.distance &&
                  center.distance !== Infinity;
                return (
                  <CenterItem
                    key={center.sn}
                    center={center}
                    searchQuery={searchQuery}
                    index={index}
                    onSelect={() => onSelectCenter(center)}
                    onNavigate={() => onNavigate?.(center)}
                    isSelected={selectedCenterId === center.sn}
                    isBestMatch={!!isNearest}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="relative mb-10">
              <div className="absolute -inset-6 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium">
                <SearchX
                  size={64}
                  strokeWidth={1.5}
                  className="text-slate-200"
                />
              </div>
            </div>
            <h3 className="text-2xl font-black text-indigo-950 tracking-tight">
              No Centers Found
            </h3>
            <p className="text-slate-500 max-w-[260px] mt-4 text-sm font-medium leading-relaxed">
              We couldn't find any centers matching your selection. Try
              adjusting your filters.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 border border-slate-200"
            >
              Reset All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
