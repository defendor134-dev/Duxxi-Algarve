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

    mockMatches.forEach((match) => {
      if (match.homeTeam.toLowerCase().includes(q) || match.awayTeam.toLowerCase().includes(q) || match.competition.toLowerCase().includes(q)) {
        searchResults.push({ type: "jogo", title: `${match.homeTeam} vs ${match.awayTeam}`, description: `${match.competition} - ${match.date}`, href: "/jogos", icon: "⚽" });
      }
    });

    mockNews.forEach((article) => {
      if (article.title.toLowerCase().includes(q) || article.description.toLowerCase().includes(q) || article.category.toLowerCase().includes(q)) {
        searchResults.push({ type: "noticia", title: article.title, description: `${article.category} • ${article.source}`, href: "/noticias", icon: "📰" });
      }
    });

    mockSquad.forEach((player) => {
      if (player.name.toLowerCase().includes(q) || player.position.toLowerCase().includes(q) || player.nationality.toLowerCase().includes(q)) {
        searchResults.push({ type: "jogador", title: player.name, description: `#${player.number} • ${player.position} • ${player.nationality}`, href: "/plantel", icon: "👤" });
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
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-ultra-dark border border-ultra-gray overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative border-b border-ultra-gray">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-gray-600">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar jogos, notícias, jogadores..."
            className="w-full px-12 py-5 bg-transparent text-white placeholder-gray-600 focus:outline-none text-lg font-sans"
            aria-label="Pesquisar"
          />
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 border border-ultra-gray flex items-center justify-center text-sm text-gray-500 hover:text-white hover:border-ultra-green transition-colors" aria-label="Fechar pesquisa">
            ✕
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query ? (
            results.length > 0 ? (
              <div className="p-2">
                {results.map((result, i) => (
                  <Link key={i} href={result.href} onClick={onClose} className="flex items-start gap-3 p-3 hover:bg-ultra-gray/50 transition-colors group">
                    <span className="text-xl flex-shrink-0">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-white text-sm group-hover:text-ultra-green-bright transition-colors truncate">{result.title}</p>
                      <p className="text-xs text-gray-600 font-sans truncate">{result.description}</p>
                    </div>
                    <span className={cn(
                      "text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-1 flex-shrink-0 border",
                      result.type === "jogo" && "border-blue-500/30 text-blue-400",
                      result.type === "noticia" && "border-yellow-500/30 text-yellow-400",
                      result.type === "jogador" && "border-ultra-green/30 text-ultra-green-bright"
                    )}>
                      {result.type === "jogo" ? "Jogo" : result.type === "noticia" ? "Notícia" : "Jogador"}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-3xl mb-3">🔍</div>
                <p className="text-gray-600 font-heading font-bold text-sm uppercase tracking-wider">Nenhum resultado encontrado</p>
                <p className="text-xs text-gray-700 font-sans mt-1">Tenta pesquisar por outros termos</p>
              </div>
            )
          ) : (
            <div className="p-6 text-center text-sm text-gray-600 font-sans">
              <div className="mb-2">💡</div>
              <p>Pesquisa por jogos, notícias, jogadores...</p>
              <div className="flex justify-center gap-4 mt-3 text-[10px] text-gray-700 font-heading font-semibold uppercase tracking-wider">
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