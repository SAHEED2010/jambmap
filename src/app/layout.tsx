import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAMB Center Locator 2025",
  description: "Find your nearest JAMB regular registration center for 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased h-screen flex flex-col overflow-hidden bg-[#f8fafc] text-slate-900 font-sans`}
      >
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
