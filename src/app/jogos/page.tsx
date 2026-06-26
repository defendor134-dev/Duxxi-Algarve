"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockMatches, mockStandings } from "@/data/mockData";
import { formatDateShort, formatTime, getMatchStatus } from "@/lib/utils";

type MatchFilter = "all" | "scheduled" | "finished" | "live";
type ModalityFilter = "all" | "futebol" | "futsal" | "andebol";

export default function JogosPage() {
  const [matchFilter, setMatchFilter] = useState<MatchFilter>("all");
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>("all");

  const filteredMatches = mockMatches.filter((match) => {
    const statusMatch = matchFilter === "all" || match.status === matchFilter;
    const modalityMap: Record<ModalityFilter, string | null> = {
      all: null,
      futebol: "Futebol",
      futsal: "Futsal",
      andebol: "Andebol",
    };
    const modalityCondition = modalityMap[modalityFilter];
    const modalityMatch = !modalityCondition || match.modality === modalityCondition;
    return statusMatch && modalityMatch;
  });

  const matchFilters: { key: MatchFilter; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "scheduled", label: "Próximos" },
    { key: "live", label: "Ao Vivo" },
    { key: "finished", label: "Resultados" },
  ];

  const modalityFilters: { key: ModalityFilter; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "futebol", label: "Futebol" },
    { key: "futsal", label: "Futsal" },
    { key: "andebol", label: "Andebol" },
  ];

  // Separate live matches for highlighting
  const liveMatches = filteredMatches.filter((m) => m.status === "live");
  const displayMatches = liveMatches.length > 0
    ? [...liveMatches, ...filteredMatches.filter((m) => m.status !== "live")]
    : filteredMatches;

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
            Jogos & Resultados
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Acompanha todos os jogos do Sporting CP em todas as modalidades.
          </p>
        </div>
      </section>

      <div className="container-sporting py-8 md:py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {matchFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setMatchFilter(filter.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  matchFilter === filter.key
                    ? "bg-sporting-green text-white shadow-lg shadow-sporting-green/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {filter.key === "live" && "🔴 "}
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {modalityFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setModalityFilter(filter.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  modalityFilter === filter.key
                    ? "bg-sporting-green text-white shadow-lg shadow-sporting-green/25"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="space-y-4">
          {displayMatches.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">
                Nenhum jogo encontrado
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tenta alterar os filtros para ver mais jogos.
              </p>
            </div>
          ) : (
            displayMatches.map((match) => {
              const status = getMatchStatus(match.status);
              return (
                <div
                  key={match.id}
                  className={cn(
                    "card p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6",
                    match.status === "live" && "ring-2 ring-red-500 animate-pulse-slow"
                  )}
                >
                  {/* Status Badge */}
                  <div className="flex-shrink-0 w-full md:w-24 text-center">
                    <span
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                        status.color === "bg-red-500" && "bg-red-500 text-white",
                        status.color === "bg-gray-500" && "bg-gray-500 text-white",
                        status.color === "bg-blue-500" && "bg-blue-500 text-white",
                        status.color === "bg-yellow-500" && "bg-yellow-500 text-white"
                      )}
                    >
                      {status.text}
                    </span>
                  </div>

                  {/* Date & Competition */}
                  <div className="flex-shrink-0 text-center md:text-left w-full md:w-32">
                    <p className="text-sm font-semibold text-sporting-dark dark:text-white">
                      {formatDateShort(match.date)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(match.time)}
                    </p>
                  </div>

                  {/* Teams & Score */}
                  <div className="flex-1 flex items-center justify-center gap-4 md:gap-8">
                    <div className="text-right flex-1">
                      <p className={cn(
                        "text-sm md:text-base font-bold",
                        match.homeScore !== undefined && match.homeScore > (match.awayScore || 0)
                          ? "text-sporting-green dark:text-sporting-green-light"
                          : "text-sporting-dark dark:text-white"
                      )}>
                        {match.homeTeam}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-center">
                      {match.homeScore !== undefined ? (
                        <div className="text-xl md:text-2xl font-black font-heading text-sporting-green dark:text-sporting-green-light">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      ) : (
                        <div className="text-sm font-semibold text-gray-400">VS</div>
                      )}
                    </div>

                    <div className="text-left flex-1">
                      <p className={cn(
                        "text-sm md:text-base font-bold",
                        match.awayScore !== undefined && match.awayScore > (match.homeScore || 0)
                          ? "text-sporting-green dark:text-sporting-green-light"
                          : "text-sporting-dark dark:text-white"
                      )}>
                        {match.awayTeam}
                      </p>
                    </div>
                  </div>

                  {/* Competition & Stadium */}
                  <div className="flex-shrink-0 text-right w-full md:w-48">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {match.competition}
                    </p>
                    {match.stadium && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        🏟️ {match.stadium}
                      </p>
                    )}
                    {match.round && (
                      <p className="text-xs font-medium text-sporting-green dark:text-sporting-green-light mt-1">
                        {match.round}
                      </p>
                    )}
                  </div>

                  {/* Modality badge */}
                  <div className="flex-shrink-0">
                    <span className="badge-green text-xs">
                      {match.modality}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Standings Section */}
        <section id="classificacao" className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <span className="badge-green mb-3">🏆 CLASSIFICAÇÃO</span>
            <h2 className="section-title">Liga Portugal Betclic</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="standings-table w-full">
              <thead>
                <tr className="border-b-2 border-gray-100 dark:border-gray-700">
                  <th className="text-center w-12">#</th>
                  <th>Equipa</th>
                  <th className="text-center">J</th>
                  <th className="text-center">V</th>
                  <th className="text-center">E</th>
                  <th className="text-center">D</th>
                  <th className="text-center">GM</th>
                  <th className="text-center">GS</th>
                  <th className="text-center">DG</th>
                  <th className="text-center font-bold">P</th>
                </tr>
              </thead>
              <tbody>
                {mockStandings.map((team) => (
                  <tr
                    key={team.position}
                    className={cn(
                      "transition-colors duration-200",
                      team.team === "Sporting CP" && "bg-sporting-green/5 dark:bg-sporting-green/10 font-bold"
                    )}
                  >
                    <td className="text-center">{team.position}º</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {team.position <= 1 && <span>🏆</span>}
                        <span className={team.team === "Sporting CP" ? "text-sporting-green" : ""}>
                          {team.team}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">{team.played}</td>
                    <td className="text-center text-green-600">{team.won}</td>
                    <td className="text-center text-gray-500">{team.drawn}</td>
                    <td className="text-center text-red-500">{team.lost}</td>
                    <td className="text-center">{team.goalsFor}</td>
                    <td className="text-center">{team.goalsAgainst}</td>
                    <td className="text-center">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                    <td className="text-center font-bold text-lg text-sporting-green">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}