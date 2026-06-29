"use client";

import { deslocacoesData } from "@/data/mockData";
import { claqueInfo } from "@/lib/site-config";

export default function DeslocacoesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">DESLOCAÇÕES</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Próximas Deslocações
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Viaja connosco para apoiar o Sporting CP. As inscrições são feitas através do nosso Instagram.
          </p>
        </div>
      </section>

      {/* Info de Inscrição */}
      <section className="py-8 bg-ultra-dark border-b border-ultra-green/30">
        <div className="container-ultra text-center">
          <p className="text-sm font-heading font-bold text-ultra-green-bright uppercase tracking-wider mb-4">
            INSCRIÇÃO VIA INSTAGRAM
          </p>
          <a href={claqueInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-ultra text-xs px-8 py-3">
            @DUXXIALGARVE
          </a>
        </div>
      </section>

      {/* Lista de Deslocações */}
      <section className="py-20 bg-black">
        <div className="container-ultra">
          <div className="grid gap-3 max-w-4xl mx-auto">
            {deslocacoesData.map((trip) => (
              <div key={trip.id} className="card-ultra p-6 md:p-8 relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-1.5 text-[9px] font-heading font-bold uppercase tracking-widest text-white ${trip.estado === "aberto" ? "bg-ultra-green" : "bg-ultra-red"}`}>
                  {trip.estado === "aberto" ? "ABERTO" : "LOTADO"}
                </div>
                <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">{trip.jogo}</h3>
                    <div className="space-y-1.5 text-xs text-gray-600 font-heading font-semibold uppercase tracking-wider mb-4">
                      <p>{trip.data} às {trip.hora}</p>
                      <p>🏟️ {trip.estadio}</p>
                      <p>📍 {trip.localPartida} às {trip.horaPartida}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="badge-ultra-green text-[10px]">{trip.vagas - trip.vagasOcupadas} vagas</span>
                      <span className="text-2xl font-heading font-black text-ultra-green-bright">{trip.preco}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[140px]">
                    <div className="progress-bar-ultra">
                      <div className="progress-bar-ultra-fill" style={{ width: `${(trip.vagasOcupadas / trip.vagas) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-600 font-heading font-bold uppercase tracking-wider text-center">{trip.vagasOcupadas}/{trip.vagas} ocupados</p>
                    <a
                      href={claqueInfo.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center text-xs font-heading font-bold uppercase tracking-wider px-6 py-3 transition-all duration-200 ${trip.estado === "aberto" ? "btn-ultra glow-green-hover" : "bg-ultra-gray text-gray-700 cursor-not-allowed"}`}
                    >
                      {trip.estado === "aberto" ? "INSCREVER" : "LOTADO"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info para não-sócios */}
      <section className="py-20 bg-ultra-dark border-t border-ultra-gray">
        <div className="container-ultra-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title-ultra">Ainda não és sócio?</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="max-w-2xl mx-auto card-ultra p-8 text-center border-ultra-green/20">
            <h3 className="text-xl font-heading font-bold text-white mb-4">Torna-te sócio e garante o teu lugar</h3>
            <p className="text-gray-500 text-sm font-sans mb-8">
              Como sócio, tens prioridade nas deslocações e acesso a benefícios exclusivos.
            </p>
            <a href={claqueInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-ultra">
              QUERO SER SÓCIO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}