"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login simples (em produção, usar NextAuth ou similar)
    if (email === "admin@duxxialgarve.pt" && password === "admin123") {
      document.cookie = "admin=true; path=/; max-age=" + 7 * 24 * 60 * 60;
      router.push("/admin");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sporting-dark via-[#16213e] to-sporting-dark p-4">
      <div className="card p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-black text-sporting-dark dark:text-white mb-2">
            🦁 Painel Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Directivo Algarve</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@duxxialgarve.pt"
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full justify-center">
            🔐 Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Acesso restrito à direção da claque</p>
        </div>
      </div>
    </div>
  );
}