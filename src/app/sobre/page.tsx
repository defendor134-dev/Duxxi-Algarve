import Link from "next/link";
import { claqueInfo } from "@/lib/site-config";
import { claqueTimeline, claqueLeaders } from "@/data/mockData";

export const metadata = { title: "Sobre Nós" };

export default function SobrePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10 text-center">
          <span className="badge-green mb-3">SOBRE NÓS</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">{claqueInfo.fullName}</h1>
          <p className="text-xl text-sporting-green-light font-semibold mb-6">{claqueInfo.motto}</p>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">{claqueInfo.description}</p>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark" id="missao">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title">Missão e Valores</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Missão", desc: "Unir todos os sportinguistas do Algarve, promovendo o apoio ao Sporting Clube de Portugal e fortalecendo os laços de amizade entre os membros da claque." },
              { icon: "👁️", title: "Visão", desc: "Ser a claque de referência no Algarve, reconhecida pela paixão, organização e espírito de união no apoio ao Sporting CP." },
              { icon: "💚", title: "Valores", desc: "Paixão pelo Sporting, amizade, responsabilidade, inclusão, respeito e espírito de equipa dentro e fora dos estádios." },
            ].map((item) => (
              <div key={item.title} className="card-hover p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900" id="historia">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title">A Nossa História</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Conhece o percurso da Directivo Algarve desde a fundação</p>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="relative">
            <div className="timeline-line" />
            <div className="space-y-12">
              {claqueTimeline.map((item, index) => (
                <div key={item.year} className={`timeline-card ${index % 2 === 0 ? "timeline-card-left" : "timeline-card-right"}`}>
                  <div className="timeline-dot" />
                  <div className="card-hover p-6 ml-4 md:ml-0">
                    <span className="badge-green mb-2">{item.year}</span>
                    <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direção */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          <div className="text-center mb-12">
            <h2 className="section-title">Direção</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Conhece a equipa que lidera a Directivo Algarve</p>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {claqueLeaders.map((leader) => (
              <div key={leader.name} className="card-hover p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sporting-green/10 flex items-center justify-center">
                  <span className="text-3xl">🦁</span>
                </div>
                <h3 className="font-heading font-bold text-sporting-dark dark:text-white">{leader.name}</h3>
                <p className="text-sm text-sporting-green dark:text-sporting-green-light font-medium">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sporting-green to-sporting-green-light text-white text-center">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Queres Fazer Parte?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Junta-te à Directivo Algarve e sê mais um leão orgulhoso no Algarve!</p>
          <Link href="/socios" className="btn-gold text-lg px-10 py-4">🦁 Torna-te Sócio</Link>
        </div>
      </section>
    </div>
  );
}