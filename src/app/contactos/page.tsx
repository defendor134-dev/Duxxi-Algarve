"use client";

import { claqueInfo } from "@/lib/site-config";

export default function ContactosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="container-sporting relative z-10 text-center">
          <span className="badge-green mb-3">📞 CONTACTOS</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4">Fala Connosco</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Estamos aqui para responder às tuas questões e ouvir as tuas sugestões.</p>
        </div>
      </section>

      {/* Contactos e Formulário */}
      <section className="py-16 md:py-20 bg-white dark:bg-sporting-dark">
        <div className="container-sporting">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-sporting-dark dark:text-white mb-6">Informações de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sporting-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sporting-dark dark:text-white">Email</h3>
                    <a href={`mailto:${claqueInfo.contact.email}`} className="text-sporting-green hover:underline">{claqueInfo.contact.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sporting-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sporting-dark dark:text-white">WhatsApp</h3>
                    <p className="text-gray-500 dark:text-gray-400">Grupo exclusivo para sócios e interessados</p>
                    <a href={claqueInfo.social.whatsapp} className="text-sporting-green hover:underline" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sporting-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sporting-dark dark:text-white">Localização</h3>
                    <p className="text-gray-500 dark:text-gray-400">{claqueInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sporting-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sporting-dark dark:text-white">Redes Sociais</h3>
                    <div className="flex gap-3 mt-2">
                      <a href={claqueInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sporting-green dark:text-gray-400 dark:hover:text-sporting-green-light transition-colors text-2xl">
                        <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href={claqueInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sporting-green dark:text-gray-400 dark:hover:text-sporting-green-light transition-colors text-2xl">
                        <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                      <a href={claqueInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sporting-green dark:text-gray-400 dark:hover:text-sporting-green-light transition-colors text-2xl">
                        <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-sporting-dark dark:text-white mb-6">Envia-nos uma Mensagem</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-input" placeholder="O teu nome" />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="teu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Assunto</label>
                  <select className="form-select">
                    <option>Informações sobre a claque</option>
                    <option>Quero ser sócio</option>
                    <option>Deslocações</option>
                    <option>Sugestão</option>
                    <option>Parceria</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Mensagem</label>
                  <textarea className="form-textarea" placeholder="Escreve a tua mensagem..." />
                </div>
                <button className="btn-primary w-full justify-center text-lg py-4">📨 Enviar Mensagem</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa / CTA */}
      <section className="py-16 bg-gradient-to-r from-sporting-green to-sporting-green-light text-white text-center">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Segue-nos nas Redes Sociais</h2>
          <p className="text-white/80 text-lg mb-8">Fica a par de todas as novidades da Directivo Algarve</p>
          <div className="flex justify-center gap-4">
            <a href={claqueInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-sporting-green hover:bg-gray-100">📸 Instagram</a>
            <a href={claqueInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline-white">📘 Facebook</a>
          </div>
        </div>
      </section>
    </div>
  );
}