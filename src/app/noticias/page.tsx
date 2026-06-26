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
      {/* Page Header */}
      <section className="relative py-12 md:py-20 bg-sporting-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 container-sporting text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Notícias
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Fica a par de todas as novidades do Sporting CP.
          </p>
        </div>
      </section>

      <div className="container-sporting py-8 md:py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sporting-dark dark:text-white focus:ring-2 focus:ring-sporting-green focus:border-transparent outline-none transition-all duration-200"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-sporting-green text-white shadow-lg shadow-sporting-green/25"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && activeCategory === "Todas" && searchQuery === "" && (
          <div className="news-card group mb-8">
            <div className="relative h-64 md:h-96 overflow-hidden">
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                fill
                className="news-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-green">{featuredArticle.category}</span>
                  <span className="text-xs text-gray-300">{featuredArticle.source}</span>
                  <span className="text-xs text-gray-400">{timeAgo(featuredArticle.publishedAt)}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-200 max-w-2xl text-sm md:text-base">
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
            <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tenta alterar os filtros ou pesquisa por outros termos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <div key={article.id} className="news-card group">
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="news-image object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-green">{article.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{timeAgo(article.publishedAt)}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-sporting-dark dark:text-white line-clamp-2 group-hover:text-sporting-green dark:group-hover:text-sporting-green-light transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    className="inline-flex items-center gap-1 text-sm font-medium text-sporting-green dark:text-sporting-green-light hover:underline mt-3"
                  >
                    Ler mais →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}