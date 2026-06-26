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
      {/* Page Header */}
      <section className="relative py-12 md:py-20 bg-sporting-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 container-sporting text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Modalidades
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conhece todas as modalidades do Sporting Clube de Portugal.
          </p>
        </div>
      </section>

      <div className="container-sporting py-8 md:py-12">
        {/* Main Modalities */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="section-title">Modalidades Principais</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainModalities.map((modality) => (
              <button
                key={modality.id}
                onClick={() => setSelectedModality(modality.id)}
                className={cn(
                  "card-hover p-6 text-center relative overflow-hidden group",
                  selectedModality === modality.id &&
                    "ring-2 ring-sporting-green shadow-lg shadow-sporting-green/20"
                )}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {modality.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-sporting-dark dark:text-white">
                  {modality.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {modality.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-medium text-sporting-green dark:text-sporting-green-light">
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
              <h2 className="section-title">Outras Modalidades</h2>
              <div className="flex justify-center mt-3">
                <div className="section-divider" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherModalities.map((modality) => (
                <button
                  key={modality.id}
                  onClick={() => setSelectedModality(modality.id)}
                  className={cn(
                    "card-hover p-6 text-center relative overflow-hidden group",
                    selectedModality === modality.id &&
                      "ring-2 ring-sporting-green shadow-lg shadow-sporting-green/20"
                  )}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {modality.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 text-sporting-dark dark:text-white">
                    {modality.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {modality.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Modality Detail */}
        {selectedModalityData && (
          <div id={selectedModalityData.id} className="card p-6 md:p-8 mt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-sporting-green/10 dark:bg-sporting-green-light/10 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl md:text-6xl">{selectedModalityData.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-sporting-dark dark:text-white mb-3">
                  {selectedModalityData.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {selectedModalityData.description}
                </p>

                {/* Achievements */}
                <h3 className="font-heading font-semibold text-lg mb-4 text-sporting-dark dark:text-white">
                  🏆 Títulos & Conquistas
                </h3>
                <div className="space-y-3">
                  {selectedModalityData.achievements.map((achievement) => (
                    <div
                      key={`${achievement.year}-${achievement.title}`}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-sporting-green/10 dark:bg-sporting-green-light/10 rounded-full flex items-center justify-center text-sm font-bold text-sporting-green dark:text-sporting-green-light">
                        {achievement.year}
                      </div>
                      <div>
                        <p className="font-semibold text-sporting-dark dark:text-white">
                          {achievement.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
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