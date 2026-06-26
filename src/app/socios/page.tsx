"use client";

import { claqueBenefits, claqueStats } from "@/data/mockData";

export default function SociosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10 text-center">
          <span className="badge-green mb-3">🦁 SÓCIOS</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">Torna-te Sócio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Junta-te à Directivo Algarve e vive o Sporting como nunca antes!</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-sporting-green to-sporting-green-light">
        <div className="container-sporting">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {claqueStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title">Benefícios de Ser Sócio</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Vê todas as vantagens de fazeres parte da Directivo Algarve</p>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {claqueBenefits.map((benefit) => (
              <div key={benefit.title} className="socio-card">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela de Preços */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title">Planos de Sócio</h2>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Sócio Simpatizante", price: "10€", periodo: "ano", features: ["Acesso ao grupo WhatsApp", "Newsletter exclusiva", "Descontos em merch", "Participação em eventos"] },
              { name: "Sócio Efetivo", price: "25€", periodo: "ano", popular: true, features: ["Tudo do plano anterior", "Prioridade em deslocações", "Camisola da claque", "Voto nas decisões", "Sorteios exclusivos"] },
              { name: "Sócio Patrono", price: "50€", periodo: "ano", features: ["Tudo do plano anterior", "Nome no site", "Jantar anual com direção", "Kit completo de boas-vindas", "Desconto em bilhetes"] },
            ].map((plan) => (
              <div key={plan.name} className={`relative ${plan.popular ? "scale-105" : ""}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sporting-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">🔥 Popular</div>}
                <div className={`card-hover p-8 text-center ${plan.popular ? "border-2 border-sporting-green" : ""}`}>
                  <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-sporting-green">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">/{plan.periodo}</span>
                  </div>
                  <ul className="space-y-2 mb-8 text-left">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-sporting-green">✅</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? "btn-primary" : "btn-secondary"}`}>
                    {plan.popular ? "🦁 Quero ser Sócio" : "Selecionar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Inscrição */}
      <section className="py-16 bg-white dark:bg-sporting-dark" id="inscricao">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="section-title">Formulário de Inscrição</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Preenche os dados e entraremos em contacto</p>
            <div className="flex justify-center mt-3"><div className="section-divider" /></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className="form-input" placeholder="O teu nome" />
                </div>
                <div>
                  <label className="form-label">Data de Nascimento</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="teu@email.com" />
                </div>
                <div>
                  <label className="form-label">Telemóvel</label>
                  <input type="tel" className="form-input" placeholder="+351 9XXXXXXXX" />
                </div>
              </div>
              <div>
                <label className="form-label">Concelho do Algarve</label>
                <select className="form-select">
                  <option>Faro</option><option>Olhão</option><option>Loulé</option><option>Albufeira</option>
                  <option>Portimão</option><option>Lagos</option><option>Tavira</option><option>São Brás</option>
                  <option>Silves</option><option>Lagoa</option><option>Monchique</option><option>Vila do Bispo</option>
                  <option>Aljezur</option><option>Castro Marim</option><option>Vila Real de Santo António</option>
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Plano Pretendido</label>
                  <select className="form-select">
                    <option>Sócio Simpatizante (10€/ano)</option>
                    <option>Sócio Efetivo (25€/ano)</option>
                    <option>Sócio Patrono (50€/ano)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Nº de Sócio Sporting CP (opcional)</label>
                  <input type="text" className="form-input" placeholder="Se tiveres" />
                </div>
              </div>
              <div>
                <label className="form-label">Como conheceste a Directivo Algarve?</label>
                <textarea className="form-textarea" placeholder="Redes sociais, amigos, estádio..." />
              </div>
              <button className="btn-primary w-full justify-center text-lg py-4">🚀 Enviar Inscrição</button>
              <p className="text-xs text-gray-500 text-center">Após envio, a direção entrará em contacto para confirmar a adesão e indicar os dados de pagamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-narrow text-center">
          <h2 className="section-title mb-4">Métodos de Pagamento</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Aceitamos os seguintes métodos de pagamento</p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "📱", title: "MBWay", desc: "Paga por MBWay para o número da claque" },
              { icon: "🏦", title: "Transferência", desc: "IBAN: PT50 0000 0000 0000 0000 0000 0" },
              { icon: "💵", title: "Dinheiro", desc: "Podes pagar em mão a um elemento da direção" },
            ].map((m) => (
              <div key={m.title} className="card-hover p-6">
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-heading font-bold text-sporting-dark dark:text-white mb-2">{m.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}