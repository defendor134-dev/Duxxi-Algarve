"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-ultra-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-ultra-dark border-r border-ultra-gray text-white min-h-screen p-6">
          <div className="mb-8">
            <div className="w-12 h-12 border-2 border-ultra-green flex items-center justify-center mb-4">
              <span className="text-sm font-heading font-black text-ultra-green-bright">DA</span>
            </div>
            <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">Admin</h2>
            <p className="text-[10px] text-gray-600 font-heading font-semibold uppercase tracking-wider">Directivo Algarve</p>
          </div>

          <nav className="space-y-1">
            <Link href="/admin" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-ultra-green-bright bg-ultra-green/5 text-ultra-green-bright">
              📊 Dashboard
            </Link>
            <Link href="/admin/deslocacoes" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              🚌 Deslocações
            </Link>
            <Link href="/admin/noticias" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              📰 Notícias
            </Link>
            <Link href="/admin/socios" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              👥 Sócios
            </Link>
            <Link href="/admin/galeria" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              📸 Galeria
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-ultra-gray">
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider text-left text-ultra-red hover:bg-ultra-red/10 transition-colors"
            >
              🚪 Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm font-sans mt-1">
              Bem-vindo, {session.user?.email}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: "👥", value: "200+", label: "Sócios Ativos" },
              { icon: "🚌", value: "5", label: "Deslocações Ativas" },
              { icon: "📸", value: "6", label: "Fotos na Galeria" },
              { icon: "📰", value: "6", label: "Notícias Publicadas" },
            ].map((stat) => (
              <div key={stat.label} className="card-ultra p-6">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <h3 className="text-2xl font-heading font-black text-white">{stat.value}</h3>
                <p className="text-[10px] text-gray-600 font-heading font-semibold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card-ultra p-6">
            <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link href="/admin/deslocacoes" className="btn-ultra text-center text-xs">
                ➕ Adicionar Deslocação
              </Link>
              <Link href="/admin/noticias" className="btn-ultra-outline text-center text-xs">
                📝 Criar Notícia
              </Link>
              <Link href="/admin/galeria" className="btn-ultra-outline text-center text-xs">
                📸 Adicionar Fotos
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}