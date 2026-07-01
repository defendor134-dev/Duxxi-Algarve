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
      <div className="max-w-5xl mx-auto bg-ultra-dark border border-ultra-gray p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🍪</span>
              <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Cookies</h3>
            </div>
            <p className="text-sm text-gray-500 font-sans">
              Utilizamos cookies para melhorar a tua experiência no site.
              Ao continuares, aceitas a nossa política de privacidade.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-heading font-bold uppercase tracking-wider text-gray-500 hover:text-white border border-ultra-gray hover:border-ultra-green transition-colors"
            >
              Recusar
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-heading font-bold uppercase tracking-wider bg-ultra-green text-white hover:bg-black hover:text-ultra-green-bright border-2 border-ultra-green transition-all duration-200"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}