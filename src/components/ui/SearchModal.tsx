"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockMatches, mockNews, mockSquad } from "@/data/mockData";

interface SearchResult {
  type: "jogo" | "noticia" | "jogador";
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search matches
    mockMatches.forEach((match) => {
      if (
        match.homeTeam.toLowerCase().includes(q) ||
        match.awayTeam.toLowerCase().includes(q) ||
        match.competition.toLowerCase().includes(q)
      ) {
        searchResults.push({
          type: "jogo",
          title: `${match.homeTeam} vs ${match.awayTeam}`,
          description: `${match.competition} - ${match.date}`,
          href: "/jogos",
          icon: "⚽",
        });
      }
    });

    // Search news
    mockNews.forEach((article) => {
      if (
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
      ) {
        searchResults.push({
          type: "noticia",
          title: article.title,
          description: `${article.category} • ${article.source}`,
          href: "/noticias",
          icon: "📰",
        });
      }
    });

    // Search players
    mockSquad.forEach((player) => {
      if (
        player.name.toLowerCase().includes(q) ||
        player.position.toLowerCase().includes(q) ||
        player.nationality.toLowerCase().includes(q)
      ) {
        searchResults.push({
          type: "jogador",
          title: player.name,
          description: `#${player.number} • ${player.position} • ${player.nationality}`,
          href: "/plantel",
          icon: "👤",
        });
      }
    });

    setResults(searchResults.slice(0, 10));
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative border-b border-gray-100 dark:border-gray-700">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-gray-400">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar jogos, notícias, jogadores..."
            className="w-full px-12 py-5 bg-transparent text-sporting-dark dark:text-white placeholder-gray-400 focus:outline-none text-lg"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query ? (
            results.length > 0 ? (
              <div className="p-2">
                {results.map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    onClick={onClose}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <span className="text-xl flex-shrink-0">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sporting-dark dark:text-white text-sm group-hover:text-sporting-green dark:group-hover:text-sporting-green-light transition-colors truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {result.description}
                      </p>
                    </div>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full flex-shrink-0",
                      result.type === "jogo" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                      result.type === "noticia" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
                      result.type === "jogador" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    )}>
                      {result.type === "jogo" ? "Jogo" : result.type === "noticia" ? "Notícia" : "Jogador"}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-3xl mb-3">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Nenhum resultado encontrado
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Tenta pesquisar por outros termos
                </p>
              </div>
            )
          ) : (
            <div className="p-6 text-center text-sm text-gray-400">
              <div className="mb-2">💡</div>
              <p>Pesquisa por jogos, notícias, jogadores...</p>
              <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                <span>⚽ Sporting vs Porto</span>
                <span>📰 Gyökeres</span>
                <span>👤 Coates</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}