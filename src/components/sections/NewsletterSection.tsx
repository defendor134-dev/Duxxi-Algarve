"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-black border-t border-b border-ultra-gray">
      <div className="absolute inset-0 ultra-stripe opacity-20" />
      <div className="container-ultra relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 border-2 border-ultra-green flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-heading font-black text-ultra-green-bright">@</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight mb-3">
            Fica por dentro de tudo
          </h2>
          <p className="text-gray-500 font-sans mb-8">
            Subscreve a newsletter e recebe as últimas novidades da Directivo Algarve.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email..."
                className="form-input-ultra"
                disabled={status === "loading" || status === "success"}
                required
                aria-label="Email para newsletter"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn-ultra glow-green-hover disabled:opacity-50"
            >
              {status === "loading" ? "..." : status === "success" ? "✅ Subscrito!" : "Subscrever"}
            </button>
          </form>

          {status === "error" && (
            <p className="text-ultra-red text-xs mt-4 font-heading font-semibold uppercase tracking-wider">
              Erro ao subscrever. Tenta novamente.
            </p>
          )}

          <p className="text-gray-700 text-[10px] mt-4 font-heading font-semibold uppercase tracking-wider">
            Podes cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}