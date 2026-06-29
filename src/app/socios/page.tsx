"use client";

import { claqueBenefits, claqueStats } from "@/data/mockData";

export default function SociosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">SÓCIOS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Torna-te Sócio
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Junta-te à Directivo Algarve. Vive o Sporting como nunca antes.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black border-b border-ultra-gray">
        <div className="container-ultra">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {claqueStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-gray-600 font-heading font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">Benefícios</h2>
            <p className="text-gray-600 text-sm font-sans mt-2">Vê todas as vantagens de fazeres parte da Directivo Algarve</p>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {claqueBenefits.map((benefit) => (
              <div key={benefit.title} className="card-ultra-hover p-6 text-center">
                <h3 className="text-lg font-heading font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 bg-black">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">Planos</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              { name: "Novo Sócio", price: "30€", periodo: "inscrição", popular: true },
              { name: "Renovação", price: "15€", periodo: "ano" },
            ].map((plan) => (
              <div key={plan.name} className="card-ultra p-8 text-center border-ultra-green/20">
                {plan.popular && <div className="badge-ultra-green mb-4">MAIS POPULAR</div>}
                <h3 className="text-xl font-heading font-bold text-white mb-4">{plan.name}</h3>
                <div className="mb-10">
                  <span className="text-5xl font-heading font-black text-ultra-green-bright">{plan.price}</span>
                  <span className="text-gray-600 text-sm font-sans">/{plan.periodo}</span>
                </div>
                <button className="btn-ultra w-full justify-center glow-green-hover">
                  {plan.popular ? "QUERO SER SÓCIO" : "SELECIONAR"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra-narrow text-center">
          <h2 className="section-title-ultra mb-4">Pagamento</h2>
          <p className="text-gray-600 text-sm font-sans mb-10">Aceitamos os seguintes métodos</p>
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { title: "MBWay", desc: "Paga por MBWay para o número da claque" },
              { title: "Transferência", desc: "IBAN disponível por mensagem" },
              { title: "Dinheiro", desc: "Podes pagar em mão a um elemento da direção" },
            ].map((m) => (
              <div key={m.title} className="card-ultra-hover p-6">
                <h3 className="font-heading font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs text-gray-500 font-sans">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-700 mt-8 font-heading font-semibold uppercase tracking-wider">
            IBAN disponível mediante contacto direto
          </p>
        </div>
      </section>

      {/* Inscrição */}
      <section className="py-20 bg-black border-t border-ultra-gray" id="inscricao">
        <div className="container-ultra-narrow text-center">
          <h2 className="section-title-ultra mb-4">Ficha de Inscrição</h2>
          <p className="text-gray-600 text-sm font-sans mb-10">Descarrega o formulário de inscrição</p>
          <div className="card-ultra p-8 max-w-xl mx-auto border-ultra-green/20">
            <h3 className="text-xl font-heading font-bold text-white mb-4">Ficha de Sócio</h3>
            <p className="text-gray-500 text-sm font-sans mb-8">Descarrega o PDF, preenche e envia-nos por mensagem no Instagram.</p>
            <a href="/site-images/socio-duxxi.pdf" target="_blank" rel="noopener noreferrer" className="btn-ultra inline-flex items-center gap-2">
              DESCARREGAR FICHA
            </a>
          </div>
        </div>
      </section>

      {/* CTA Instagram */}
      <section className="py-16 bg-ultra-dark text-center">
        <div className="container-ultra-narrow">
          <p className="text-gray-500 text-sm font-sans mb-6">
            Após preencheres a ficha, envia-nos uma mensagem no Instagram para finalizares a tua inscrição.
          </p>
          <a href="https://www.instagram.com/duxxialgarve/" target="_blank" rel="noopener noreferrer" className="btn-ultra">
            @DUXXIALGARVE
          </a>
        </div>
      </section>
    </div>
  );
}