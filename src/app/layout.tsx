import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "JAMB Center Locator 2025",
  description:
    "Find your nearest JAMB registration center for 2025. Works offline with smart proximity search.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JambPortal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JambPortal" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
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
