"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { groupByPosition, getPositionColorClass } from "@/lib/utils";
import type { Player } from "@/types";

const positions = ["Todas", "Guarda-Redes", "Defesa", "Médio", "Avançado"];

export default function PlantelPage() {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State is now derived from URL search params
  const urlPosition = searchParams.get("position") || "Todas";
  const urlQuery = searchParams.get("query") || "";

  // Local state for the controlled input, debounced before updating URL
  const [searchInputValue, setSearchInputValue] = useState(urlQuery);
  const [debouncedSearchQuery] = useDebounce(searchInputValue, 400); // 400ms delay

  // Function to update URL search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "Todas") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  // Effect to update URL when debounced search query changes
  useEffect(() => {
    // Only push to router history if the debounced value is different from the current URL query
    if (debouncedSearchQuery !== urlQuery) {
      const newQueryString = createQueryString("query", debouncedSearchQuery);
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [debouncedSearchQuery, urlQuery, createQueryString, router, pathname]);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        // Pass URL params to the API fetch call
        // This effect now runs when the URL (searchParams) changes
        const params = new URLSearchParams(searchParams.toString());
        const response = await fetch(`/api/squad?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setAllPlayers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setAllPlayers([]); // Clear players on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
    // Re-fetch whenever search params change
  }, [searchParams]);

  // Group by position for organized display
  const groupedPlayers = useMemo(() => groupByPosition(allPlayers), [allPlayers]);

  // Position order
  const positionOrder = ["Guarda-Redes", "Defesa", "Médio", "Avançado"];
  const groupedInOrder = positionOrder
    .filter((pos) => groupedPlayers[pos])
    .map((pos) => ({ position: pos, players: groupedPlayers[pos] }));

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
            Plantel
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conhece todos os jogadores do Sporting CP.
          </p>
        </div>
      </section>

      <div className="container-sporting py-8 md:py-12">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar jogador..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sporting-dark dark:text-white focus:ring-2 focus:ring-sporting-green focus:border-transparent outline-none transition-all duration-200"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Position Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() =>
                router.push(pathname + "?" + createQueryString("position", position), { scroll: false })
              }
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                urlPosition === position
                  ? "bg-sporting-green text-white shadow-lg shadow-sporting-green/25"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              {position}
            </button>
          ))}
        </div>

        {/* Player Count */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {allPlayers.length} jogador{allPlayers.length !== 1 ? "es" : ""} encontrado{allPlayers.length !== 1 ? "s" : ""}
        </div>

        {/* Squad Grid grouped by position */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sporting-green mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              A carregar plantel...
            </p>
          </div>
        ) : groupedInOrder.length > 0 ? (
          groupedInOrder.map(({ position, players }) => (
            <div key={position} className="mb-10">
              <h3 className="font-heading font-bold text-xl mb-6 text-sporting-dark dark:text-white">
                {position === "Guarda-Redes" ? "🧤 " : position === "Defesa" ? "🛡️ " : position === "Médio" ? "⚡ " : "🎯 "}
                {position}
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({players.length})
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className={cn(
                      "player-card",
                      selectedPlayer?.id === player.id && "ring-2 ring-sporting-green"
                    )}
                  >
                    <span className="player-number">{player.number}</span>
                    
                    {/* Player Avatar */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-sporting-green to-sporting-green-light flex items-center justify-center shadow-lg overflow-hidden">
                      {player.imageUrl ? (
                        <Image
                          src={player.imageUrl}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-2xl md:text-3xl font-black text-white font-heading">
                          {player.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm md:text-base text-sporting-dark dark:text-white mb-1 leading-tight">
                      {player.name}
                    </h4>

                    <div className="flex items-center justify-center gap-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full border",
                        getPositionColorClass(player.position)
                      )}>
                        {player.position === "Guarda-Redes" ? "GR" : 
                         player.position === "Defesa" ? "DF" : 
                         player.position === "Médio" ? "MD" : "AV"}
                      </span>
                      <span className="text-xs text-gray-400">{player.nationality}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">
              Nenhum jogador encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tenta alterar os filtros ou pesquisa por outros termos.
            </p>
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="card max-w-lg w-full p-6 md:p-8 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              {/* Player Avatar (large) with fallback */}
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-sporting-green to-sporting-green-light flex items-center justify-center shadow-xl shadow-sporting-green/30 overflow-hidden">
                {selectedPlayer.imageUrl ? (
                  <Image
                    src={selectedPlayer.imageUrl}
                    alt={selectedPlayer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-white font-heading">
                    {selectedPlayer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="text-6xl font-black text-sporting-green/10 dark:text-sporting-green-light/10 leading-none mb-2">
                #{selectedPlayer.number}
              </div>
              
              <h2 className="text-2xl font-heading font-bold text-sporting-dark dark:text-white mb-1">
                {selectedPlayer.name}
              </h2>
              <span className={cn(
                "inline-block text-sm font-medium px-3 py-1 rounded-full border",
                getPositionColorClass(selectedPlayer.position)
              )}>
                {selectedPlayer.position}
              </span>
            </div>

            {/* Player Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nacionalidade</p>
                <p className="font-semibold text-sporting-dark dark:text-white">{selectedPlayer.nationality}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Idade</p>
                <p className="font-semibold text-sporting-dark dark:text-white">{selectedPlayer.age} anos</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Altura</p>
                <p className="font-semibold text-sporting-dark dark:text-white">{selectedPlayer.height} cm</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Peso</p>
                <p className="font-semibold text-sporting-dark dark:text-white">{selectedPlayer.weight} kg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}