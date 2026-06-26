import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDateShort, formatTime } from "@/lib/utils";
import { siteHeroBg, siteLogo, claqueInfo } from "@/lib/site-config";
import { getFeaturedNews, getLatestNews, getNextMatch, getRecentResults, getStandings } from "@/lib/services/data-service";
import { claqueStats } from "@/data/mockData";

export default async function HomePage() {
  const [nextMatch, recentResults, standings, featuredNews, latestNews] = await Promise.all([
    getNextMatch(),
    getRecentResults(3),
    getStandings(),
    getFeaturedNews(),
    getLatestNews(3),
  ]);

  return (
    <div className="overflow-hidden">
      {/* ============================
          HERO SECTION
          ============================ */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-fade-in" style={{ backgroundImage: `url('${siteHeroBg}')` }} />
          <div className="hero-overlay-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-sporting-dark/80 via-transparent to-transparent" />
        </div>

        {/* Animated Lion overlay pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute text-white text-4xl font-black select-none" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 360}deg)`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${4 + Math.random() * 4}s`, opacity: 0.1 + Math.random() * 0.2 }}>🦁</div>
          ))}
        </div>

        <div className="relative z-10 container-sporting text-center py-20 md:py-32">
          <div className="animate-fade-in">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sporting-green/50 shadow-xl shadow-sporting-green/30">
              <Image src={siteLogo} alt={claqueInfo.fullName} width={128} height={128} className="object-contain w-full h-full" />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-sporting-green rounded-full animate-pulse" />
              <span className="text-white/80 text-xs md:text-sm font-medium uppercase tracking-wider">Claque Oficial • Sporting CP • Algarve</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-tight mb-4">
              {claqueInfo.fullName}
            </h1>
            <p className="text-xl md:text-2xl text-sporting-green-light font-semibold mb-2">{claqueInfo.motto}</p>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {claqueInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/socios" className="btn-primary text-base px-8 py-4 shadow-xl shadow-sporting-green/30 text-lg">
                🦁 Torna-te Sócio
              </Link>
              <Link href="/deslocacoes" className="btn-outline-white text-lg">
                🚌 Próximas Deslocações
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          STATS SECTION
          ============================ */}
      <section className="py-12 relative bg-gradient-to-r from-sporting-green to-sporting-green-light">
        <div className="container-sporting">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {claqueStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-5xl font-heading font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm md:text-base text-white/80 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          NEXT MATCH
          ============================ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-sporting-dark dark:to-gray-900">
        <div className="container-sporting">
          {nextMatch && (
            <div className="text-center mb-12">
              <span className="badge-green mb-3">🔵 PRÓXIMO JOGO DO SPORTING</span>
              <h2 className="section-title text-center">{nextMatch.competition}</h2>
              <div className="flex justify-center mt-3"><div className="section-divider" /></div>
            </div>
          )}
          {nextMatch && (
            <div className="max-w-2xl mx-auto">
              <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sporting-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sporting-green/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
                    <span>📅 {formatDateShort(nextMatch.date)}</span><span>•</span><span>⏰ {formatTime(nextMatch.time)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center mb-6">
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold font-heading text-sporting-dark dark:text-white">{nextMatch.homeTeam}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-sporting-green rounded-full flex items-center justify-center mx-auto shadow-xl shadow-sporting-green/30">
                        <span className="text-2xl md:text-3xl text-white font-black">VS</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg md:text-xl font-bold font-heading text-sporting-dark dark:text-white">{nextMatch.awayTeam}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">🏟️ {nextMatch.stadium}</p>
                  {nextMatch.round && <p className="text-xs font-medium text-sporting-green dark:text-sporting-green-light uppercase tracking-wider">{nextMatch.round}</p>}
                  <div className="mt-6">
                    <Link href="/deslocacoes" className="btn-primary">🚌 Ver Deslocações</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================
          QUEM SOMOS (Preview)
          ============================ */}
      <section className="py-16 md:py-20 bg-sporting-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-3">SOBRE NÓS</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Quem Somos</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A <strong className="text-sporting-green-light">Directivo Algarve</strong> nasceu da paixão de um grupo de amigos sportinguistas do Algarve que queriam levar o apoio ao Sporting CP a um novo nível.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Somos uma claque oficial, reconhecida pelo Sporting Clube de Portugal, com membros espalhados por todo o Algarve. Organizamos deslocações, convívios e atividades que unem todos os sportinguistas da região.
              </p>
              <Link href="/sobre" className="btn-primary">Saber Mais →</Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {["🦁", "⚽", "🤝", "🏆"].map((emoji, i) => (
                  <div key={i} className="card-dark p-6 text-center">
                    <div className="text-4xl mb-3">{emoji}</div>
                    <p className="text-sm text-gray-300 font-medium">{
                      ["Paixão pelo Sporting", "Amor ao Futebol", "União e Amizade", "Vitórias Juntos"][i]
                    }</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          FEATURED NEWS
          ============================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">📰 NOTÍCIAS DA CLAQUE</span>
            <h2 className="section-title">Últimas Novidades</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {featuredNews && (
              <div className="news-card group row-span-2">
                <div className="relative overflow-hidden h-64 md:h-96">
                  <Image src={featuredNews.imageUrl} alt={featuredNews.title} fill className="news-image object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="badge-green mb-2 inline-block">{featuredNews.category}</span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">{featuredNews.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span>{featuredNews.source}</span><span>•</span><span>{featuredNews.publishedAt ? new Date(featuredNews.publishedAt).toLocaleDateString("pt-PT") : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {latestNews.map((article) => (
              <div key={article.id} className="news-card group">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 sm:h-auto overflow-hidden relative">
                    <Image src={article.imageUrl} alt={article.title} fill className="news-image object-cover" />
                  </div>
                  <div className="flex-1 p-5">
                    <span className="badge-green text-xs mb-2 inline-block">{article.category}</span>
                    <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-sporting-dark dark:text-white line-clamp-2 group-hover:text-sporting-green transition-colors">{article.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{article.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{article.source}</span><span>•</span><span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("pt-PT") : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/noticias" className="btn-primary">Todas as Notícias →</Link>
          </div>
        </div>
      </section>

      {/* ============================
          STANDINGS
          ============================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <span className="badge-green mb-3">🏆 CLASSIFICAÇÃO</span>
            <h2 className="section-title">Liga Portugal Betclic</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="standings-table w-full">
              <thead>
                <tr className="border-b-2 border-gray-100 dark:border-gray-700">
                  <th className="text-center w-12">#</th><th>Equipa</th>
                  <th className="text-center">J</th><th className="text-center">V</th><th className="text-center">E</th><th className="text-center">D</th>
                  <th className="text-center">GM</th><th className="text-center">GS</th><th className="text-center">DG</th><th className="text-center font-bold">P</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team) => (
                  <tr key={team.position} className={cn("transition-colors duration-200", team.position <= 1 && "bg-sporting-green/5 dark:bg-sporting-green/10")}>
                    <td className="text-center font-bold"><span className={team.position <= 1 ? "text-sporting-green" : ""}>{team.position}º</span></td>
                    <td className="font-medium"><div className="flex items-center gap-2">{team.position <= 1 && <span>🏆</span>}<span className={team.position <= 1 ? "font-bold" : ""}>{team.team}</span></div></td>
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
          CTA - TORNA-TE SÓCIO
          ============================ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 container-sporting text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sporting-green flex items-center justify-center shadow-xl shadow-sporting-green/30">
            <span className="text-4xl">🦁</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Faz Parte Desta Família</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Junta-te à Directivo Algarve e vive o Sporting como nunca antes. Sê parte da maior claque sportinguista do Algarve!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/socios" className="btn-primary bg-white text-sporting-green hover:bg-gray-100 shadow-xl shadow-black/20 text-lg px-10 py-4">🦁 Torna-te Sócio</Link>
            <Link href="/contactos" className="btn-outline-white text-lg px-10 py-4">📧 Fala Connosco</Link>
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
            <h2 className="section-title">Últimos Jogos do Sporting</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentResults.map((match) => (
              <div key={match.id} className="match-card group cursor-default">
                <span className="badge-gray text-xs mb-3">{match.competition}</span>
                <div className="grid grid-cols-3 gap-2 items-center w-full mb-3">
                  <p className="match-team text-right text-xs">{match.homeTeam}</p>
                  <div className="match-score text-sporting-green dark:text-sporting-green-light">{match.homeScore} - {match.awayScore}</div>
                  <p className="match-team text-left text-xs">{match.awayTeam}</p>
                </div>
                <p className="match-time">{formatDateShort(match.date)} • {formatTime(match.time)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/jogos" className="btn-secondary">Ver Todos os Jogos →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}