"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 10 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app was installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for 7 days
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  // Don't show if installed or dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed =
        (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[200] pointer-events-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Download className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Install JambPortal
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Access offline anytime
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Install this app on your device for quick access and offline
                functionality. Search for centers even without internet!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleInstall}
                  className="flex-1 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                  Install Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider transition-all active:scale-95"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
