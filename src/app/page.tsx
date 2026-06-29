import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDateShort, formatTime } from "@/lib/utils";
import { siteHeroBg, claqueInfo } from "@/lib/site-config";
import { getFeaturedNews, getLatestNews, getNextMatch, getStandings } from "@/lib/services/data-service";
import { claqueStats } from "@/data/mockData";

export default async function HomePage() {
  const [nextMatch, standings, featuredNews, latestNews] = await Promise.all([
    getNextMatch(),
    getStandings(),
    getFeaturedNews(),
    getLatestNews(3),
  ]);

  return (
    <div>
      {/* ============================
          HERO — ULTRA
          ============================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" 
               style={{ backgroundImage: `url('${siteHeroBg}')`, filter: "grayscale(100%) brightness(0.3)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 ultra-stripe" />
        </div>

        <div className="relative z-10 container-ultra text-center py-32">
          <div className="mb-4">
            <span className="badge-ultra-green">Claque Ultra • Sporting CP • Algarve</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-white uppercase leading-none tracking-tighter mb-4">
            {claqueInfo.shortName}
          </h1>
          <p className="text-lg md:text-xl text-ultra-green-bright font-heading font-bold uppercase tracking-[0.15em] mb-6">
            {claqueInfo.motto}
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            O Directivo Algarve é o núcleo regional do Directivo Ultras XXI no sul do país. 
            Coerência, Honra e Fidelidade — eis a nossa mentalidade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/socios" className="btn-ultra text-base px-10 py-5 glow-green-hover">
              SER SÓCIO
            </Link>
            <Link href="/deslocacoes" className="btn-ultra-outline text-base px-10 py-5">
              PRÓXIMAS DESLOCAÇÕES
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-ultra-green to-transparent animate-fade-in" />
        </div>
      </section>

      {/* ============================
          STATS — ULTRA
          ============================ */}
      <section className="py-16 bg-black border-t border-b border-ultra-gray">
        <div className="container-ultra">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {claqueStats.map((stat) => (
              <div key={stat.label} className="text-center border-r border-ultra-gray last:border-r-0">
                <div className="text-4xl md:text-6xl font-heading font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-600 font-heading font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          NEXT MATCH — ULTRA
          ============================ */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra">
          {nextMatch && (
            <div className="text-center mb-12">
              <span className="badge-ultra-green mb-4">PRÓXIMA BATALHA</span>
              <h2 className="section-title-ultra">{nextMatch.competition}</h2>
              <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
            </div>
          )}
          {nextMatch && (
            <div className="max-w-2xl mx-auto">
              <div className="card-ultra p-10 md:p-14 text-center border-ultra-green/20 glow-green">
                <div className="flex items-center justify-center gap-2 text-gray-600 font-heading font-semibold text-xs uppercase tracking-wider mb-8">
                  <span>{formatDateShort(nextMatch.date)}</span>
                  <span className="w-4 h-[1px] bg-ultra-gray" />
                  <span>{formatTime(nextMatch.time)}</span>
                </div>
                <div className="grid grid-cols-3 gap-6 items-center mb-8">
                  <div className="text-right">
                    <p className="text-lg md:text-2xl font-heading font-black text-white uppercase">{nextMatch.homeTeam}</p>
                  </div>
                  <div className="text-center">
                    <div className="match-vs-ultra mx-auto">
                      <span>VS</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg md:text-2xl font-heading font-black text-white uppercase">{nextMatch.awayTeam}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-heading font-semibold uppercase tracking-wider mb-2">{nextMatch.stadium}</p>
                {nextMatch.round && <p className="text-[10px] font-heading font-bold text-ultra-green-bright uppercase tracking-[0.2em] mb-6">{nextMatch.round}</p>}
                <div className="mt-8">
                  <Link href="/deslocacoes" className="btn-ultra-outline text-xs px-8 py-3">
                    VER DESLOCAÇÕES
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================
          QUEM SOMOS — ULTRA
          ============================ */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 ultra-stripe opacity-30" />
        <div className="container-ultra relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge-ultra-green mb-4">QUEM SOMOS</span>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-8">
                Directivo<br />Algarve
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6 font-sans">
                <strong className="text-white">O Directivo Algarve</strong> é o núcleo regional do 
                <strong className="text-ultra-green-bright"> Directivo Ultras XXI</strong> no sul do país.
                Com o lema <strong className="text-white">Coerência, Honra e Fidelidade</strong>, 
                estendemos a mentalidade Ultra a todo o Algarve.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-10 font-sans">
                Percorremos quilómetros para apoiar o Sporting de norte a sul do país e pela Europa fora. 
                Apoiamos ativamente todas as modalidades do clube e organizamos ações de solidariedade social na região.
              </p>
              <Link href="/sobre" className="btn-ultra">
                SABER MAIS
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "COERÊNCIA", desc: "Entre o que se diz e o que se faz" },
                { title: "HONRA", desc: "O nome do Sporting não se mancha" },
                { title: "FIDELIDADE", desc: "Leal ao clube, leal ao grupo" },
                { title: "UNIÃO", desc: "Família ultra leonina" },
              ].map((item) => (
                <div key={item.title} className="card-ultra p-6 text-center border-ultra-green/10">
                  <p className="text-2xl font-heading font-black text-ultra-green-bright mb-2">{item.title}</p>
                  <p className="text-[10px] text-gray-600 font-heading font-bold uppercase tracking-[0.2em]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          FEATURED NEWS — ULTRA
          ============================ */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <span className="badge-ultra-green mb-4">ÚLTIMAS NOTÍCIAS</span>
            <h2 className="section-title-ultra">Novidades da Claque</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-10">
            {featuredNews && (
              <div className="news-card-ultra row-span-2 border-ultra-green/20">
                <div className="relative overflow-hidden h-64 md:h-96">
                  <img src={featuredNews.imageUrl} alt="" className="news-image-ultra object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="badge-ultra-green mb-3 inline-block">{featuredNews.category}</span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">{featuredNews.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-gray-600 font-heading font-semibold uppercase tracking-wider">
                      <span>{featuredNews.source}</span>
                      <span>{featuredNews.publishedAt ? new Date(featuredNews.publishedAt).toLocaleDateString("pt-PT") : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {latestNews.map((article) => (
              <div key={article.id} className="news-card-ultra">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-48 sm:h-auto overflow-hidden relative">
                    <img src={article.imageUrl} alt="" className="news-image-ultra object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 p-6">
                    <span className="badge-ultra-green text-[10px] mb-3 inline-block">{article.category}</span>
                    <h3 className="font-heading font-bold text-base text-white mb-2 line-clamp-2 hover:text-ultra-green-bright transition-colors">{article.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 font-sans">{article.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-700 font-heading font-semibold uppercase tracking-wider">
                      <span>{article.source}</span>
                      <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("pt-PT") : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/noticias" className="btn-ultra-outline text-xs px-8 py-3">
              TODAS AS NOTÍCIAS
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          STANDINGS — ULTRA
          ============================ */}
      <section className="py-20 bg-black">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <span className="badge-ultra-green mb-4">CLASSIFICAÇÃO</span>
            <h2 className="section-title-ultra">Liga Portugal Betclic</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="standings-table-ultra w-full">
              <thead>
                <tr>
                  <th>#</th><th>Equipa</th>
                  <th>J</th><th>V</th><th>E</th><th>D</th>
                  <th>GM</th><th>GS</th><th>DG</th><th>P</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team) => (
                  <tr key={team.position} className={cn(team.position <= 1 && "sporting-row")}>
                    <td className="text-center font-heading font-black">{team.position}º</td>
                    <td className="font-heading font-bold text-sm">{team.team}</td>
                    <td className="text-center">{team.played}</td>
                    <td className="text-center text-ultra-green-bright">{team.won}</td>
                    <td className="text-center text-gray-600">{team.drawn}</td>
                    <td className="text-center text-ultra-red">{team.lost}</td>
                    <td className="text-center">{team.goalsFor}</td>
                    <td className="text-center">{team.goalsAgainst}</td>
                    <td className="text-center font-heading font-bold">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                    <td className="text-center font-heading font-black text-ultra-green-bright text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================
          CTA — ULTRA
          ============================ */}
      <section className="relative py-24 overflow-hidden bg-black border-t border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ultra-green/5 via-transparent to-ultra-green/5" />
        <div className="relative z-10 container-ultra text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-ultra-green flex items-center justify-center">
            <span className="text-2xl font-heading font-black text-ultra-green-bright">DUXXI<br/>ALGARVE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Faz Parte Disto
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10 font-sans">
            Junta-te ao Directivo Algarve. Vive o Sporting com paixão, militância e espírito de grupo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/socios" className="btn-ultra text-base px-12 py-5 glow-green-hover">
              SER SÓCIO AGORA
            </Link>
            <Link href="/contactos" className="btn-ultra-outline text-base px-12 py-5">
              FALA CONNOSCO
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}