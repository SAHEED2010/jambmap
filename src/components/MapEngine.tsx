"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { JambCenter } from "@/types/center";

// Fix for default marker icons in Leaflet + React
// But we are using custom markers anyway
const customIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-primary/25 rounded-full animate-ping"></div>
          <div class="relative w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const userIcon = L.divIcon({
  className: "user-div-icon",
  html: `<div class="relative flex items-center justify-center">
          <div class="absolute w-10 h-10 bg-emerald-400/20 rounded-full animate-pulse"></div>
          <div class="relative w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-xl"></div>
        </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function MapController({
  center,
}: {
  center: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 15, {
        duration: 2,
        easeLinearity: 0.25,
      });
    }
  }, [center, map]);

  return null;
}

interface MapEngineProps {
  center: JambCenter | null;
  userLocation: { lat: number; lng: number } | null;
}

export default function MapEngine({ center, userLocation }: MapEngineProps) {
  const defaultCenter: [number, number] = [9.082, 8.6753]; // Nigeria Center
  const mapCenter =
    center?.lat && center?.lng
      ? ([center.lat, center.lng] as [number, number])
      : defaultCenter;

  return (
    <div className="w-full h-full bg-[#f1f5f9]">
      <MapContainer
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          />
        )}

        {center?.lat && center?.lng && (
          <Marker position={[center.lat, center.lng]} icon={customIcon} />
        )}

        <MapController
          center={
            center?.lat && center?.lng
              ? { lat: center.lat, lng: center.lng }
              : null
          }
        />
      </MapContainer>
    </div>
  );
}
