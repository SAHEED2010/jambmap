import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(distance: number): string {
  if (!distance || distance === Infinity) return "";
  return distance < 1
    ? `${(distance * 1000).toFixed(0)}m`
    : `${distance.toFixed(1)}km`;
}

export const escapeRegex = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
