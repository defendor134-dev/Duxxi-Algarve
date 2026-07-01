"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockModalities } from "@/data/mockData";

export default function ModalidadesPage() {
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const selectedModalityData = mockModalities.find((m) => m.id === selectedModality) || null;

  const mainModalities = mockModalities.filter((m) => m.category === "main");
  const otherModalities = mockModalities.filter((m) => m.category === "other");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">MODALIDADES</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Modalidades
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Conhece todas as modalidades do Sporting Clube de Portugal.
          </p>
        </div>
      </section>

      <div className="container-ultra py-8 md:py-12">
        {/* Main Modalities */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="section-title-ultra">Modalidades Principais</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mainModalities.map((modality) => (
              <button
                key={modality.id}
                onClick={() => setSelectedModality(modality.id)}
                className={cn(
                  "card-ultra-hover p-6 text-center relative overflow-hidden group",
                  selectedModality === modality.id && "border-ultra-green-bright"
                )}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {modality.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {modality.name}
                </h3>
                <p className="text-xs text-gray-600 font-sans line-clamp-2">
                  {modality.description}
                </p>
                <div className="mt-4 pt-4 border-t border-ultra-gray">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-ultra-green-bright">
                    🏆 {modality.achievements.length} títulos
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Other Modalities */}
        {otherModalities.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="section-title-ultra">Outras Modalidades</h2>
              <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherModalities.map((modality) => (
                <button
                  key={modality.id}
                  onClick={() => setSelectedModality(modality.id)}
                  className={cn(
                    "card-ultra-hover p-6 text-center relative overflow-hidden group",
                    selectedModality === modality.id && "border-ultra-green-bright"
                  )}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {modality.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {modality.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-sans line-clamp-2">
                    {modality.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Modality Detail */}
        {selectedModalityData && (
          <div className="card-ultra p-6 md:p-8 mt-8 border-ultra-green/30">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 border-2 border-ultra-green/30 flex items-center justify-center bg-ultra-dark">
                  <span className="text-5xl md:text-6xl">{selectedModalityData.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                  {selectedModalityData.name}
                </h2>
                <p className="text-gray-500 text-sm font-sans leading-relaxed mb-6">
                  {selectedModalityData.description}
                </p>

                <h3 className="font-heading font-bold text-lg text-white mb-4">
                  🏆 Títulos & Conquistas
                </h3>
                <div className="space-y-3">
                  {selectedModalityData.achievements.map((achievement) => (
                    <div key={`${achievement.year}-${achievement.title}`} className="flex items-start gap-3 p-3 bg-ultra-dark border border-ultra-gray">
                      <div className="flex-shrink-0 w-12 h-12 border border-ultra-green/30 flex items-center justify-center text-sm font-heading font-bold text-ultra-green-bright">
                        {achievement.year}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-600 font-sans mt-1">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}