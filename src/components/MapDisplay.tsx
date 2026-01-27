import { JambCenter } from "@/types/center";
import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";

const MapEngine = dynamic(() => import("./MapEngine"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-0">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative text-primary/40 animate-bounce"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
          Initializing Neural Map
        </span>
      </div>
    </div>
  ),
});

interface MapDisplayProps {
  center: JambCenter | null;
  userLocation?: { lat: number; lng: number } | null;
  isNavigating?: boolean;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({
  center,
  userLocation,
  isNavigating,
}) => {
  const getDirectionsUrl = () => {
    if (!center || !userLocation) return "";
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination =
      center.lat && center.lng
        ? `${center.lat},${center.lng}`
        : `${center.centre_name}, ${center.town}, ${center.state} State, Nigeria`;

    return `https://www.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&output=embed`;
  };

  return (
    <div className="absolute inset-0 bg-slate-100 flex flex-col overflow-hidden">
      {isNavigating && userLocation ? (
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-0">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl animate-pulse"></div>
                <Navigation className="w-12 h-12 text-rose-400/40 animate-bounce" />
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                Calculating Route...
              </span>
            </div>
          </div>
          <iframe
            key={`nav-${center?.sn}`}
            src={getDirectionsUrl()}
            className="absolute inset-0 w-full h-full border-0 z-10 transition-all duration-1000 opacity-0"
            allowFullScreen
            loading="lazy"
            title="JAMB Centers Navigation"
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          ></iframe>
        </div>
      ) : (
        <div className="flex-1 relative">
          <MapEngine center={center} userLocation={userLocation || null} />
        </div>
      )}
    </div>
  );
};
