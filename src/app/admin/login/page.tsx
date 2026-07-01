"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Erro ao fazer login. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-ultra-green flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-heading font-black text-ultra-green-bright">DA</span>
          </div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-2">
            Painel Admin
          </h1>
          <p className="text-gray-600 text-sm font-sans">Directivo Algarve</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="form-label-ultra">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-ultra"
              placeholder="admin@duxxialgarve.pt"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label-ultra">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input-ultra"
              placeholder="••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-ultra-red/10 border border-ultra-red/30 text-ultra-red text-sm font-sans">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-ultra w-full justify-center glow-green-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "A ENTRAR..." : "ENTRAR"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-700 font-heading font-semibold uppercase tracking-wider">
            Acesso restrito à direção da claque
          </p>
        </div>
      </div>
    </div>
  );
}