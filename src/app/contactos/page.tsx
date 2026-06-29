"use client";

import { claqueInfo } from "@/lib/site-config";

export default function ContactosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">CONTACTOS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Fala Connosco
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Estamos aqui para responder às tuas questões.
          </p>
        </div>
      </section>

      {/* Contactos e Formulário */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight mb-8">Informações</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-ultra-green/50 flex items-center justify-center flex-shrink-0 bg-black">
                    <span className="text-lg font-heading font-black text-ultra-green-bright">@</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Instagram</h3>
                    <p className="text-gray-600 text-sm font-sans mt-1">Envia-nos uma mensagem privada</p>
                    <a href={claqueInfo.contact.instagram} className="text-ultra-green-bright text-sm font-heading font-bold hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                      @duxxialgarve
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-ultra-green/50 flex items-center justify-center flex-shrink-0 bg-black">
                    <span className="text-lg font-heading font-black text-ultra-green-bright">#</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Localização</h3>
                    <p className="text-gray-600 text-sm font-sans mt-1">{claqueInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-ultra-green/50 flex items-center justify-center flex-shrink-0 bg-black">
                    <span className="text-lg font-heading font-black text-ultra-green-bright">=</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Redes Sociais</h3>
                    <div className="flex gap-2 mt-3">
                      <a href={claqueInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="Facebook">
                        <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href={claqueInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="Instagram">
                        <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                      <a href={claqueInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="YouTube">
                        <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight mb-8">Mensagem</h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label-ultra">Nome</label>
                    <input type="text" className="form-input-ultra" placeholder="O teu nome" />
                  </div>
                  <div>
                    <label className="form-label-ultra">Email</label>
                    <input type="email" className="form-input-ultra" placeholder="teu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="form-label-ultra">Assunto</label>
                  <select className="form-select-ultra">
                    <option>Informações sobre a claque</option>
                    <option>Quero ser sócio</option>
                    <option>Deslocações</option>
                    <option>Sugestão</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="form-label-ultra">Mensagem</label>
                  <textarea className="form-textarea-ultra" placeholder="Escreve a tua mensagem..." />
                </div>
                <button className="btn-ultra w-full justify-center glow-green-hover">
                  ENVIAR MENSAGEM
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Redes */}
      <section className="py-20 bg-black border-t border-ultra-gray text-center">
        <div className="container-ultra-narrow">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Segue-nos
          </h2>
          <p className="text-gray-500 text-base mb-10 font-sans">Fica a par de todas as novidades da Directivo Algarve</p>
          <div className="flex justify-center gap-4">
            <a href={claqueInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-ultra">
              INSTAGRAM
            </a>
            <a href={claqueInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-ultra-outline">
              FACEBOOK
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}