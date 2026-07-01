"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockNews } from "@/data/mockData";
import { timeAgo } from "@/lib/utils";

const categories = ["Todas", "Futebol", "Futsal", "Andebol", "Atletismo", "Formação"];

export default function NoticiasPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = mockNews.filter((article) => {
    const categoryMatch = activeCategory === "Todas" || article.category === activeCategory;
    const searchMatch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredArticle = mockNews.find((a) => a.isFeatured);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">NOTÍCIAS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Notícias
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Fica a par de todas as novidades do Sporting CP e da Directivo Algarve.
          </p>
        </div>
      </section>

      <div className="container-ultra py-8 md:py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input-ultra pl-12"
                aria-label="Pesquisar notícias"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 border",
                activeCategory === category
                  ? "bg-ultra-green text-white border-ultra-green"
                  : "bg-transparent text-gray-600 border-ultra-gray hover:text-white hover:border-ultra-green"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && activeCategory === "Todas" && searchQuery === "" && (
          <div className="news-card-ultra mb-8">
            <div className="relative h-64 md:h-96 overflow-hidden">
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                fill
                className="news-image-ultra object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-ultra-green">{featuredArticle.category}</span>
                  <span className="text-xs text-gray-600 font-heading font-semibold uppercase tracking-wider">{featuredArticle.source}</span>
                  <span className="text-xs text-gray-700">{timeAgo(featuredArticle.publishedAt)}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 max-w-2xl text-sm md:text-base font-sans">
                  {featuredArticle.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-600 text-sm font-sans">
              Tenta alterar os filtros ou pesquisa por outros termos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredNews.map((article) => (
              <div key={article.id} className="news-card-ultra group">
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="news-image-ultra object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-ultra-green">{article.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-heading font-semibold uppercase tracking-wider mb-2">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{timeAgo(article.publishedAt)}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-white line-clamp-2 group-hover:text-ultra-green-bright transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}