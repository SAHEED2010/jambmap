"use client";

import React from "react";
import { motion } from "framer-motion";

export const CenterSkeleton = () => {
  return (
    <div className="relative rounded-3xl p-6 mb-4 border-2 border-slate-50 bg-white/50 animate-pulse">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-slate-100 rounded-xl"></div>
            <div className="h-6 w-24 bg-slate-100 rounded-xl"></div>
            <div className="h-6 w-16 bg-slate-100 rounded-xl ml-auto"></div>
          </div>
          <div className="space-y-2.5">
            <div className="h-7 w-[85%] bg-slate-200 rounded-lg"></div>
            <div className="flex items-start gap-2.5">
              <div className="h-5 w-5 bg-slate-100 rounded-lg shrink-0"></div>
              <div className="h-4 w-[60%] bg-slate-100 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 flex-1 bg-slate-200 rounded-2xl"></div>
          <div className="h-12 w-28 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="px-6 py-6 border-b border-slate-100/50 flex items-center justify-between gap-6 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-2 w-12 bg-slate-100 rounded"></div>
            <div className="h-3 w-16 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CentersListSkeleton = () => {
  return (
    <div className="flex flex-col">
      <StatsSkeleton />
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="h-4 w-32 bg-slate-100 rounded"></div>
        <div className="h-6 w-20 bg-primary/5 rounded-xl border border-primary/10"></div>
      </div>
      <div className="p-6 lg:p-8 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <CenterSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
