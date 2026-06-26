"use client";

import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");

    // Simulate subscription (in production, integrate with Mailchimp/SendGrid)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success
    setStatus("success");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sporting-green via-sporting-green to-sporting-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-sporting">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">📧</div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Fica por dentro de tudo
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Subscreve a newsletter e recebe as últimas notícias do Sporting CP
            diretamente no teu email.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email..."
                className={cn(
                  "w-full px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200",
                  status === "success" && "ring-2 ring-green-400"
                )}
                disabled={status === "loading" || status === "success"}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={cn(
                "px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap",
                status === "success"
                  ? "bg-green-500 text-white"
                  : "bg-white text-sporting-green hover:bg-gray-100 hover:shadow-xl"
              )}
            >
              {status === "loading" ? "⏳" : status === "success" ? "✅ Subscrito!" : "📩 Subscrever"}
            </button>
          </form>

          <p className="text-white/50 text-xs mt-4">
            Ao subscreveres, aceitas receber emails do Sporting CP.
            Podes cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}