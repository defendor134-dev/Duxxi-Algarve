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

  const urlPosition = searchParams.get("position") || "Todas";
  const urlQuery = searchParams.get("query") || "";

  const [searchInputValue, setSearchInputValue] = useState(urlQuery);
  const [debouncedSearchQuery] = useDebounce(searchInputValue, 400);

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

  useEffect(() => {
    if (debouncedSearchQuery !== urlQuery) {
      const newQueryString = createQueryString("query", debouncedSearchQuery);
      router.push(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [debouncedSearchQuery, urlQuery, createQueryString, router, pathname]);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        const response = await fetch(`/api/squad?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setAllPlayers(data.data);
        }
      } catch {
        setAllPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, [searchParams]);

  const groupedPlayers = useMemo(() => groupByPosition(allPlayers), [allPlayers]);
  const positionOrder = ["Guarda-Redes", "Defesa", "Médio", "Avançado"];
  const groupedInOrder = positionOrder
    .filter((pos) => groupedPlayers[pos])
    .map((pos) => ({ position: pos, players: groupedPlayers[pos] }));

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">PLANTEL</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Plantel
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Conhece todos os jogadores do Sporting CP.
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
                placeholder="Pesquisar jogador..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="form-input-ultra pl-12"
                aria-label="Pesquisar jogador"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm">🔍</span>
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
                "px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 border",
                urlPosition === position
                  ? "bg-ultra-green text-white border-ultra-green"
                  : "bg-transparent text-gray-600 border-ultra-gray hover:text-white hover:border-ultra-green"
              )}
            >
              {position}
            </button>
          ))}
        </div>

        {/* Player Count */}
        <div className="mb-6 text-sm text-gray-600 font-heading font-semibold uppercase tracking-wider">
          {allPlayers.length} jogador{allPlayers.length !== 1 ? "es" : ""} encontrado{allPlayers.length !== 1 ? "s" : ""}
        </div>

        {/* Squad Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-2 border-ultra-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-sm font-heading font-semibold uppercase tracking-wider">A carregar plantel...</p>
          </div>
        ) : groupedInOrder.length > 0 ? (
          groupedInOrder.map(({ position, players }) => (
            <div key={position} className="mb-10">
              <h3 className="font-heading font-bold text-xl text-white mb-6 uppercase tracking-tight">
                {position === "Guarda-Redes" ? "🧤 " : position === "Defesa" ? "🛡️ " : position === "Médio" ? "⚡ " : "🎯 "}
                {position}
                <span className="text-sm font-normal text-gray-600 ml-2">({players.length})</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className={cn(
                      "card-ultra-hover p-4 text-center",
                      selectedPlayer?.id === player.id && "border-ultra-green-bright"
                    )}
                  >
                    <span className="block text-3xl font-heading font-black text-ultra-green-bright/30 mb-2">#{player.number}</span>
                    
                    <div className="relative w-20 h-20 mx-auto mb-3 border-2 border-ultra-green/30 flex items-center justify-center overflow-hidden bg-ultra-dark">
                      {player.imageUrl ? (
                        <Image src={player.imageUrl} alt={player.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <span className="text-xl font-black text-white font-heading">
                          {player.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-sm text-white mb-1 leading-tight">{player.name}</h4>

                    <div className="flex items-center justify-center gap-2">
                      <span className={cn(
                        "text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 border",
                        getPositionColorClass(player.position)
                      )}>
                        {player.position === "Guarda-Redes" ? "GR" : 
                         player.position === "Defesa" ? "DF" : 
                         player.position === "Médio" ? "MD" : "AV"}
                      </span>
                      <span className="text-[10px] text-gray-600 font-heading font-semibold">{player.nationality}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Nenhum jogador encontrado</h3>
            <p className="text-gray-600 text-sm font-sans">Tenta alterar os filtros ou pesquisa por outros termos.</p>
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="card-ultra max-w-lg w-full p-6 md:p-8 relative border-ultra-green/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 w-8 h-8 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-4 border-2 border-ultra-green flex items-center justify-center bg-ultra-dark overflow-hidden">
                {selectedPlayer.imageUrl ? (
                  <Image src={selectedPlayer.imageUrl} alt={selectedPlayer.name} fill className="object-cover" sizes="96px" />
                ) : (
                  <span className="text-3xl font-black text-white font-heading">
                    {selectedPlayer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>

              <div className="text-6xl font-black text-ultra-green/10 leading-none mb-2">#{selectedPlayer.number}</div>
              
              <h2 className="text-2xl font-heading font-bold text-white mb-1">{selectedPlayer.name}</h2>
              <span className={cn(
                "inline-block text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 border",
                getPositionColorClass(selectedPlayer.position)
              )}>
                {selectedPlayer.position}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Nacionalidade", value: selectedPlayer.nationality },
                { label: "Idade", value: `${selectedPlayer.age} anos` },
                { label: "Altura", value: `${selectedPlayer.height} cm` },
                { label: "Peso", value: `${selectedPlayer.weight} kg` },
              ].map((item) => (
                <div key={item.label} className="bg-ultra-dark border border-ultra-gray p-3 text-center">
                  <p className="text-[10px] text-gray-600 font-heading font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-heading font-bold text-white text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}