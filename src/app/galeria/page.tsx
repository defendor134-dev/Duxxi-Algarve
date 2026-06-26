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
      <section className="relative py-20 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/3 w-80 h-80 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10 text-center">
          <span className="badge-green mb-3">📸 GALERIA</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">Galeria Multimédia</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Fotos e vídeos dos momentos mais marcantes da Directivo Algarve.
          </p>
        </div>
      </section>

      {/* Instagram Link */}
      <section className="py-8 bg-white dark:bg-sporting-dark">
        <div className="container-sporting text-center">
          <a href="https://www.instagram.com/duxxialgarve/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            📸 Ver mais fotos no Instagram @duxxialgarve
          </a>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          {photos.length > 0 ? (
            <div className="gallery-grid">
              {photos.map((photo) => (
                <div key={photo.id} className="gallery-item" onClick={() => setSelectedPhoto(photo.src)}>
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="gallery-overlay">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📸</p>
              <p className="text-gray-500 dark:text-gray-400">Nenhuma foto neste álbum ainda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedPhoto(null)}>
          <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10">&times;</button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image src={selectedPhoto} alt="Foto" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}