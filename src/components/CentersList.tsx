"use client";

import React from "react";
import { JambCenter } from "@/types/center";
import { CenterItem } from "./CenterItem";
import { StatsBar } from "./StatsBar";
import { SearchX, FilterX, ListFilter, Zap } from "lucide-react";
import { CentersListSkeleton } from "./Skeletons";
import { EmptyState } from "./ui/EmptyState";

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
          <EmptyState onReset={() => window.location.reload()} />
        )}
      </div>
    </div>
  );
};
