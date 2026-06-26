"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-sporting-dark">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sporting-dark text-white min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-black">🦁 Admin</h2>
            <p className="text-sm text-gray-400">Directivo Algarve</p>
          </div>

          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-3 rounded-lg bg-sporting-green/20 text-white hover:bg-sporting-green/30 transition-colors">
              📊 Dashboard
            </Link>
            <Link href="/admin/deslocacoes" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              🚌 Deslocações
            </Link>
            <Link href="/admin/noticias" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              📰 Notícias
            </Link>
            <Link href="/admin/socios" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              👥 Sócios
            </Link>
            <Link href="/admin/galeria" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              📸 Galeria
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-left"
            >
              🚪 Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-black text-sporting-dark dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bem-vindo ao painel de administração
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-2xl font-bold text-sporting-dark dark:text-white">200+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sócios Ativos</p>
            </div>
            <div className="card p-6">
              <div className="text-3xl mb-2">🚌</div>
              <h3 className="text-2xl font-bold text-sporting-dark dark:text-white">5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deslocações Ativas</p>
            </div>
            <div className="card p-6">
              <div className="text-3xl mb-2">📸</div>
              <h3 className="text-2xl font-bold text-sporting-dark dark:text-white">6</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fotos na Galeria</p>
            </div>
            <div className="card p-6">
              <div className="text-3xl mb-2">📰</div>
              <h3 className="text-2xl font-bold text-sporting-dark dark:text-white">6</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notícias Publicadas</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/deslocacoes" className="btn-primary text-center">
                ➕ Adicionar Deslocação
              </Link>
              <Link href="/admin/noticias" className="btn-secondary text-center">
                📝 Criar Notícia
              </Link>
              <Link href="/admin/galeria" className="btn-secondary text-center">
                📸 Adicionar Fotos
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}