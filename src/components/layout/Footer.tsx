"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { siteLogo, claqueInfo } from "@/lib/site-config";

const footerLinks = {
  claque: {
    title: "Claque",
    links: [
      { label: "Sobre Nós", href: "/sobre" },
      { label: "História", href: "/sobre#historia" },
      { label: "Sócios", href: "/socios" },
      { label: "Contactos", href: "/contactos" },
    ],
  },
  atividades: {
    title: "Atividades",
    links: [
      { label: "Deslocações", href: "/deslocacoes" },
      { label: "Notícias", href: "/noticias" },
      { label: "Galeria", href: "/galeria" },
    ],
  },
  sporting: {
    title: "Sporting CP",
    links: [
      { label: "Plantel", href: "/plantel" },
      { label: "Classificações", href: "/jogos#classificacao" },
    ],
  },
};

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage(data.message);
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.message);
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Erro ao subscrever. Tenta novamente.");
    }
    setTimeout(() => {
      setNewsletterStatus("idle");
      setNewsletterMessage("");
    }, 5000);
  };

  return (
    <footer className="bg-black border-t border-ultra-gray text-white relative" role="contentinfo">
      {/* Top border green line */}
      <div className="h-[3px] bg-ultra-green w-full" />

      <div className="container-ultra">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 group mb-4" aria-label="Ir para página inicial">
                <div className="w-12 h-12 overflow-hidden border border-ultra-green/50 flex items-center justify-center bg-black">
                  <Image src={siteLogo} alt="Logótipo Directivo Algarve" width={48} height={48} className="object-contain w-full h-full p-1" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-white uppercase tracking-widest leading-tight">
                    {claqueInfo.fullName}
                  </h3>
                  <p className="text-[10px] text-gray-600 -mt-0.5 font-heading font-semibold uppercase tracking-[0.2em]">
                    {claqueInfo.motto}
                  </p>
                </div>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md font-sans">
                {claqueInfo.description}
              </p>
              <div className="flex gap-2 mb-8">
                <a href={claqueInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="Instagram" aria-label="Instagram">
                  <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href={claqueInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="Facebook" aria-label="Facebook">
                  <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={claqueInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-ultra-gray hover:border-ultra-green-bright flex items-center justify-center transition-all duration-200 hover:bg-ultra-green/10" title="YouTube" aria-label="YouTube">
                  <svg className="w-4 h-4 text-gray-500 hover:text-ultra-green-bright" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-heading font-bold text-white mb-3 uppercase tracking-[0.15em] text-xs">
                  Newsletter
                </h4>
                <p className="text-gray-600 text-xs font-sans mb-3">
                  Recebe as últimas novidades da claque.
                </p>
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="teu@email.com"
                    className="newsletter-input-ultra flex-1 min-w-0"
                    aria-label="Email para newsletter"
                    required
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="btn-ultra text-[10px] px-4 py-3 whitespace-nowrap"
                    aria-label="Subscrever newsletter"
                  >
                    {newsletterStatus === "loading" ? "..." : "Subscrever"}
                  </button>
                </form>
                {newsletterMessage && (
                  <p className={`text-[10px] mt-2 font-sans ${newsletterStatus === "success" ? "text-ultra-green-bright" : "text-ultra-red"}`}>
                    {newsletterMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Link Columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h4 className="font-heading font-bold text-white mb-5 uppercase tracking-[0.15em] text-xs">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-gray-600 hover:text-white text-sm transition-colors duration-200 font-sans">
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
        <div className="h-[1px] bg-ultra-gray" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-700 font-heading font-semibold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {claqueInfo.fullName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/sobre" className="text-[10px] text-gray-700 hover:text-white font-heading font-semibold uppercase tracking-wider transition-colors">
              Sobre
            </Link>
            <Link href="/contactos" className="text-[10px] text-gray-700 hover:text-white font-heading font-semibold uppercase tracking-wider transition-colors">
              Contactos
            </Link>
            <Link href="/socios" className="text-[10px] text-gray-700 hover:text-white font-heading font-semibold uppercase tracking-wider transition-colors">
              Sócios
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}