import Link from "next/link";
import { claqueInfo } from "@/lib/site-config";

export const metadata = { title: "Deslocações" };

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

      {/* Tipos de Deslocações */}
      <section className="py-20 bg-black">
        <div className="container-ultra">
          <div className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            <Link href="/deslocacoes/alvalade" className="card-ultra p-8 text-center border-ultra-green/20 hover:border-ultra-green-bright transition-colors">
              <div className="text-4xl mb-4">🏟️</div>
              <h3 className="text-2xl font-heading font-black text-white mb-2">JOGOS EM ALVALADE</h3>
              <p className="text-xs text-gray-600 font-sans">Deslocações ao Estádio José Alvalade para apoiar o Sporting em casa.</p>
            </Link>
            <Link href="/deslocacoes/aways" className="card-ultra p-8 text-center border-ultra-green/20 hover:border-ultra-green-bright transition-colors">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-2xl font-heading font-black text-white mb-2">AWAYS</h3>
              <p className="text-xs text-gray-600 font-sans">Deslocações fora de casa, por todo o país e Europa.</p>
            </Link>
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