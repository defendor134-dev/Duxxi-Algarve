"use client";

import { useState } from "react";
import { deslocacoesData } from "@/data/mockData";
import { formatDateShort } from "@/lib/utils";

export default function DeslocacoesPage() {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

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
            Viaja connosco para apoiar o Sporting CP por todo o país. Todas as informações sobre viagens, preços e inscrições.
          </p>
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
                      <p>📅 {formatDateShort(trip.data)} às {trip.hora}</p>
                      <p>🏟️ {trip.estadio}</p>
                      <p>📍 Ponto de encontro: {trip.localPartida} às {trip.horaPartida}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="badge-green">{trip.vagas - trip.vagasOcupadas} vagas</span>
                      <span className="text-lg font-bold text-sporting-green">{trip.preco}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden min-w-[120px]">
                      <div className="h-full bg-sporting-green rounded-full transition-all duration-500" style={{ width: `${(trip.vagasOcupadas / trip.vagas) * 100}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{trip.vagasOcupadas}/{trip.vagas} ocupados</p>
                    <button
                      onClick={() => { setSelectedTrip(trip.id); setShowForm(true); }}
                      disabled={trip.estado === "lotado"}
                      className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${trip.estado === "aberto" ? "btn-primary" : "bg-gray-400 text-white cursor-not-allowed"}`}
                    >
                      {trip.estado === "aberto" ? "📝 Inscrever-me" : "Lotado"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Inscrição */}
      {showForm && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
            <h3 className="text-2xl font-heading font-bold text-sporting-dark dark:text-white mb-6">Inscrição para Deslocação</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Nome Completo</label>
                <input type="text" className="form-input" placeholder="O teu nome" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="teu@email.com" />
              </div>
              <div>
                <label className="form-label">Telemóvel</label>
                <input type="tel" className="form-input" placeholder="+351 9XXXXXXXX" />
              </div>
              <div>
                <label className="form-label">Nº de Sócio Sporting CP (opcional)</label>
                <input type="text" className="form-input" placeholder="Nº de sócio" />
              </div>
              <div>
                <label className="form-label">Acompanhantes</label>
                <input type="number" defaultValue={1} min={1} max={5} className="form-input" />
              </div>
              <div>
                <label className="form-label">Método de Pagamento</label>
                <select className="form-select">
                  <option>MBWay</option>
                  <option>Transferência Bancária</option>
                  <option>Dinheiro (ponto de encontro)</option>
                </select>
              </div>
              <button className="btn-primary w-full justify-center text-lg py-4">✅ Confirmar Inscrição</button>
              <p className="text-xs text-gray-500 text-center">Após confirmação, receberás os dados de pagamento por email/WhatsApp.</p>
            </div>
          </div>
        </div>
      )}

      {/* Info extra */}
      <section className="py-16 bg-white dark:bg-sporting-dark">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚌", title: "Transporte Confortável", desc: "Viagens em autocarros climatizados com seguro incluído." },
              { icon: "🕐", title: "Horários Certos", desc: "Cumprimos rigorosamente os horários de partida e regresso." },
              { icon: "🛡️", title: "Acompanhamento", desc: "Um membro da direção acompanha sempre cada deslocação." },
            ].map((item) => (
              <div key={item.title} className="card-hover p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-heading font-bold text-sporting-dark dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}