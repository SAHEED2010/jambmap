"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCenters } from "@/hooks/useCenters";
import { Header } from "@/components/Header";
import { CentersList } from "@/components/CentersList";
import { MapDisplay } from "@/components/MapDisplay";
import { CenterDetailsOverlay } from "@/components/CenterDetailsOverlay";

export default function Home() {
  const {
    filteredCenters,
    states,
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
    selectedCenter,
    setSelectedCenter,
    userLocation,
    isNavigating,
    setIsNavigating,
    isLoading,
  } = useCenters();

  const [showMobileList, setShowMobileList] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        states={states}
        userLocation={userLocation}
      />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Sidebar Section - Hidden on mobile unless toggled */}
        <aside
          className={`
            ${showMobileList ? "flex" : "hidden"} 
            lg:flex
            w-full lg:w-[420px] xl:w-[480px] 
            flex-col bg-white/80 backdrop-blur-3xl 
            border-r border-slate-200/50 z-20 shadow-deep overflow-hidden
            absolute lg:relative inset-0 lg:inset-auto
          `}
        >
          <CentersList
            centers={filteredCenters}
            searchQuery={searchQuery}
            onSelectCenter={(c) => {
              setSelectedCenter(c);
              setIsNavigating(false);
              setShowMobileList(false); // Close list on mobile after selection
            }}
            onNavigate={(c) => {
              setSelectedCenter(c);
              setIsNavigating(true);
              setShowMobileList(false); // Close list on mobile after navigation
            }}
            selectedCenterId={selectedCenter?.sn}
            selectedState={selectedState}
            isLoading={isLoading}
          />
        </aside>

        {/* Map Section */}
        <section className="flex-1 relative bg-slate-100 group">
          <MapDisplay
            center={selectedCenter}
            userLocation={userLocation}
            isNavigating={isNavigating}
          />

          <CenterDetailsOverlay
            center={selectedCenter}
            onClose={() => {
              setSelectedCenter(null);
              setIsNavigating(false);
            }}
            isNavigating={isNavigating}
            onNavigate={setIsNavigating}
          />

          {/* Mobile FAB - List Toggle */}
          <button
            onClick={() => setShowMobileList(!showMobileList)}
            className={`
              lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-30
              flex items-center gap-3 px-8 py-4 rounded-full
              bg-slate-900 text-white shadow-2xl shadow-slate-900/30
              font-bold text-sm uppercase tracking-wider
              transition-all active:scale-95
              ${showMobileList ? "bg-primary" : "bg-slate-900"}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showMobileList ? (
                <>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </>
              ) : (
                <>
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </>
              )}
            </svg>
            {showMobileList ? "View Map" : "View List"}
          </button>
        </section>
      </div>
    </div>
  );
}
