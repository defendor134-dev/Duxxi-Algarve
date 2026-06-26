"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "accepted");
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  const handleReject = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "rejected");
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300",
        isAnimatingOut ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="max-w-5xl mx-auto bg-sporting-dark dark:bg-gray-900 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🍪</span>
              <h3 className="font-heading font-semibold text-white">Cookies</h3>
            </div>
            <p className="text-sm text-gray-400">
              Utilizamos cookies para melhorar a tua experiência no site.
              Ao continuares, aceitas a nossa{" "}
              <a href="#" className="text-sporting-green-light hover:underline">
                política de privacidade
              </a>
              .
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
            >
              Recusar
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-sporting-green text-white hover:bg-sporting-green-light transition-colors shadow-lg shadow-sporting-green/25"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}