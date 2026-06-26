"use client";

import { deslocacoesData } from "@/data/mockData";
import { claqueInfo } from "@/lib/site-config";

export default function DeslocacoesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10 text-center">
          <span className="badge-green mb-3">🚌 DESLOCAÇÕES</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">Próximas Deslocações</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Viaja connosco para apoiar o Sporting CP. As inscrições são feitas através do nosso Instagram.
          </p>
        </div>
      </section>

      {/* Info de Inscrição */}
      <section className="py-8 bg-sporting-green/10 border-y-2 border-sporting-green">
        <div className="container-sporting text-center">
          <p className="text-lg font-semibold text-sporting-dark dark:text-white mb-2">
            📱 Para te inscreveres, envia-nos uma mensagem privada no Instagram
          </p>
          <a href={claqueInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            📸 @duxxialgarve
          </a>
        </div>
      </section>

      {/* Lista de Deslocações */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-sporting">
          <div className="grid gap-6 max-w-4xl mx-auto">
            {deslocacoesData.map((trip) => (
              <div key={trip.id} className="card-hover p-6 md:p-8 relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white ${trip.estado === "aberto" ? "bg-sporting-green" : "bg-red-500"}`}>
                  {trip.estado === "aberto" ? "✅ Inscrições Abertas" : "❌ Lotado"}
                </div>
                <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">{trip.jogo}</h3>
                    <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <p>📅 {trip.data} às {trip.hora}</p>
                      <p>🏟️ {trip.estadio}</p>
                      <p>📍 Ponto de encontro: {trip.localPartida} às {trip.horaPartida}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="badge-green">{trip.vagas - trip.vagasOcupadas} vagas disponíveis</span>
                      <span className="text-lg font-bold text-sporting-green">{trip.preco}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden min-w-[120px]">
                      <div className="h-full bg-sporting-green rounded-full transition-all duration-500" style={{ width: `${(trip.vagasOcupadas / trip.vagas) * 100}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{trip.vagasOcupadas}/{trip.vagas} ocupados</p>
                    <a
                      href={claqueInfo.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all text-center ${trip.estado === "aberto" ? "btn-primary" : "bg-gray-400 text-white cursor-not-allowed"}`}
                    >
                      {trip.estado === "aberto" ? "📝 Inscrever-me" : "Lotado"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info para não-sócios */}
      <section className="py-16 bg-white dark:bg-sporting-dark">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title">Ainda não és sócio?</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="max-w-2xl mx-auto card-hover p-8 text-center">
            <div className="text-5xl mb-4">🦁</div>
            <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-3">Torna-te sócio e garante o teu lugar</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Como sócio, tens prioridade nas deslocações e acesso a benefícios exclusivos. Envia-nos uma mensagem para saberes mais!
            </p>
            <a href={claqueInfo.contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              📸 Quero ser Sócio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}