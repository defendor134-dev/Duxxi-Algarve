"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/data/mockData";

export default function GaleriaPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photos = galleryPhotos;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">GALERIA</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Momentos
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Fotos e vídeos dos momentos mais marcantes da Directivo Algarve.
          </p>
        </div>
      </section>

      {/* Instagram Link */}
      <section className="py-8 bg-ultra-dark border-b border-ultra-gray">
        <div className="container-ultra text-center">
          <a href="https://www.instagram.com/duxxialgarve/" target="_blank" rel="noopener noreferrer" className="btn-ultra text-xs px-8 py-3">
            @DUXXIALGARVE NO INSTAGRAM
          </a>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-black">
        <div className="container-ultra">
          {photos.length > 0 ? (
            <div className="gallery-grid-ultra">
              {photos.map((photo) => (
                <div key={photo.id} className="gallery-item-ultra" onClick={() => setSelectedPhoto(photo.src)}>
                  <Image src={photo.src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="gallery-overlay-ultra">
                    <span className="text-white text-2xl font-heading font-black">+</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-sm font-heading font-bold uppercase tracking-wider">Nenhuma foto disponível.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedPhoto(null)}>
          <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl z-10 font-heading font-bold">
            FECHAR [X]
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image src={selectedPhoto} alt="Foto" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}