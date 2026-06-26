import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDateShort, formatTime, timeAgo } from "@/lib/utils";
import { siteHeroBg, siteFeatureBg } from "@/lib/site-config";
import {
  getFeaturedNews,
  getLatestNews,
  getModalities,
  getNextMatch,
  getRecentResults,
  getStandings,
  getTransfers,
} from "@/lib/services/data-service";

const apiSportsKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;

export default async function HomePage() {
  // Fetch all data in parallel for the home page using the data service
  const [
    nextMatch,
    recentResults,
    standings,
    featuredNews,
    latestNews,
    modalities,
    transfers,
  ] = await Promise.all([
    getNextMatch(),
    getRecentResults(3),
    getStandings(),
    getFeaturedNews(),
    getLatestNews(3),
    getModalities(),
    getTransfers(),
  ]);

  return (
    <div className="overflow-hidden">
      {/* ============================
          HERO SECTION
          ============================ */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-fade-in"
            style={{
              backgroundImage: `url('${siteHeroBg}')`,
            }}
          />
          <div className="hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-sporting-dark/80 via-transparent to-transparent" />
        </div>

        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-sporting-green rounded-full animate-pulse-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.3 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container-sporting text-center py-20 md:py-32">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-sporting-green rounded-full animate-pulse" />
              <span className="text-white/80 text-xs md:text-sm font-medium uppercase tracking-wider">
                Sporting CP FAN WebSite
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-tight mb-6">
              Sporting
              <br />
              <span className="gradient-text">Clube de Portugal</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 md:mb-5 leading-relaxed">
              Acompanha todas as novidades, jogos, resultados e classificações
              do teu clube do coração em todas as modalidades.
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-8">
              Projeto criado com paixão por um fã e amante do Sporting Clube de
              Portugal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/jogos" className="btn-primary text-base px-8 py-4 shadow-xl shadow-sporting-green/30">
                📅 Ver Jogos
              </Link>
              <Link href="/noticias" className="btn-secondary text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-sporting-dark">
                📰 Últimas Notícias
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce-slow" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url('${siteFeatureBg}')` }}
        />
        <div className="absolute inset-0 bg-sporting-dark/75" />
        <div className="relative z-10 container-sporting text-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="badge-green mb-3">VISUAL PREMIUM</p>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
              O Sporting em imagens grandes e de alta qualidade
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-8">
              Aproveite um novo ambiente mais imersivo com fundos fortes e dinâmicos — ideal para mostrar o clube com impacto visual em todos os dispositivos.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-xl font-semibold mb-2">Fundo de destaque</h3>
                <p className="text-sm text-white/75">
                  A imagem de hero agora usa um visual de alta qualidade, com contraste e estilo que realçam o conteúdo principal.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-xl font-semibold mb-2">Galeria Premium</h3>
                <p className="text-sm text-white/75">
                  Você pode trocar as imagens base a qualquer momento, mantendo o site exclusivo e com identidade própria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          NEXT MATCH SECTION
          ============================ */}
      {/*
        NOTE: The original scroll-reveal animations were removed because this is now a Server Component.
        To re-implement them, you can wrap sections in a Client Component
        that uses an Intersection Observer (e.g., <AnimateOnScroll>...</AnimateOnScroll>).
      */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-sporting-dark dark:to-gray-900">
        <div className="container-sporting">
          {nextMatch && (
            <div className="text-center mb-12">
              <span className="badge-green mb-3">🔵 PRÓXIMO JOGO</span>
              <h2 className="section-title text-center">{nextMatch.competition}</h2>
              <div className="flex justify-center mt-3">
                <div className="section-divider" />
              </div>
            </div>
          )}

          {nextMatch && (
            <div className="max-w-2xl mx-auto">
              <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sporting-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sporting-green/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  {/* Date & Time */}
                  <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
                    <span>📅 {formatDateShort(nextMatch.date)}</span>
                    <span>•</span>
                    <span>⏰ {formatTime(nextMatch.time)}</span>
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-3 gap-4 items-center mb-6">
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold font-heading text-sporting-dark dark:text-white">
                        {nextMatch.homeTeam}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-sporting-green rounded-full flex items-center justify-center mx-auto shadow-xl shadow-sporting-green/30">
                        <span className="text-2xl md:text-3xl text-white font-black">VS</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg md:text-xl font-bold font-heading text-sporting-dark dark:text-white">
                        {nextMatch.awayTeam}
                      </p>
                    </div>
                  </div>

                  {/* Stadium */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    🏟️ {nextMatch.stadium}
                  </p>

                  {/* Round */}
                  {nextMatch.round && (
                    <p className="text-xs font-medium text-sporting-green dark:text-sporting-green-light uppercase tracking-wider">
                      {nextMatch.round}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-sporting-dark text-white">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">✨ WIDGET AO VIVO</span>
            <h2 className="section-title">Informação Oficial da Equipa</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {apiSportsKey ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-6 text-center">
                  <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                    Widget de API-SPORTS com dados oficiais do Sporting CP. Atualiza automaticamente com a informação disponível na API.
                  </p>
                </div>

                <div className="space-y-6">
                  <api-sports-widget
                    data-type="config"
                    data-key={apiSportsKey}
                    data-sport="football"
                    data-theme="dark"
                    data-lang="pt"
                  />
                  <api-sports-widget
                    data-type="team"
                    data-team-id="228"
                    data-theme="dark"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-gray-200 mb-4">
                  Para ativar o widget ao vivo, configure a variável de ambiente <code>NEXT_PUBLIC_API_FOOTBALL_KEY</code>.
                </p>
                <p className="text-sm text-gray-400">
                  O widget utiliza a chave pública da API-SPORTS e é carregado via <code>https://widgets.api-sports.io/3.1.0/widgets.js</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-sporting-dark text-white">
        <div className="container-sporting">
          <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.32em] text-sporting-green/80 mb-3">
                  Mercado de Transferências
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
                  Últimas movimentações do Sporting CP
                </h2>
              </div>

              <div className="space-y-4">
                {transfers.length > 0 ? (
                  transfers.slice(0, 3).map((transfer) => (
                    <div
                      key={transfer.id}
                      className="rounded-3xl border border-white/10 bg-sporting-dark/60 p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] font-semibold text-sporting-green/80 mb-2">
                            {transfer.transferType || "Transferência"}
                          </p>
                          <h3 className="text-xl font-semibold text-white">
                            {transfer.playerName}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {transfer.fromTeam} → {transfer.toTeam}
                          </p>
                        </div>
                        <div className="text-sm text-right text-gray-400">
                          <p>{formatDateShort(transfer.transferDate)}</p>
                          <p>{transfer.marketValue || "Valor não disponível"}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-sporting-dark/60 p-8 text-center">
                    <p className="text-gray-300">
                      Nenhuma transferência recente disponível no momento.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center">
                <Link href="/transfers" className="btn-primary px-8 py-4 text-base">
                  Ver todas as transferências
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-8 text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-sporting-green/80 mb-3">
                  Widget Oficial
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
                  Dados oficiais do time
                </h2>
              </div>

              {apiSportsKey ? (
                <div className="space-y-6">
                  <api-sports-widget
                    data-type="config"
                    data-key={apiSportsKey}
                    data-sport="football"
                    data-theme="dark"
                    data-lang="pt"
                  />
                  <api-sports-widget
                    data-type="team"
                    data-team-id="228"
                    data-theme="dark"
                  />
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-sporting-dark/60 p-8 text-center">
                  <p className="text-gray-200 mb-4">
                    Configure <code>NEXT_PUBLIC_API_FOOTBALL_KEY</code> para ativar o widget ao vivo.
                  </p>
                  <p className="text-sm text-gray-400">
                    O widget carrega via <code>https://widgets.api-sports.io/3.1.0/widgets.js</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          LATEST RESULTS
          ============================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-red mb-3">🔴 ÚLTIMOS RESULTADOS</span>
            <h2 className="section-title">Últimos Jogos</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentResults.map((match) => (
              <div
                key={match.id}
                className="match-card group cursor-default"
              >
                <span className="badge-gray text-xs mb-3">
                  {match.competition}
                </span>
                <div className="grid grid-cols-3 gap-2 items-center w-full mb-3">
                  <p className="match-team text-right text-xs">{match.homeTeam}</p>
                  <div className="match-score text-sporting-green dark:text-sporting-green-light">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <p className="match-team text-left text-xs">{match.awayTeam}</p>
                </div>
                <p className="match-time">
                  {formatDateShort(match.date)} • {formatTime(match.time)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/jogos" className="btn-secondary">
              Ver Todos os Jogos →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          STANDINGS SECTION
          ============================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          <div className="text-center mb-12">
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
                {standings.map((team) => (
                  <tr
                    key={team.position}
                    className={cn(
                      "transition-colors duration-200",
                      team.position <= 1 && "bg-sporting-green/5 dark:bg-sporting-green/10"
                    )}
                  >
                    <td className="text-center font-bold">
                      <span className={team.position <= 1 ? "text-sporting-green" : ""}>
                        {team.position}º
                      </span>
                    </td>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        {team.position <= 1 && <span>🏆</span>}
                        <span className={team.position <= 1 ? "font-bold" : ""}>
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
                    <td className="text-center font-medium">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                    <td className="text-center font-bold text-lg text-sporting-green">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================
          FEATURED NEWS
          ============================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">📰 EM DESTAQUE</span>
            <h2 className="section-title">Últimas Notícias</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Featured News */}
            {featuredNews && (
              <div className="news-card group row-span-2">
                <div className="relative overflow-hidden h-64 md:h-96">
                  <Image
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    fill
                    className="news-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="badge-green mb-2 inline-block">{featuredNews.category}</span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                      {featuredNews.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span>{featuredNews.source}</span>
                      <span>•</span>
                      <span>{timeAgo(featuredNews.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Latest News */}
            {latestNews.map((article) => (
              <div key={article.id} className="news-card group">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 sm:h-auto overflow-hidden relative">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="news-image object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <span className="badge-green text-xs mb-2 inline-block">{article.category}</span>
                    <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-sporting-dark dark:text-white line-clamp-2 group-hover:text-sporting-green dark:group-hover:text-sporting-green-light transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{timeAgo(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/noticias" className="btn-primary">
              Todas as Notícias →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          MODALITIES SECTION
          ============================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">🏅 MODALIDADES</span>
            <h2 className="section-title">Todas as Modalidades</h2>
            <div className="flex justify-center mt-3">
              <div className="section-divider" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((modality) => (
              <Link
                key={modality.id}
                href={`/modalidades#${modality.id}`}
                className="card-hover p-6 text-center group"
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
                {modality.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-medium text-sporting-green dark:text-sporting-green-light">
                      🏆 {modality.achievements[0].title} ({modality.achievements[0].year})
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/modalidades" className="btn-secondary">
              Ver Todas as Modalidades →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          CLUB STATS / CTA SECTION
          ============================ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-sporting-gradient" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-sporting text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            O Teu Clube, A Tua Paixão
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Mais de 100 anos de história, glória e paixão sportinguista.
            Faz parte desta família.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/plantel" className="btn-primary bg-white text-sporting-green hover:bg-gray-100 shadow-xl shadow-black/20">
              👥 Conhece o Plantel
            </Link>
            <Link
              href="/jogos#classificacao"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              📊 Ver Classificação
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { value: "1906", label: "Fundação" },
              { value: "19", label: "Campeonatos" },
              { value: "17", label: "Taças de Portugal" },
              { value: "50+", label: "Modalidades" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}