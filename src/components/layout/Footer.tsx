"use client";

import Link from "next/link";

const footerLinks = {
  clube: {
    title: "Clube",
    links: [
      { label: "História", href: "#" },
      { label: "Sócios", href: "#" },
      { label: "Bilhetes", href: "#" },
      { label: "Loja", href: "#" },
      { label: "Contactos", href: "#" },
    ],
  },
  modalidades: {
    title: "Modalidades",
    links: [
      { label: "Futebol", href: "/modalidades#futebol" },
      { label: "Futsal", href: "/modalidades#futsal" },
      { label: "Andebol", href: "/modalidades#andebol" },
      { label: "Atletismo", href: "/modalidades#atletismo" },
      { label: "Basquetebol", href: "/modalidades#basquetebol" },
    ],
  },
  recursos: {
    title: "Recursos",
    links: [
      { label: "Jogos", href: "/jogos" },
      { label: "Notícias", href: "/noticias" },
      { label: "Plantel", href: "/plantel" },
      { label: "Classificações", href: "/jogos#classificacao" },
    ],
  },
};

import { siteLogo } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-sporting-dark dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sporting-green rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sporting-green-light rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-sporting relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 shadow-lg shadow-sporting-green/30">
                  <img src={siteLogo} alt="Sporting CP logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">
                    Sporting CP
                  </h3>
                  <p className="text-xs text-gray-400 -mt-0.5">
                    Clube de Portugal
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Fundado em 1906, o Sporting Clube de Portugal é uma das maiores
                instituições desportivas do país, com presença em múltiplas
                modalidades.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Este site foi criado com carinho por um fã e amante do Sporting
                Clube de Portugal.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {["🐦", "📸", "📺", "💬"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-sporting-green rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sporting-green/30"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h4 className="font-heading font-semibold text-white mb-4 uppercase tracking-wider text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-sporting-green-light text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sporting Clube de Portugal. Todos os
            direitos reservados. Projeto independente de fã.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}