import Link from "next/link";
import { claqueInfo } from "@/lib/site-config";
import { claqueTimeline, claqueLeaders } from "@/data/mockData";

export const metadata = { title: "Sobre Nós" };

export default function SobrePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">SOBRE NÓS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            {claqueInfo.shortName}
          </h1>
          <p className="text-lg text-ultra-green-bright font-heading font-bold uppercase tracking-[0.15em] mb-6">
            {claqueInfo.motto}
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed font-sans">
            {claqueInfo.description}
          </p>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 bg-ultra-dark" id="missao">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">Missão e Valores</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: "Missão", desc: "Unir todos os sportinguistas do Algarve, promovendo o apoio ao Sporting Clube de Portugal e fortalecendo os laços de amizade entre os membros da claque." },
              { title: "Visão", desc: "Ser a claque de referência no Algarve, reconhecida pela paixão, organização e espírito de união no apoio ao Sporting CP." },
              { title: "Valores", desc: "Paixão pelo Sporting, amizade, responsabilidade, inclusão, respeito e espírito de equipa dentro e fora dos estádios." },
            ].map((item) => (
              <div key={item.title} className="card-ultra-hover p-8 text-center">
                <h3 className="text-2xl font-heading font-black text-ultra-green-bright uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-black" id="historia">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">A Nossa História</h2>
            <p className="text-gray-600 text-sm font-sans mt-2">Conhece o percurso da Directivo Algarve desde a fundação</p>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="relative">
            <div className="timeline-line-ultra" />
            <div className="space-y-12">
              {claqueTimeline.map((item, index) => (
                <div key={item.year} className={`timeline-card-ultra ${index % 2 === 0 ? "timeline-card-left-ultra" : "timeline-card-right-ultra"}`}>
                  <div className="timeline-dot-ultra" />
                  <div className="card-ultra-hover p-6 ml-4 md:ml-0">
                    <span className="badge-ultra-green mb-3">{item.year}</span>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-sans">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direção */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">Direção</h2>
            <p className="text-gray-600 text-sm font-sans mt-2">Conhece a equipa que lidera a Directivo Algarve</p>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {claqueLeaders.map((leader) => (
              <div key={leader.name} className="card-ultra-hover p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border border-ultra-green/50 flex items-center justify-center">
                  <span className="text-2xl font-heading font-black text-ultra-green-bright">DA</span>
                </div>
                <h3 className="font-heading font-bold text-white">{leader.name}</h3>
                <p className="text-xs text-ultra-green-bright font-heading font-bold uppercase tracking-wider mt-1">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black border-t border-ultra-gray text-center">
        <div className="container-ultra-narrow">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Queres Fazer Parte?
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-2xl mx-auto font-sans">Junta-te à Directivo Algarve e sê mais um leão orgulhoso no Algarve!</p>
          <Link href="/socios" className="btn-ultra text-base px-12 py-5 glow-green-hover">
            SER SÓCIO
          </Link>
        </div>
      </section>
    </div>
  );
}