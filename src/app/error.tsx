"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 border-2 border-ultra-red flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-heading font-black text-ultra-red">!</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight mb-4">
          Algo Correu Mal
        </h1>
        <p className="text-gray-500 text-sm font-sans mb-8 leading-relaxed">
          Ocorreu um erro inesperado. A nossa equipa foi notificada.
          Tenta novamente ou volta mais tarde.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={reset} className="btn-ultra glow-green-hover">
            TENTAR NOVAMENTE
          </button>
          <a href="/" className="btn-ultra-outline">
            PÁGINA INICIAL
          </a>
        </div>
      </div>
    </div>
  );
}