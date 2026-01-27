"use client";

import { useState, useMemo, useEffect } from "react";
import { JambCenter } from "@/types/center";
import { parseRawData } from "@/lib/parse-data";
import { rawDataString } from "@/data/centers";

// Haversine formula to calculate distance in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export function useCenters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<JambCenter | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for premium synchronization feel
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const allCenters = useMemo(() => parseRawData(rawDataString), []);

  const states = useMemo(() => {
    return Array.from(new Set(allCenters.map((c) => c.state))).sort();
  }, [allCenters]);

  const filteredCenters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let centers = allCenters.filter((center) => {
      const matchesSearch =
        center.centre_name.toLowerCase().includes(query) ||
        center.town.toLowerCase().includes(query);
      const matchesState = selectedState === "" || center.state === selectedState;
      return matchesSearch && matchesState;
    });

    if (userLocation) {
      // Calculate distance for each center and sort
      return centers
        .map((c) => ({
          ...c,
          distance: c.lat && c.lng 
            ? calculateDistance(userLocation.lat, userLocation.lng, c.lat, c.lng)
            : Infinity,
        }))
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    return centers;
  }, [allCenters, searchQuery, selectedState, userLocation]);

  return {
    allCenters,
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
  };
}
